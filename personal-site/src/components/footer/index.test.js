import { render, fireEvent, screen } from "@testing-library/react";
import { Footer } from ".";

test("commit link exists and can be clicked", () => {
  render(<Footer />);

  const link = screen.getByTestId("commit-link");
  fireEvent.click(link);

  expect(link).toBeInTheDocument();
});
