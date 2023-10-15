import { render, screen } from "@testing-library/react";
import App from "./App";

test("ResponsiveAppBar is rendered", () => {
  render(<App />);
  const appBarElement = screen.getByTestId("responsive-app-bar");
  expect(appBarElement).toBeInTheDocument();
});
