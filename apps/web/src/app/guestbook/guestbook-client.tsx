"use client"
import { Box, styled, Typography } from "@mui/material";
import GiscusComponent from "@giscus/react";

const StyledBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  [theme.breakpoints.up("md")]: {
    width: 760,
  },
}));


export function GuestBook() {
  return (
    <StyledBox>
      <Typography variant="h2" sx={{ mt: 4, mb: 4, fontWeight: "bold" }}>
        Guestbook
      </Typography>
      <Box sx={{ width: "100%" }}>
        <GiscusComponent
          repo="Hacksore/Hacksore"
          repoId="MDEwOlJlcG9zaXRvcnkzNDExNDE2OTY"
          category="General"
          categoryId="DIC_kwDOEJiE_c4CSRHB"
          theme="dark"
          mapping="title"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          lang="en"
        />
      </Box>
    </StyledBox>
  );
}

