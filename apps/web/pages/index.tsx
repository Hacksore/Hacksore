import React from "react";

import { Social } from "components/social";
import { Projects } from "components/projects";
import { About } from "components/about";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "theme";
import { Box } from "@mui/material";
import { styled } from "@mui/system";

import Head from "next/head";

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
      <Head>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <title>Sean "Hacksore" Boult</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Sean Boult"></meta>
        <meta property="og:description" content="Personal site listing all my socials"></meta>
        <meta property="og:image" content="https://boult.me/img/banner.png"></meta>
        <meta property="og:type" content="website"></meta>
      </Head>

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
