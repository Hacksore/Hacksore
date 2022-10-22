import React from "react";
import { Social } from "components/social";
import { Projects } from "components/projects";
import { About } from "components/about";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "theme";
import { Box } from "@mui/material";
import { styled } from "@mui/system";

// setup firebase
import "../firebaseConfig";

const StyledBox = styled(Box)(() => ({
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
          <About />
          <Social />
          <Projects />
        </div>
      </StyledBox>
    </ThemeProvider>
  );
}

export default App;
