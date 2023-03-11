import { Box } from "@mui/material";
import { About } from "../../components/about";
import GiscusComponent from "@giscus/react";

function GuestBook() {
  return (
    <Box sx={{ width: "100%" }}>
      <section style={{ display: "flex", justifyContent: "center" }}>
        <About hideTagline />
      </section>

      <section>
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
      </section>
    </Box>
  );
}

export default GuestBook;
