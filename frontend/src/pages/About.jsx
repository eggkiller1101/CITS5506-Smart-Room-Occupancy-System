// src/pages/About.jsx
import React from 'react';
import { Typography, Box, Paper } from '@mui/material';

function About() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        ℹ️ About This Project
      </Typography>

      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Typography paragraph>
          This Smart Room Occupancy Counter uses mmWave sensors to track the
          number of people entering and leaving a room in real time.
        </Typography>
        <Typography paragraph>
          The system is built using a Raspberry Pi, and data is displayed live
          on a web dashboard. Alerts are triggered when overcrowding is
          detected.
        </Typography>
        <Typography variant="subtitle2">
          Team 21 – UWA CITS5506 IoT Project
        </Typography>
      </Paper>
    </Box>
  );
}

export default About;
