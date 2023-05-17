import { Social } from "../components/social";
import { Projects } from "../components/projects";
import { About } from "../components/about";
import Link from "next/link";
import { Box, Button, lighten, styled } from "@mui/material";

// setup firebase for client usage
import "../firebase-client";

// TODO: how to i share this better and not copypasta it?
const StyledBox = styled(Box)(({ theme }) => ({
  ".link": {
    background: theme.palette.secondary.main,
    color: "#fff",
    borderRadius: ".375rem",
    "&:hover": {
      background: lighten(theme.palette.primary.main, 0.1),
    },
  },
}));

function App() {
  return (
    <StyledBox>
      <section style={{ display: "flex", justifyContent: "center" }}>
        <About />
      </section>
      <section>
        <Social />
      </section>

      <section>
        <Link style={{ textDecoration: "none" }} href="/guestbook">
          <Button className="link" sx={{ mb: 3 }} color="secondary" variant="contained">
            ✍️ Sign my guestbook
          </Button>
        </Link>
      </section>

      <section>
        <Projects />
      </section>
    </StyledBox>
  );
}

export default App;
