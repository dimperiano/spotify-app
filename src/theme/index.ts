import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1DB954',
    },
    secondary: {
      main: '#FFFFFF',
    },
    background: {
      default: '#303030', 
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B3B3B3',
    },
  },
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#303030',
          color: '#FFFFFF',
          borderRadius: '32px',
          padding: '24px 16px',
        },
      },
    },
  },
});

export default theme;
