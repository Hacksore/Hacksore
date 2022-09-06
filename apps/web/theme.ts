import { createTheme } from "@mui/material";

export const theme = createTheme({
  // TODO: wat?
  // @ts-ignore
  shadows:["none"],
  palette: {
    background: {
      default: "#000",
    },
    primary: {
      contrastText: "#fff",
      main: "#1c1c1c",
    },
    mode: "dark",
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: ({ theme }) => ({
          borderRadius: 0,
          background: theme.palette.primary.main,
        }),
        arrow: ({ theme }) => ({
          color: theme.palette.primary.main,
        }),
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