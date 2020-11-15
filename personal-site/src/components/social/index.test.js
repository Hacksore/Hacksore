import { render, fireEvent, screen } from "@testing-library/react";
import { Social } from ".";

test("github link exists", () => {
  render(<Social />);

  const link = screen.getByTestId("github-link");
  fireEvent.click(link);

  expect(link).toBeInTheDocument();
  expect(link.getAttribute("href")).toBe("https://github.com/Hacksore");
});

test("linkedin link exists", () => {
  render(<Social />);

  const link = screen.getByTestId("linkedin-link");
  fireEvent.click(link);

  expect(link).toBeInTheDocument();
  expect(link.getAttribute("href")).toBe(
    "https://www.linkedin.com/in/seanboult"
  );
});

test("email link exists", () => {
  render(<Social />);

  const link = screen.getByTestId("email-link");
  fireEvent.click(link);

  expect(link).toBeInTheDocument();
  expect(link.getAttribute("href")).toBe("mailto:sean@boult.me");
});
