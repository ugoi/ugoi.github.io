import { render, screen } from "@testing-library/react";
import About from "./About";

test("About is rendered", () => {
  render(<About />);
});

// ... other imports and tests

test("CPP link points to the correct URL", () => {
  render(<About />);

  const cppLink = screen.getByTestId("cpp-link");
  expect(cppLink).toHaveAttribute("href", "https://www.cplusplus.com/");
});

test("Python link points to the correct URL", () => {
  render(<About />);

  const pythonLink = screen.getByTestId("python-link");
  expect(pythonLink).toHaveAttribute("href", "https://www.python.org/");
});

test("TypeScript link points to the correct URL", () => {
  render(<About />);

  const typescriptLink = screen.getByTestId("typescript-link");
  expect(typescriptLink).toHaveAttribute(
    "href",
    "https://www.typescriptlang.org/",
  );
});

test("PostgreSQL link points to the correct URL", () => {
  render(<About />);

  const postgresqlLink = screen.getByTestId("postgresql-link");
  expect(postgresqlLink).toHaveAttribute("href", "https://www.postgresql.org/");
});

test("Node link points to the correct URL", () => {
  render(<About />);

  const nodeLink = screen.getByTestId("node-link");
  expect(nodeLink).toHaveAttribute("href", "https://nodejs.org/");
});

test("Bash link points to the correct URL", () => {
  render(<About />);

  const bashLink = screen.getByTestId("bash-link");
  expect(bashLink).toHaveAttribute(
    "href",
    "https://www.gnu.org/software/bash/",
  );
});
