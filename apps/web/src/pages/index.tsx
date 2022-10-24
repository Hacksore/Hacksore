import React from "react";
import { Social } from "../components/social";
import { Projects } from "../components/projects";
import { About } from "../components/about";

// setup firebase for client usage
import "../firebaseConfig";

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
    </main>
  );
}

export default App;
