import { NavLink } from 'react-router-dom';
import { Box, Stack } from '@mui/material';

export default function NavBar() {
  return (
    <Box
      component="nav"
      sx={{
        width: '100%',
        borderBottom: '1px solid',
        borderColor: 'divider',
        py: 2,
        px: 3,
        bgcolor: 'background.paper',
      }}
    >
      <Stack
        direction="row"
        spacing={3}
        justifyContent="center"
        alignItems="center"
      >
        <NavLink 
          to="/" 
          style={({ isActive }) => ({
            textDecoration: 'none',
            color: isActive ? '#1976d2' : '#666',
            fontWeight: isActive ? 'bold' : 'normal',
            padding: '8px 16px',
            borderRadius: '4px',
            backgroundColor: isActive ? '#e3f2fd' : 'transparent',
          })}
        >
          Home
        </NavLink>
        
        <NavLink 
          to="/list" 
          style={({ isActive }) => ({
            textDecoration: 'none',
            color: isActive ? '#1976d2' : '#666',
            fontWeight: isActive ? 'bold' : 'normal',
            padding: '8px 16px',
            borderRadius: '4px',
            backgroundColor: isActive ? '#e3f2fd' : 'transparent',
          })}
        >
          List
        </NavLink>
        
        <NavLink 
          to="/add" 
          style={({ isActive }) => ({
            textDecoration: 'none',
            color: isActive ? '#1976d2' : '#666',
            fontWeight: isActive ? 'bold' : 'normal',
            padding: '8px 16px',
            borderRadius: '4px',
            backgroundColor: isActive ? '#e3f2fd' : 'transparent',
          })}
        >
          Add
        </NavLink>
      </Stack>
    </Box>
  );
}