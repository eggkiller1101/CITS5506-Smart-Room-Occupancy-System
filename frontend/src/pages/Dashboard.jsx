// src/pages/Dashboard.jsx
import React from 'react';
import { Typography, Paper, Box, Grid } from '@mui/material';

function Dashboard() {
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
          12
        </Typography>
      </Paper>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
            <Typography variant="subtitle1">Entries Today</Typography>
            <Typography variant="h4">7</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
            <Typography variant="subtitle1">Exits Today</Typography>
            <Typography variant="h4">5</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
