import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import './index.css'
import App from './App.tsx'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000000', // Black
      light: '#424242', // Dark grey
      dark: '#000000', // Black
      contrastText: '#ffffff', // White
    },
    secondary: {
      main: '#757575', // Medium grey
      light: '#9e9e9e', // Light grey
      dark: '#424242', // Dark grey
      contrastText: '#ffffff', // White
    },
    error: {
      main: '#424242', // Dark grey instead of red
      light: '#757575', // Medium grey
      dark: '#212121', // Very dark grey
    },
    warning: {
      main: '#616161', // Medium dark grey
      light: '#9e9e9e', // Light grey
      dark: '#424242', // Dark grey
    },
    info: {
      main: '#757575', // Medium grey
      light: '#bdbdbd', // Light grey
      dark: '#424242', // Dark grey
    },
    success: {
      main: '#616161', // Medium dark grey
      light: '#9e9e9e', // Light grey
      dark: '#424242', // Dark grey
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
    background: {
      default: '#ffffff', // White background
      paper: '#fafafa', // Very light grey for cards
    },
    text: {
      primary: '#212121', // Very dark grey
      secondary: '#757575', // Medium grey
    },
    divider: '#e0e0e0', // Light grey
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: '#000000',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#424242',
          },
        },
        outlined: {
          borderColor: '#757575',
          color: '#424242',
          '&:hover': {
            borderColor: '#424242',
            backgroundColor: '#f5f5f5',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        outlined: {
          borderColor: '#757575',
          color: '#424242',
        },
      },
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
