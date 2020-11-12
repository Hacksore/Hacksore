import { useEffect, useState } from "react";
import { Switch } from "@material-ui/core";
import { useLocalStorage } from "react-use";
import "./style.css";

export const ThemeToggle = ({ dispatch }) => {
  const [currentTheme, setCurrentTheme] = useLocalStorage(
    "theme",
    "dark"
  );

  const localStorageValue = currentTheme === 'light' ? false : true;
  const [themeSelector, setThemeSelector] = useState(localStorageValue);

  // load default checked value
  useEffect(() => {
    setThemeSelector(localStorageValue);
    dispatch({ type: 'SET_THEME',  theme: currentTheme })
  }, [currentTheme, dispatch, localStorageValue]);


  const handleChange = (event) => {
    const checked = event.target.checked;
    const theme = checked ? 'dark' : 'light';
    setThemeSelector(checked);
    dispatch({ type: 'SET_THEME',  theme })
    setCurrentTheme(theme);
  }

  return (
    <div className="pin-right">
      { currentTheme === 'dark' ? "🌛" : "🌞"}
      <Switch
        checked={themeSelector}
        color="default"
        onChange={handleChange}
        name="themeToggle"
        inputProps={{ "aria-label": "secondary checkbox" }}
      />
    </div>
  );
};
