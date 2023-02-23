import React, { useRef } from "react";
import Script from "next/script";

import { About } from "../components/about";
import { Analytics } from "@vercel/analytics/react";
import Mac from "../mdx/mac.mdx";
import PC from "../mdx/pc.mdx";

import { Box, styled, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import Head from "next/head";

const StyledMain = styled("main")(() => ({
  "& .giscus": {
    padding: 12,
  },
  "& .content": {
    maxWidth: 600,
    textAlign: "left",
  },
  "& .section": {
    maxWidth: 500,
  },
}));

const platformComponents = {
  pc: PC,
  mac: Mac,
};

function Uses() {
  const giscusRef = useRef<HTMLDivElement>();
  const [platform, setPlatform] = React.useState<"mac" | "pc">("mac");
  const PlatformComponent = platformComponents[platform];

  return (
    <StyledMain>
      <Head>
        <title>Sean Boult /uses</title>
      </Head>

      <section style={{ display: "flex", justifyContent: "center" }}>
        <About hideTagline />
      </section>

      <div className="content">
        <section>
          <Typography className="header" sx={{ mb: 4, mt: 4, fontWeight: "bold" }} variant="h3">
            /uses
          </Typography>
          <ToggleButtonGroup
            value={platform}
            exclusive
            onChange={(e: React.MouseEvent<HTMLElement>, val: "mac" | "pc" | null) => {
              val && setPlatform(val);
            }}
            aria-label="text alignment"
            sx={{ mb: 4 }}
          >
            <ToggleButton sx={{ width: 100 }} value="mac" aria-label="left aligned">
              Mac
            </ToggleButton>
            <ToggleButton sx={{ width: 100 }} value="pc" aria-label="right aligned">
              PC
            </ToggleButton>
          </ToggleButtonGroup>

            <PlatformComponent />

        </section>

        <section>
          <Box ref={giscusRef} sx={{ mt: 4, mb: 8 }} className="giscus" />
        </section>
      </div>
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
