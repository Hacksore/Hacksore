import { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

export const Footer = () => {
  const theme = useTheme();

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
    fetch('/spin');

  }

  return <div className="bottom-bar">
    {!isAnimating && (
      <Button
        style={{ 
          background: theme.palette.error.main,
          color: "#fff"
        }}
        onClick={handleSpin}
        fullWidth
      >
        Don't press this!
      </Button>
    )}
  </div>
}
