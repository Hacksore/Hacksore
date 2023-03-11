import Script from "next/script";
import { Box } from "@mui/material";
import { About } from "../../components/about";

function GuestBook() {
  return (
    <Box sx={{ width: "100%" }}>

      <section style={{ display: "flex", justifyContent: "center" }}>
        <About hideTagline />
      </section>

      <section>
        <Box sx={{ mt: 4, mb: 8 }} className="giscus" />
      </section>

      <Script
        src="https://giscus.app/client.js"
        data-repo="Hacksore/Hacksore"
        data-repo-id="MDEwOlJlcG9zaXRvcnkyNzg0MzA5NzM="
        data-category="General"
        data-category-id="DIC_kwDOEJiE_c4CSRHB"
        data-mapping="title"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="dark"
        data-lang="en"
      />
    </Box>
  );
}

export default GuestBook;
