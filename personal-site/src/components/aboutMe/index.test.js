import { render, screen, fireEvent } from "@testing-library/react";
import { AboutMe } from ".";

test("about me renders", () => {
  render(<AboutMe />);
});

test("clicking on profile pic works", () => {
  render(<AboutMe />);

  const profilePic = screen.getByTestId("profile-pic");
  fireEvent.click(profilePic);

  expect(profilePic).toBeInTheDocument();
  expect(screen.getByText(/WEEEEEEEEEEEEEEEEEEEEEEEE/)).toBeInTheDocument();
});
