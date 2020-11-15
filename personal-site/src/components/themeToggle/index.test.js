import { render, fireEvent, screen } from "@testing-library/react";
import { ThemeToggle } from ".";

test("render theme toggle", () => {
  const setDarkMode = jest.fn();
  render(<ThemeToggle darkMode={false} setDarkMode={setDarkMode} />);

  const toggle = screen.getByTestId("toggle-switch");
  fireEvent.click(toggle);

  expect(toggle).toBeInTheDocument();
  expect(setDarkMode).toHaveBeenCalled();
});
