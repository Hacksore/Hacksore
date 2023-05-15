import { styled, Typography } from "@mui/material";
import Head from "next/head";
import KeyboardMd from "../mdx/keyboard.mdx";

// TODO: this should be reused in other views
const StyledMain = styled("main")(() => ({
  maxWidth: 760,
  "& .content": {
    textAlign: "left",
  },
}));

function Keyboard() {
  return (
    <StyledMain>
      <Head>
        <title>Sean Boult /keyboard</title>
      </Head>
      <Typography variant="h2" sx={{ mt: 4, mb: 4, fontWeight: "bold" }}>
        Moonlander
      </Typography>

      <div className="content">
        <KeyboardMd />
      </div>
    </StyledMain>
  );
}

export default Keyboard;
