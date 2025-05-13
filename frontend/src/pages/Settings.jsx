// src/pages/Settings.jsx
import React, { useState } from 'react';
import { Typography, Box, Paper, TextField, Button } from '@mui/material';

function Settings() {
  const [threshold, setThreshold] = useState(0);

  const handleSave = () => {
    alert(`New threshold saved: ${threshold}`);
  };

  const handleReset = () => {
    setThreshold(0);
    alert('Occupancy data reset');
  };

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

export default Settings;
