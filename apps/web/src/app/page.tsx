import { Social } from "../components/social";
import { Projects } from "../components/projects";
import { About } from "../components/about";
import { Metadata } from "next";
import { Badges } from "../components/badges";

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
    images: ["/img/banner.png"],
    type: "website",
  },
  twitter: {
    title: META_INFO.title,
    description: META_INFO.description,
    images: ["/img/banner.png"],
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

      <section>
        <Projects />
        <Badges />
      </section>
    </>
  );
}

export default App;
