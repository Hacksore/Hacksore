import { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";

const STATE_COLORS = {
  online: "#90ce5c",
  idle: "#f2b34d",
  dnd: "#d33f3f",
  unknown: "rgba(0, 0, 0, 0)",
};

export const AboutMe = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [status, setStatus] = useState("unknown");

  useEffect(() => {
    const animated = document.querySelector("body");
    animated.addEventListener("animationend", () => {
      document.body.classList.remove("barrel-roll");
      setIsAnimating(false);
    });

    fetchPresence();
  }, []);

  const fetchPresence = () => {
    fetch("/presence")
      .then((res) => res.json())
      .then((res) => setStatus(res.status));
  };

  const handleSpin = () => {
    // so not reacty ;)
    document.body.classList.add("barrel-roll");
    setIsAnimating(true);
  };

  return (
    <>
      <div className="image-wrap">
        <img
          onClick={handleSpin}
          width="200"
          id="profile-pic"
          src="me_irl.png"
          data-testid="profile-pic"
          alt="Me in real life"
        />
        <div
          className="presese-indicator"
          style={{
            background: STATE_COLORS[status],
          }}
        />
      </div>
      {isAnimating && (
        <Typography variant="h6">WEEEEEEEEEEEEEEEEEEEEEEEE!!!1</Typography>
      )}

      <div className="about-wrap">
        <Typography variant="h4">Sean Boult</Typography>
        <Typography variant="body2">I like to build things 🛠️</Typography>
      </div>
    </>
  );
};
