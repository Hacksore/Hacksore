import { Social } from "./components/social";
import { Projects } from "./components/projects";
import { AboutMe } from "./components/aboutMe";

import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { theme } from "./theme";

import "./App.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <div className="content-wrap">
          <AboutMe />
          <Social />
          <Projects />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
