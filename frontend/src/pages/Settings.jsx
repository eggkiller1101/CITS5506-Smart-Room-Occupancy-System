// src/pages/Settings.jsx
import React, { useState } from 'react';
import { Typography, Box, Paper, TextField, Button } from '@mui/material';

function Settings() {
  // React state to hold the current threshold value input by user
  const [threshold, setThreshold] = useState(0);

  // Sends the current threshold value to the backend API via a POST request
  const handleSave = () => {
    fetch('http://localhost:8001/api/config/threshold', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ threshold }),
    })
      .then((res) => res.json())
      .then((data) => {
        // If the request is successful, notify the user
        alert(`New threshold saved: ${data.threshold}`);
      })
      .catch((err) => {
        // If the request fails, log error and show alert
        console.error('Error updating threshold:', err);
        alert('Failed to save threshold');
      });
  };

  // Resets the threshold value to 0 and alerts the user
  const handleReset = () => {
    setThreshold(0);
    alert('Occupancy data reset');
  };

  // Render settings UI with title and input form
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        ⚙️ Settings
      </Typography>

      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Box mb={3}>
          <Typography variant="subtitle1" gutterBottom>
            Set Overcrowding Threshold
          </Typography>
          {/* Numeric input field for setting maximum occupancy threshold */}
          <TextField
            type="number"
            value={threshold}
            onChange={(e) => {
              const val = e.target.value;
              if (val === '') {
                setThreshold('');
              } else if (/^\d+$/.test(val)) {
                setThreshold(Number(val));
              }
            }}
            label="Max People"
            fullWidth
          />
        </Box>

        {/* Buttons for saving new threshold or resetting input */}
        <Box display="flex" gap={2}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save Threshold
          </Button>
          <Button variant="outlined" color="error" onClick={handleReset}>
            Reset Occupancy Data
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

// Export the Settings component as default
export default Settings;
