import React from "react";

import Mac from "../mdx/mac.mdx";
import PC from "../mdx/pc.mdx";
import Shared from "../mdx/shared.mdx";
import { Box, styled, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import Head from "next/head";
import GiscusComponent from "@giscus/react";

const StyledMain = styled("main")(() => ({
  maxWidth: 760,
  "& .giscus": {
    padding: 12,
  },
  "& .content": {
    textAlign: "left",
  },
  "& .section": {
    maxWidth: 500,
  },
  "& hr": {
    borderStyle: "solid",
    borderColor: "#161616",
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
      <Typography variant="h2" sx={{ mt: 4, mb: 4, fontWeight: "bold" }}>Uses</Typography>

      <div className="content">
        <Shared />

        <ToggleButtonGroup
          value={platform}
          exclusive
          onChange={(e: React.MouseEvent<HTMLElement>, val: "mac" | "pc" | null) => {
            val && setPlatform(val);
          }}
          aria-label="text alignment"
          sx={{ mb: 4, mt: 4 }}
        >
          <ToggleButton sx={{ width: 100 }} value="mac" aria-label="left aligned">
            Mac
          </ToggleButton>
          <ToggleButton sx={{ width: 100 }} value="pc" aria-label="right aligned">
            PC
          </ToggleButton>
        </ToggleButtonGroup>

        <PlatformComponent />

        <Typography sx={{ mt: 4 }}>
          If you have questions about something I use or build please drop a comment below or @ me on twitter.
        </Typography>

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
      </div>

    </StyledMain>
  );
}

export default Uses;
