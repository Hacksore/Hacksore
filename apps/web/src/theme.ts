import { createTheme, lighten } from "@mui/material";

declare module "@mui/material/styles" {
  /* eslint-disable-next-line no-unused-vars */
  interface Palette {
    card: {
      bg: string,
      border: string
    }
  }
  /* eslint-disable-next-line no-unused-vars */
  interface PaletteOptions {
    card: {
      bg: string,
      border: string
    }
  }
}

export const theme = createTheme({
  // TODO: wat?
  // @ts-ignore
  shadows:["none"],
  palette: {
    card: {
      bg: "#0a0a0a",
      border: "#161616"
    },
    background: {
      default: "#000",
    },
    primary: {
      contrastText: "#fff",
      main: "#2149b7",
    },
    secondary: {
      main: "#1e1e1e"
    },
    mode: "dark",
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: ({ theme }) => ({
          borderRadius: 0,
          background: lighten(theme.palette.background.default, 0.1)
        }),
        arrow: ({ theme }) => ({
          color: lighten(theme.palette.background.default, 0.1)
        }),
      },
    }
  },
});