import { darken, styled } from "@mui/material";
import { Html, Head, Main, NextScript } from "next/document";
import MainLayout from "../layouts/main";

const StyledBody = styled("body")(({ theme }) => ({
  colorScheme: "dark",
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
        <MainLayout>
          <Main />
        </MainLayout>
        <NextScript />
      </StyledBody>
    </Html>
  );
}
