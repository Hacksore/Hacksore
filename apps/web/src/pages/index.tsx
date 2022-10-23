import React from "react";
import { Social } from "../components/social";
import { Projects } from "../components/projects";
import { About } from "../components/about";

// setup firebase
import "../firebaseConfig";

function App() {
  return (
    <>
      <section>
        <About />
      </section>
      <section>
        <Social />
      </section>
      <main>
        <Projects />
      </main>
    </>
  );
}

export default App;
