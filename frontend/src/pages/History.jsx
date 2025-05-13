// src/pages/History.jsx
import React from 'react';
import { Typography, Box, Paper } from '@mui/material';

function History() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        🕒 Occupancy History
      </Typography>

      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          People in Room - Last 24 Hours
        </Typography>
        <Box sx={{ height: 300 }}>
          {/* Chart.js canvas component */}
          <canvas id="occupancyChart"></canvas>
        </Box>
      </Paper>
    </Box>
  );
}

export default History;
