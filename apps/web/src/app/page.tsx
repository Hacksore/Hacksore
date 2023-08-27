import { Social } from "../components/social";
import { Projects } from "../components/projects";
import { About } from "../components/about";
import Link from "next/link";
import { Button } from "@mui/material";
import { Metadata } from "next";

const META_INFO = {
  title: "Sean Boult - Personal Site",
  description: "Full Stack Developer Who Likes React",
};

export const metadata: Metadata = {
  title: META_INFO.title,
  description: META_INFO.description,
  openGraph: {
    title: META_INFO.title,
    description: META_INFO.description,
    images: [ "/img/og-image.png" ],
    type: "website",
  },
  twitter: {
    title: META_INFO.title,
    description: META_INFO.description,
    images: [ "/img/og-image.png" ],
    card: "summary_large_image",
  },
};

function App() {
  return (
    <>
      <section style={{ display: "flex", justifyContent: "center" }}>
        <About />
      </section>
      <section>
        <Social />
      </section>

      <section className="linkys">
        <Link style={{ textDecoration: "none" }} href="/guestbook">
          <Button sx={{ textTransform: "lowercase" }} className="link" color="secondary" variant="contained">
            ✍️ /guestbook
          </Button>
        </Link>
        <Link style={{ textDecoration: "none" }} href="/uses">
          <Button sx={{ textTransform: "lowercase" }} className="link" color="secondary" variant="contained">
            💊 /uses
          </Button>
        </Link>
        <Link style={{ textDecoration: "none" }} href="/keyboard">
          <Button sx={{ textTransform: "lowercase" }} className="link" color="secondary" variant="contained">
            ⌨️ /keyboard
          </Button>
        </Link>
      </section>

      <section>
        <Projects />
      </section>
    </>
  );
}

export default App;
