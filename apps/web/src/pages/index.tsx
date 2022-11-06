import React, { useRef, useState } from "react";
import Script from "next/script";

import { Social } from "../components/social";
import { Projects } from "../components/projects";
import { About } from "../components/about";

// setup firebase for client usage
import "../firebase-client";
import { Box, Button, styled } from "@mui/material";

const StyledMain = styled("main")(({ theme }) => ({
  "@keyframes rotate": {
    "100%": {
      transform: "rotate(1turn);",
    },
  },
  "& .giscus": {
    position: "relative",
    zIndex: 0,
    borderRadius: 10,
    overflow: "hidden",
    padding: 12,
  },
  "& .animated": {
    "&::after": {
      content: "''",
      position: "absolute",
      zIndex: "-1",
      left: 3,
      top: 3,
      width: "calc(100% - 6px)",
      height: "calc(100% - 6px)",
      background: theme.palette.background.default,
      borderRadius: 8,
    },
    "&::before": {
      content: "''",
      position: "absolute",
      zIndex: "-2",
      left: "-50%",
      top: "-50%",
      width: "200%",
      height: "200%",
      backgroundRepeat: "no-repeat",
      backgroundSize: "50% 50%, 50% 50%",
      backgroundPosition: "0 0, 100% 0, 100% 100%, 0 100%",
      backgroundImage:
        "linear-gradient(#399953, #399953), linear-gradient(#fbb300, #fbb300), linear-gradient(#d53e33, #d53e33), linear-gradient(#377af5, #377af5)",
      animation: "rotate .9s linear infinite",
    },
  },
}));

function App() {
  const [animated, setAnimated] = useState(false);
  const gicusRef = useRef();
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
            const element: any = gicusRef.current;
            if (!element) return;
            element.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" });
            setAnimated(true);
            // remove it after a few
            setTimeout(() => setAnimated(false), 2000);
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
        <Box ref={gicusRef} sx={{ mt: 4, mb: 8 }} id="giscus-container" className={`giscus ${animated ? "animated" : null}`} />
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
