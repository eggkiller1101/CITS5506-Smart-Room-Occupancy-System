// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Typography, Paper, Box } from '@mui/material';

function Dashboard() {
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState('OK');

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://localhost:8001/api/occupancy/status')
        .then((res) => res.json())
        .then((data) => {
          setCount(data.current_count);
          setStatus(data.status);
        })
        .catch((err) => console.error('Failed to fetch status:', err));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const statusColor = status === 'OK' ? '#2ecc71' : '#e74c3c'; // 绿 or 红
  const statusGlow = status === 'OK' ? '0 0 10px #2ecc71' : '0 0 15px #e74c3c';

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        📊 Smart Room Dashboard
      </Typography>

      <Paper
        elevation={3}
        sx={{ p: 4, mb: 4, textAlign: 'center', borderRadius: 2 }}
      >
        <Typography variant="h6">Current Occupancy</Typography>
        <Typography variant="h2" color="primary">
          {count}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            mt: 2,
            fontWeight: 'bold',
            color: statusColor,
            textShadow: statusGlow,
            transition: 'all 0.3s ease-in-out',
          }}
        >
          Status: {status}
        </Typography>
      </Paper>
    </Box>
  );
}

export default Dashboard;
