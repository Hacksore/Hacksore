import React from "react";
import { Social } from "../components/social";
import { Projects } from "../components/projects";
import { About } from "../components/about";
import { useSession, signIn, signOut } from "next-auth/react";

// setup firebase for client usage
import "../firebaseConfig";

function App() {
  const { data: session } = useSession();
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

      {session ? (
        <>
          Signed in as {session?.user?.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
    </main>
  );
}

export default App;
