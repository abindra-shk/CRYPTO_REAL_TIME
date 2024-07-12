import { createTheme } from '@mui/material/styles';
import { red, grey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: grey[500],
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
