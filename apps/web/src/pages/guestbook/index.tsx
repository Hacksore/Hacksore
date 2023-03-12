import { Box, Grid } from "@mui/material";
import { About } from "../../components/about";
import GiscusComponent from "@giscus/react";

function GuestBook() {
  return (
    <Box>
      <About hideTagline />
      <Grid>
        <Grid item>
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
        </Grid>
      </Grid>
    </Box>
  );
}

export default GuestBook;
