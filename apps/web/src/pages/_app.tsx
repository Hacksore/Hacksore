import Head from "next/head";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "../theme";

import { Box } from "@mui/material";
import { styled } from "@mui/system";

const StyledBox = styled(Box)(() => ({
  "& .content-wrap": {
    padding: 22,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
}));
interface AppProps {
  Component: any;
  pageProps: any;
}

const META_INFO = {
  title: "Sean Boult - Personal Site",
  description: "Full stack developer who likes ReactJS. You will find most if not all of my socials here.",
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Sean &quot;Hacksore&quot; Boult</title>
        <meta
          name="viewport"
          content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        ></meta>
        <meta name="title" content={META_INFO.title}></meta>
        <meta name="description" content={META_INFO.description}></meta>

        <meta property="og:title" content={META_INFO.title}></meta>
        <meta property="og:description" content={META_INFO.description}></meta>
        <meta property="og:image" content="https://boult.me/img/banner.png"></meta>
        <meta property="og:type" content="website"></meta>

        <meta property="twitter:card" content="summary_large_image"></meta>
        <meta property="twitter:title" content={META_INFO.title}></meta>
        <meta property="twitter:description" content={META_INFO.description}></meta>
        <meta property="twitter:image" content="https://boult.me/img/banner.png"></meta>
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <StyledBox>
          <div className="content-wrap">
            <Component {...pageProps} />
          </div>
        </StyledBox>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
