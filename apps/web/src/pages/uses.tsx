import React, { useRef } from "react";
import Script from "next/script";

import { About } from "../components/about";
import { Analytics } from "@vercel/analytics/react";

// setup firebase for client usage
import { Box, styled, Typography } from "@mui/material";
import Head from "next/head";

const StyledMain = styled("main")(({ theme }) => ({
  height: "100vh",
  "& .header": {
    fontWeight: "bold",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  "& .giscus": {
    padding: 12,
  },
}));

function Uses() {
  const giscusRef = useRef<HTMLDivElement>();
  return (
    <StyledMain>
      <Head>
        <title>Sean Boult Uses</title>
      </Head>

      <section style={{ display: "flex", justifyContent: "center" }}>
        <About />
      </section>

      <section>
        <Typography className="header" variant="h3">All the things I use!</Typography>
        {/* http://textfiles.com/underconstruction/ */}
        <div>🚧🚧🚧🚧 WIP 🚧🚧🚧🚧</div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/under-construction.gif" alt="This website is under construction" /> 
        <div>🚧🚧🚧🚧 WIP 🚧🚧🚧🚧</div>

      </section>

      <section>
        <Box ref={giscusRef} sx={{ mt: 4, mb: 8 }} className="giscus" />
      </section>

      <Script
        src="https://giscus.app/client.js"
        data-repo="Hacksore/Hacksore"
        data-repo-id="MDEwOlJlcG9zaXRvcnkyNzg0MzA5NzM="
        data-category="General"
        data-category-id="DIC_kwDOEJiE_c4CSRHB"
        data-mapping="title"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="dark"
        data-lang="en"
      />

      <Analytics />
    </StyledMain>
  );
}

export default Uses;
