import { darken, styled } from "@mui/material";
import { Html, Head, Main, NextScript } from "next/document";

const StyledBody = styled("body")(({ theme }) => ({
  "&::-webkit-scrollbar": {
    width: 8,
  },
  "&::-webkit-scrollbar-track": {
    background: darken(theme.palette.background.default, 0.9),
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: 10,
    background: darken(theme.palette.background.default, 0.7),
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: darken(theme.palette.background.default, 0.6),
  },
}));

export default function Document() {
  return (
    <Html>
      <Head />
      <StyledBody>
        <Main />
        <NextScript />
      </StyledBody>
    </Html>
  );
}
