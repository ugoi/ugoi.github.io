import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home2 from "./Home2";

describe("<Home2 />", () => {
  test("Home2 is rendered", () => {
    render(<Home2 />);
  });

  test("LinkedIn button opens the correct link", () => {
    render(<Home2 />);

    // Get the LinkedIn button using its data-testid
    const linkedInButton = screen.getByTestId("linkedin-button");

    // Simulate a click on the button
    userEvent.click(linkedInButton);

    // Assert the link's href value
    expect(linkedInButton).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/stefan-dukic-68682b20b/",
    );
  });

  test("GitHub button opens the correct link", () => {
    render(<Home2 />);

    // Get the GitHub button using its data-testid
    const githubButton = screen.getByTestId("github-button");

    // Simulate a click on the button
    userEvent.click(githubButton);

    // Assert the link's href value
    expect(githubButton).toHaveAttribute("href", "https://github.com/ugoi");
  });

  test("LinkedIn button has the correct base link", () => {
    render(<Home2 />);

    // Get the LinkedIn button using its data-testid
    const linkedInButton = screen.getByTestId("linkedin-button");

    // Assert the link's href value to check if it contains "linkedin.com"
    expect(linkedInButton.getAttribute("href")).toMatch(
      /https:\/\/www\.linkedin\.com\//,
    );
  });

  test("GitHub button has the correct base link", () => {
    render(<Home2 />);

    // Get the GitHub button using its data-testid
    const githubButton = screen.getByTestId("github-button");

    // Assert the link's href value to check if it contains "github.com"
    expect(githubButton.getAttribute("href")).toMatch(
      /https:\/\/github\.com\//,
    );
  });

  // ... other imports and tests

  test("CPP link points to the correct URL", () => {
    render(<Home2 />);

    const cppLink = screen.getByTestId("cpp-link");
    expect(cppLink).toHaveAttribute("href", "https://www.cplusplus.com/");
  });

  test("Python link points to the correct URL", () => {
    render(<Home2 />);

    const pythonLink = screen.getByTestId("python-link");
    expect(pythonLink).toHaveAttribute("href", "https://www.python.org/");
  });

  test("TypeScript link points to the correct URL", () => {
    render(<Home2 />);

    const typescriptLink = screen.getByTestId("typescript-link");
    expect(typescriptLink).toHaveAttribute(
      "href",
      "https://www.typescriptlang.org/",
    );
  });

  test("PostgreSQL link points to the correct URL", () => {
    render(<Home2 />);

    const postgresqlLink = screen.getByTestId("postgresql-link");
    expect(postgresqlLink).toHaveAttribute(
      "href",
      "https://www.postgresql.org/",
    );
  });

  test("Node link points to the correct URL", () => {
    render(<Home2 />);

    const nodeLink = screen.getByTestId("node-link");
    expect(nodeLink).toHaveAttribute("href", "https://nodejs.org/");
  });

  test("Bash link points to the correct URL", () => {
    render(<Home2 />);

    const bashLink = screen.getByTestId("bash-link");
    expect(bashLink).toHaveAttribute(
      "href",
      "https://www.gnu.org/software/bash/",
    );
  });
});
