import { createTheme } from "@mui/material";

export const theme = createTheme({
  shadows: ["none"],
  palette: {
    background: {
      default: "#fff"
    },
    primary: {
      contrastText: "#fff",
      main: "#000",
    },
    type: "light",
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          background: "rgba(0, 0, 0, 0.9)",
        }
      }
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
