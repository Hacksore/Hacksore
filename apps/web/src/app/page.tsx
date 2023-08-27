import { Social } from "../components/social";
import { Projects } from "../components/projects";
import { About } from "../components/about";
import Link from "next/link";
import { Button } from "@mui/material";

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
          <Button
            sx={{ textTransform: "lowercase" }}
            className="link"
            color="secondary"
            variant="contained"
          >
            ✍️ /guestbook
          </Button>
        </Link>
        <Link style={{ textDecoration: "none" }} href="/uses">
          <Button
            sx={{ textTransform: "lowercase" }}
            className="link"
            color="secondary"
            variant="contained"
          >
            💊 /uses
          </Button>
        </Link>
        <Link style={{ textDecoration: "none" }} href="/keyboard">
          <Button
            sx={{ textTransform: "lowercase" }}
            className="link"
            color="secondary"
            variant="contained"
          >
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
