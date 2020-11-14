import { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";

export const AboutMe = () => {
  useEffect(() => {
    const animated = document.querySelector("body");
    animated.addEventListener("animationend", () => {
      document.body.classList.remove("barrel-roll");
      setIsAnimating(false);
    });
  }, []);

  const [isAnimating, setIsAnimating] = useState(false);

  const handleSpin = () => {
    document.body.classList.add("barrel-roll");
    setIsAnimating(true);

    // count spin
    fetch("/spin");
  };

  return (
    <>
      <img
        onClick={handleSpin}
        width="256"
        id="profile-pic"
        src="me_irl.png"
        alt="Me in real life"
      />

      { isAnimating && (
        <Typography variant="h6">WEEEEEEEEEEEEEEEEEEEEEEEE!!!1</Typography>
      )}

      <div className="about-wrap">
        <Typography variant="h4">Sean Boult</Typography>
        <Typography variant="body2">I like to build things 🛠️</Typography>
      </div>
    </>
  );
};
