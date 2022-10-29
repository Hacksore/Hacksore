import React from "react";
import Script from "next/script";

import { Social } from "../components/social";
import { Projects } from "../components/projects";
import { About } from "../components/about";

// setup firebase for client usage
import "../firebaseConfig";
import { Box } from "@mui/material";

function App() {
  return (
    <main>
      <section style={{ display: "flex", justifyContent: "center" }}>
        <About />
      </section>
      <section>
        <Social />
      </section>

      <section>
        <Projects />
      </section>

      <Box sx={{ mt: 4 }} className="giscus" />

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
        data-theme="dark_tritanopia"
        data-lang="en"
      />
    </main>
  );
}

export default App;
