// src/App.jsx
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import About from './pages/About';
import Settings from './pages/Settings';
import { Box } from '@mui/material';

function App() {
  const [page, setPage] = useState('dashboard');

  const renderPage = () => {
    switch (page) {
      case 'dashboard':
        return <Dashboard />;
      case 'history':
        return <History />;
      case 'settings':
        return <Settings />;
      case 'about':
        return <About />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Box display="flex">
      <Sidebar current={page} setPage={setPage} />
      <Box component="main" flexGrow={1} p={4}>
        {renderPage()}
      </Box>
    </Box>
  );
}

export default App;
