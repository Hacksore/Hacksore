import "./App.css";

import { GitHub, LinkedIn } from "@material-ui/icons";
import { Button, Typography } from "@material-ui/core";

const { REACT_APP_COMMIT_HASH = "e0292a3f0ea67ad62759b1f482a9ecd0f310150e" } = process.env;

function App() {
  return (
    <div className="app">
      <div className="content-wrap">
        <img
          width="100"
          id="profile-pic"
          src="me_irl.png"
          alt="Me in real life"
        />

        <div className="about-wrap">
          <Typography variant="h4">Sean Boult</Typography>
          <Typography variant="body2">I like to build things 🛠️</Typography>
        </div>

        <div className="social-wrap">
          <Button
            title="My Github"
            size="large"
            onClick={() => window.open("https://github.com/Hacksore", "_blank")}
          >
            <GitHub />
          </Button>
          <Button
            title="My Linkedin"
            size="large"
            onClick={() =>
              window.open("https://www.linkedin.com/in/seanboult", "_blank")
            }
          >
            <LinkedIn />
          </Button>
        </div>

        <div>
          <Typography>
            Built via commit{" "}
            <a
              rel="noreferrer"
              target="_blank"
              href={`https://github.com/Hacksore/Hacksore/commit/${REACT_APP_COMMIT_HASH}`}
            >
              {REACT_APP_COMMIT_HASH.substr(0, 7)}
            </a>
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default App;
