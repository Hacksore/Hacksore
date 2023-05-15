import { useState } from "react";

import Mac from "../mdx/mac.mdx";
import PC from "../mdx/pc.mdx";
import Shared from "../mdx/shared.mdx";
import { Box, styled, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { SiWindows, SiApple } from "react-icons/si";
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
  const [platform, setPlatform] = useState<"mac" | "pc">("mac");
  const PlatformComponent = platformComponents[platform];

  return (
    <StyledMain>
      <Head>
        <title>Sean Boult /uses</title>
      </Head>
      <Typography variant="h2" sx={{ mt: 4, mb: 4, fontWeight: "bold" }}>
        Uses
      </Typography>

      <div className="content">
        <Shared />

        <ToggleButtonGroup
          value={platform}
          exclusive
          onChange={(_, val: "mac" | "pc" | null) => {
            val && setPlatform(val);
          }}
          aria-label="text alignment"
          sx={{ mb: 4, mt: 4 }}
        >
          <ToggleButton sx={{ width: 100 }} value="mac" aria-label="left aligned">
            <SiApple /> <Typography sx={{ ml: 1 }}>Mac</Typography>
          </ToggleButton>
          <ToggleButton sx={{ width: 100 }} value="pc" aria-label="right aligned">
            <SiWindows /> <Typography sx={{ ml: 1 }}>PC</Typography>
          </ToggleButton>
        </ToggleButtonGroup>

        <PlatformComponent />

        <Typography sx={{ mt: 4 }}>
          Questions about something I use or build please drop a comment below or @ me on twitter.
        </Typography>

        <Typography sx={{ mt: 2 }}>
          Also make sure to check out my{" "}
          <a
            href="https://github.com/Hacksore/dotfiles/tree/master/.config/astronvim/lua/user"
            rel="noreferrer"
            target="_blank"
          >
            Neovim config
          </a>{" "}
          and{" "}
          <a href="https://github.com/Hacksore/dotfiles" rel="noreferrer" target="_blank">
            dotfiles
          </a>{" "}
          to see how I configure everything.
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
