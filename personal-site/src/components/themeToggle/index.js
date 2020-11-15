import React from "react";
import { Switch } from "@material-ui/core";
import "./style.css";

export const ThemeToggle = ({ setDarkMode, darkMode }) => {
  return (
    <div className="pin-right">
      {darkMode ? "🌛" : "🌞"}
      <Switch
        checked={darkMode}
        color="default"
        onChange={(event) => setDarkMode(event.target.checked)}
        name="themeToggle"
        inputProps={{
          "aria-label": "secondary checkbox",
          "data-testid": "toggle-switch",
        }}
      />
    </div>
  );
};
