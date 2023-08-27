"use client";
import { Typography, styled } from "@mui/material";
import RealOgKeyboard from "../../mdx/keyboard.mdx";

const StyledMain = styled("main")(() => ({
  maxWidth: 760,
  "& .content": {
    textAlign: "left",
  },
}));

export const KeyboardMd = () => {
  return (
    <StyledMain>
      <Typography variant="h2" sx={{ mt: 4, mb: 4, fontWeight: "bold" }}>
        Moonlander
      </Typography>

      <div className="content">
        <RealOgKeyboard />
      </div>
    </StyledMain>
  );
};
