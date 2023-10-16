import { render, screen } from "@testing-library/react";
import App from "./App";
import { useMediaQuery } from "@mui/material";

// Mocking the hook's return value for testing
jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  useMediaQuery: jest.fn(),
}));

describe("App Component", () => {
  test("ResponsiveAppBar is rendered", () => {
    render(<App />);
    const appBarElement = screen.getByTestId("responsive-app-bar");
    expect(appBarElement).toBeInTheDocument();
  });

  test("it renders light theme", () => {
    (useMediaQuery as jest.Mock).mockReturnValue(false);
    render(<App />);
    const appBarElement = screen.getByTestId("responsive-app-bar");
    expect(appBarElement).toBeInTheDocument();
  });

  test("it renders dark theme", () => {
    (useMediaQuery as jest.Mock).mockReturnValue(true);
    render(<App />);
    const appBarElement = screen.getByTestId("responsive-app-bar");
    expect(appBarElement).toBeInTheDocument();
  });
});
