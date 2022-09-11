import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
export const theme = createTheme({
  palette: {
    primary: {
      main: '#2D9CDB',
    },
    secondary: {
      main: '#1de9b6',
    },
    error: {
      main: red.A400,
    },
  },
});
