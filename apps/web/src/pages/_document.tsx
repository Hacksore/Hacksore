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
  "code": {
    color: theme.palette.primary.main,
    background: darken(theme.palette.background.default, 0.9),
    padding: theme.spacing(0.5, 1),
    borderRadius: 4,
  }
}));

export default function Document() {
  return (
    <Html lang="en">
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
