import React, { useRef } from "react";
import Script from "next/script";

import { Social } from "../components/social";
import { Projects } from "../components/projects";
import { About } from "../components/about";

// setup firebase for client usage
import "../firebase-client";
import { Box, Button, styled } from "@mui/material";

const StyledMain = styled("main")(() => ({
  "& .giscus": {
    padding: 12,
  },
}));

function App() {
  const giscusRef = useRef<HTMLDivElement>();
  return (
    <StyledMain>
      <section style={{ display: "flex", justifyContent: "center" }}>
        <About />
      </section>
      <section>
        <Social />
      </section>

      <section>
        <Button
          sx={{ mb: 4 }}
          onClick={() => {
            if (!giscusRef.current) return;
            giscusRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
          }}
          size="large"
          variant="contained"
          color="secondary"
        >
          ✍️ Sign my guestbook
        </Button>
      </section>

      <section>
        <Projects />
      </section>

      <section>
        <Box ref={giscusRef} sx={{ mt: 4, mb: 8 }} className="giscus" />
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
    </StyledMain>
  );
}

export default App;
