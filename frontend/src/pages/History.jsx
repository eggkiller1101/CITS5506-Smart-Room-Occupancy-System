// src/pages/History.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Typography, Box, Paper } from '@mui/material';
import Chart from 'chart.js/auto';
import { saveAs } from 'file-saver';

function formatTo2MinInterval(timestamp) {
  const date = new Date(timestamp);
  const minutes = date.getMinutes();
  date.setMinutes(Math.floor(minutes / 2) * 2);
  date.setSeconds(0);
  return date.toTimeString().slice(0, 5); // "HH:MM"
}

function History() {
  const canvasRef = useRef(null);
  const [historyData, setHistoryData] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  useEffect(() => {
    fetch('http://localhost:8001/api/occupancy/history')
      .then((res) => res.json())
      .then((json) => setHistoryData(json.history))
      .catch((err) => console.error('Failed to fetch history data:', err));
  }, []);

  function applyFilter() {
    const url = new URL('http://localhost:8001/api/occupancy/history');
    if (from) url.searchParams.append('from', from);
    if (to) url.searchParams.append('to', to);

    fetch(url.toString())
      .then((res) => res.json())
      .then((json) => setHistoryData(json.history))
      .catch((err) => console.error('Failed to fetch filtered data:', err));
  }

  useEffect(() => {
    if (!canvasRef.current || !historyData.length) return;

    const ctx = canvasRef.current.getContext('2d');
    const sortedData = [...historyData].sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: sortedData.map((entry) => formatTo2MinInterval(entry.timestamp)),
        datasets: [
          {
            label: 'Occupancy Count',
            data: sortedData.map((entry) => entry.resulting_count),
            borderColor: 'rgba(52, 152, 219, 1)',
            backgroundColor: 'rgba(52, 152, 219, 0.2)',
            tension: 0.2,
            fill: true,
            pointRadius: 3,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: 'People in Room' },
          },
          x: {
            title: { display: true, text: 'Time (HH:MM)' },
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [historyData]);

  function exportToCSV(data) {
    const header = 'Time,Occupancy Count\n';
    const rows = data
      .map((entry) => `${formatTo2MinInterval(entry.timestamp)},${entry.resulting_count}`)
      .join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'occupancy_history.csv');
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        🕒 Occupancy History
      </Typography>

      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          People in Room - Last 24 Hours
        </Typography>
        <Box display="flex" gap={2} mb={2}>
          <input
            type="datetime-local"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <input
            type="datetime-local"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
          <button onClick={applyFilter}>Apply Filter</button>
        </Box>
        <Box mb={2} textAlign="right">
          <button onClick={() => exportToCSV(historyData)}>Export as CSV</button>
        </Box>
        <Box sx={{ height: 300 }}>
          <canvas ref={canvasRef}></canvas>
        </Box>
      </Paper>
    </Box>
  );
}

export default History;
