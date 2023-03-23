import { Social } from "../components/social";
import { Projects } from "../components/projects";
import { About } from "../components/about";

// setup firebase for client usage
import "../firebase-client";
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

      <section>
        <Link style={{ textDecoration: "none" }} href="/guestbook">
          <Button sx={{ mb: 3 }} color="secondary" variant="contained">
            ✍️ Sign my guestbook
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
