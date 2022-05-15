import { purple } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {

    primary: {
      main: "#4d4d4d",
    },
    secondary: {
      main: purple['500'],
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
      },
      styleOverrides: {
      }
    },
    MuiLink: {
      defaultProps: {
        underline: 'none',
        color: 'whitesmoke',
        fontSize: 18,
      }
    }
  }
});

export default theme;