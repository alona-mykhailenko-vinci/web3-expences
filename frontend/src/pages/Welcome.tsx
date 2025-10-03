import { NavLink } from 'react-router-dom';
import { Box, Container, Typography, Stack, Button } from '@mui/material';

export default function Welcome() {
  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 80px)', // Subtract navbar height
        display: 'grid',
        placeItems: 'center',
        px: 2,
        py: 6,
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="sm" sx={{ px: { xs: 0, sm: 2 } }}>
        <Box sx={{ maxWidth: 560, mx: 'auto', textAlign: 'center' }}>
          <Typography
            variant="h4"
            component="h1"
            align="center"
            fontWeight={700}
            sx={{ mb: 3 }}
          >
            Welcome to the Expense Tracker
          </Typography>
          
          <Typography
            variant="body1"
            color="text.secondary"
            align="center"
            sx={{ mb: 4 }}
          >
            This is the Welcome page - Introduction text to our expense tracking app will go here.
          </Typography>
          
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Button
              component={NavLink}
              to="/list"
              variant="contained"
              color="primary"
              sx={{ textTransform: 'none', borderRadius: 2, px: 2.5 }}
            >
              View Expenses
            </Button>
            
            <Button
              component={NavLink}
              to="/add"
              variant="outlined"
              color="primary"
              sx={{ textTransform: 'none', borderRadius: 2, px: 2.5 }}
            >
              Add Expense
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}