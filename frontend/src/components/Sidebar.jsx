// src/components/Sidebar.jsx
import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Box,
  Divider,
} from '@mui/material';

const pages = [
  { id: 'dashboard', label: '📊 Dashboard' },
  { id: 'history', label: '🕒 History' },
  { id: 'settings', label: '⚙️ Settings' },
  { id: 'about', label: 'ℹ️ About' },
];

const drawerWidth = 240;

function Sidebar({ current, setPage }) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#f0f4f8',
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap>
          Occupancy System
        </Typography>
      </Toolbar>

      <Divider />

      <List>
        {pages.map((page) => (
          <ListItem key={page.id} disablePadding>
            <ListItemButton
              selected={current === page.id}
              onClick={() => setPage(page.id)}
              sx={{
                borderRadius: 1,
                mx: 1,
                my: 0.5,
                '&.Mui-selected': {
                  backgroundColor: '#1976d2',
                  color: '#fff',
                  '& .MuiListItemText-primary': {
                    fontWeight: 600,
                  },
                },
              }}
            >
              <ListItemText primary={page.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;
