import { createTheme } from "@mui/material";

export const theme = createTheme({
  shadows: ["none"],
  palette: {
    primary: {
      contrastText: "#fff",
      main: "#000",
    },
    type: "light",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      }, 
    }, 
  },
});
