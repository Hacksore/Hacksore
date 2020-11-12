import { useReducer } from "react";

import { Social } from "./components/social";
import { BuildInfo } from "./components/buildInfo";
import { Footer } from "./components/footer";
import { AboutMe } from "./components/aboutMe";
import { ThemeToggle } from "./components/themeToggle";

import { ThemeProvider } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CssBaseline from "@material-ui/core/CssBaseline";

import { lightTheme, darkTheme } from "./theme";
import { createMuiTheme } from '@material-ui/core/styles';

import "./App.css";

const initialState = {
  theme: "dark",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_THEME":
      return { theme: action.theme };
    default:
      throw new Error();
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const currentTheme =
    prefersDarkMode && state.theme === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={createMuiTheme(currentTheme)}>
      <CssBaseline />
      <div className="app">
        <ThemeToggle dispatch={dispatch} />

        <div className="content-wrap">
          <AboutMe />

          <Social />
          <BuildInfo />

          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
