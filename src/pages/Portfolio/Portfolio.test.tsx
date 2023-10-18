import { render, screen } from "@testing-library/react";
import Portfolio from "./Portfolio";
import projects from "./projectsData"; // Adjust the path if needed

describe("Portfolio Component", () => {
  test("Portfolio is rendered", () => {
    render(<Portfolio />);
  });

  describe("Project Cards", () => {
    projects.forEach((project, index) => {
      // New test to check if each card is rendered
      test(`Project card ${index} is rendered`, () => {
        render(<Portfolio />);
        const card = screen.getByTestId(`project-card-${index}`);
        expect(card).toBeInTheDocument();
      });

      if (project.githubLink) {
        test(`GitHub link for project ${index} points to the correct URL`, () => {
          render(<Portfolio />);
          const githubLink = screen.getByTestId(`github-link-${index}`);
          expect(githubLink).toHaveAttribute("href", project.githubLink);
        });
      }

      if (project.deployedLink) {
        test(`Deployed link for project ${index} points to the correct URL`, () => {
          render(<Portfolio />);
          const deployedLink = screen.getByTestId(`deployed-link-${index}`);
          expect(deployedLink).toHaveAttribute("href", project.deployedLink);
        });
      }
    });
  });
});
