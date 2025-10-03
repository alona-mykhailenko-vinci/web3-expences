import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import NavBar from '../components/NavBar';

export default function Layout() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavBar />
      <Box sx={{ flex: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
}