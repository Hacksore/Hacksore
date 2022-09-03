import { createTheme } from "@mui/material";

export const theme = createTheme({
  // TODO: wat?
  // @ts-ignore
  shadows:["none"],
  palette: {
    background: {
      default: "#fff",
    },
    primary: {
      contrastText: "#fff",
      main: "#000",
    },
    mode: "light",
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 0,
          background: "rgba(0, 0, 0, 0.9)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
  },
});