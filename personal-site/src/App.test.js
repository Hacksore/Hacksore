import { render, fireEvent, screen } from "@testing-library/react";
import App from "./App";

test("renders my name", () => {
  render(<App />);
  const nameElement = screen.getByText(/Sean Boult/i);
  expect(nameElement).toBeInTheDocument();
});

test("linkedin button opens link", () => {
  render(<App />);

  global.open = jest.fn();

  const button = screen.getByTestId("github-button");
  fireEvent.click(button);

  expect(global.open).toHaveBeenCalledTimes(1);
});

test("github button opens link", () => {
  render(<App />);

  global.open = jest.fn();

  const button = screen.getByTestId("linkedin-button");
  fireEvent.click(button);

  expect(global.open).toHaveBeenCalledTimes(1);
});
