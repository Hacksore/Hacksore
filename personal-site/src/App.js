import { Social } from "./components/social";
import { Footer } from "./components/footer";
import { AboutMe } from "./components/aboutMe";
import { ThemeToggle } from "./components/themeToggle";

import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { lightTheme, darkTheme } from "./theme";
import { createMuiTheme } from "@material-ui/core/styles";

import { useDarkMode } from "./hooks/useDarkMode";

import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useDarkMode();
  const currentTheme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={createMuiTheme(currentTheme)}>
      <CssBaseline />
      <div className="app">
        <ThemeToggle setDarkMode={setDarkMode} darkMode={darkMode} />

        <div className="content-wrap">
          <AboutMe />
          <Social />
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
