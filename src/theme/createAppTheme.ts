import { createTheme } from "@mui/material";

const APP_COLORS = {
  day: {
    black0: "#000000",
    black4: "#3C4043",
    orange_primary: "#FF7B52",
    orange_secondary: "#FF7B52",
  },
  night: {
    black0: "#000000",
    black4: "#2E3134",
    orange_primary: "#FF5F5E",
    orange_secondary: "#FF7B52",
  },
};

const createAppTheme = (mode = 'day') => {
    const palette = APP_COLORS[mode];

    return createTheme({
      transitions: {
        duration: {
          shortest: 150,
          shorter: 200,
          short: 250,
          standard: 300,
          complex: 375,
          enteringScreen: 225,
          leavingScreen: 195,
        },
      },
      palette: {
        action: {
          disabledBackground: "#999999",
          disabled: "#000000",
        },
        background: {
          default: palette.black0,
          paper: palette.black4,
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#BBBBBB",
          disabled: "#999999",
        },
        primary: {
          main: palette.orange_primary,
        },
        secondary: {
          main: palette.orange_secondary,
        },
      },
      components: {
        MuiButtonBase: {
          defaultProps: {
            disableRipple: false,
            centerRipple: true,
          },
        },
      },
      typography: {
        body1: {
          fontSize: "16px",
        },
        h4: {
          marginBottom: "12px",
        },
        h2: {
          marginBottom: "20px",
        },
        h1: {
          marginBottom: "28px",
        },
      },
    });
}

export default createAppTheme;