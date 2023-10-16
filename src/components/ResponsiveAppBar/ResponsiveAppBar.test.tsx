import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ResponsiveAppBar from "./ResponsiveAppBar";
import userEvent from "@testing-library/user-event";

describe("ResponsiveAppBar Component", () => {
  const routes = [
    {
      name: "Home",
      path: "/",
      isLogo: true,
    },
    {
      name: "Portfolio",
      path: "/portfolio",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Chat",
      path: "/chat",
    },
    {
      name: "Test",
      path: "/test",
    },
  ];

  test("ResponsiveAppBar is rendered", () => {
    render(
      <MemoryRouter>
        <ResponsiveAppBar routes={routes} />
      </MemoryRouter>,
    );
    const appBarElement = screen.getByTestId("responsive-app-bar");
    expect(appBarElement).toBeInTheDocument();
  });

  test("HomeButton is in the document", async () => {
    render(
      <MemoryRouter>
        <ResponsiveAppBar routes={routes} />
      </MemoryRouter>,
    );
    const homeButton = screen.getByTestId("home-button");
    expect(homeButton).toBeInTheDocument();
  });

  describe("Button href tests", () => {
    test.each(routes)("Button for %s has correct href", (route) => {
      render(
        <MemoryRouter>
          <ResponsiveAppBar routes={routes} />
        </MemoryRouter>,
      );

      const testId = `${route.name.toLowerCase()}-button`;

      const button = screen.getByTestId(testId);

      expect(button).toHaveAttribute("href", route.path);
    });
  });

  test.each(routes)(
    "Clicking on the %s button redirects correctly",
    async (route) => {
      const user = userEvent.setup();

      render(
        <MemoryRouter initialEntries={["/test"]}>
          <ResponsiveAppBar data-testid="responsive-app-bar" routes={routes} />
          <Routes>
            {routes.map((r) => (
              <Route
                key={r.path}
                path={r.path}
                element={<div data-testid={`${r.name.toLowerCase()}-page`} />}
              />
            ))}
          </Routes>
        </MemoryRouter>,
      );

      // Adjust the button testId or selector accordingly to fit your setup
      const button = screen.getByTestId(`${route.name.toLowerCase()}-button`);

      await user.click(button);

      // Check if we have been redirected to the correct page for the specific path
      expect(
        screen.getByTestId(`${route.name.toLowerCase()}-page`),
      ).toBeInTheDocument();
    },
  );

  test("When no logo route is provided, the default testId 'home-button' is used", () => {
    const routesWithoutLogo = routes.filter((route) => !route.isLogo);
    render(
      <MemoryRouter>
        <ResponsiveAppBar routes={routesWithoutLogo} />
      </MemoryRouter>,
    );
    const defaultLogoButton = screen.getByTestId("home-button");
    expect(defaultLogoButton).toBeInTheDocument();
  });
});
