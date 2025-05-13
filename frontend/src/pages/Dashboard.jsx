// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Typography, Paper, Box, Grid } from '@mui/material';

function Dashboard() {
  const [count, setCount] = useState(0);
  const [entries, setEntries] = useState(0);
  const [exits, setExits] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://localhost:8001/api/occupancy/current')
        .then((res) => res.json())
        .then((data) => setCount(data.current_count))
        .catch((err) => console.error('Failed to fetch occupancy:', err));

      fetch('http://localhost:8001/api/occupancy/today')
        .then((res) => res.json())
        .then((data) => {
          setEntries(data.entries);
          setExits(data.exits);
        })
        .catch((err) => console.error('Failed to fetch today stats:', err));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

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
      </Paper>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
            <Typography variant="subtitle1">Entries Today</Typography>
            <Typography variant="h4">{entries}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
            <Typography variant="subtitle1">Exits Today</Typography>
            <Typography variant="h4">{exits}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
