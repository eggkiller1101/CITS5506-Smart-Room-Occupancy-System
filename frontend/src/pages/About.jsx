// Importing React and Material UI components
import React from 'react';
import { Typography, Box, Paper } from '@mui/material';

// Define the About component
function About() {
  return (
    <Box>
      {/* Page title */}
      <Typography variant="h4" gutterBottom>
        ℹ️ About This Project
      </Typography>

      {/* Paper container to hold description content */}
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        {/* Description of what the system does */}
        <Typography>
          This Smart Room Occupancy Counter uses mmWave sensors to track the
          number of people entering and leaving a room in real time.
        </Typography>
        {/* Description of hardware and data visualization */}
        <Typography>
          The system is built using a Raspberry Pi, and data is displayed live
          on a web dashboard. Alerts are triggered when overcrowding is
          detected.
        </Typography>
        {/* Project credit line */}
        <Typography variant="subtitle2">
          Team 21 – UWA CITS5506 IoT Project
        </Typography>
      </Paper>
    </Box>
  );
}

// Exporting the About component for use in routing
export default About;
