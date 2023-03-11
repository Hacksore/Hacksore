import React from "react";

import { About } from "../components/about";
import { Analytics } from "@vercel/analytics/react";
import Mac from "../mdx/mac.mdx";
import PC from "../mdx/pc.mdx";

import { Box, styled, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import Head from "next/head";

import GiscusComponent from "@giscus/react";

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
          <Box sx={{ mt: 4, mb: 8 }} className="giscus">
            <GiscusComponent
              repo="Hacksore/Hacksore"
              repoId="MDEwOlJlcG9zaXRvcnkzNDExNDE2OTY"
              category="General"
              categoryId="DIC_kwDOEJiE_c4CSRHB"
              theme="dark"
              mapping="title"
              reactionsEnabled="1"
              emitMetadata="0"
              inputPosition="bottom"
              lang="en"
            />
          </Box>
        </section>
      </div>

      <Analytics />
    </StyledMain>
  );
}

export default Uses;
