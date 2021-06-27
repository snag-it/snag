import { red } from '@material-ui/core/colors';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#6d6c6c',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#960000',
      contrastText: '#ffffff',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
