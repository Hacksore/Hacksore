import { styled, Typography } from "@mui/material";
import Head from "next/head";
import KeyboardMd from "../mdx/keyboard.md";

const StyledMain = styled("main")(() => ({
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
