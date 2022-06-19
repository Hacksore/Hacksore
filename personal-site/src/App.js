import { Social } from "./components/social";
import { Projects } from "./components/projects";
import { AboutMe } from "./components/aboutMe";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "./theme";
import { Box } from "@mui/material";
import { styled } from "@mui/system";

const StyledBox = styled(Box)(({ theme }) => ({
  "& .content-wrap": {
    padding: 22,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
}));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StyledBox>
        <div className="content-wrap">
          <AboutMe />
          <Social />
          <Projects />
        </div>
      </StyledBox>
    </ThemeProvider>
  );
}

export default App;
