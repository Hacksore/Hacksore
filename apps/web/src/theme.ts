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
      bg: "#0D1118",
      border: "#31363E"
    },
    background: {
      default: "#03060A",
    },
    primary: {
      contrastText: "#fff",
      main: "#206FEB",
    },
    secondary: {
      main: "#20262D"
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