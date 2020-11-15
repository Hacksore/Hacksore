import { render, screen } from "@testing-library/react";
import App from "./App";

// mock matchMedia
const mock = () => {};
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query) => {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: mock, // deprecated
      removeListener: mock, // deprecated
      addEventListener: mock,
      removeEventListener: mock,
      dispatchEvent: mock,
    };
  },
});

test("renders my name", () => {
  render(<App />);
  const nameElement = screen.getByText(/Sean Boult/i);
  expect(nameElement).toBeInTheDocument();
});
