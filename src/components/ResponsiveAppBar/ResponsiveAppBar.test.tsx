import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ResponsiveAppBar from "./ResponsiveAppBar";
import userEvent from "@testing-library/user-event";
import mediaQuery from "css-mediaquery";

function createMatchMedia(width) {
  return (query) => ({
    matches: mediaQuery.match(query, {
      width,
    }),
    addListener: () => {},
    removeListener: () => {},
  });
}

describe("ResponsiveAppBar Component", () => {
  beforeAll(() => {
    window.matchMedia = createMatchMedia(window.innerWidth);
  });
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

  // test("Clicking on the MenuIcon button opens the navigation menu", () => {
  //   // Set to mobile view
  //   // Change the viewport to 500px.
  //   global.innerWidth = 2000;
  //   // Trigger the window resize event.
  //   global.dispatchEvent(new Event("resize"));

  //   render(
  //     <MemoryRouter>
  //       <ResponsiveAppBar routes={routes} />
  //     </MemoryRouter>,
  //   );
  //   const menuButton = screen.getByTestId("menu-box-xs");

  //   expect(menuButton).not.toBeVisible();
  //   userEvent.click(menuButton);
  //   // const menu = screen.getByTestId("menu-appbar");
  //   // expect(menu).toBeVisible();
  // });

  // test("menu-box-xs is visible in mobile view", () => {
  //   // Simulate mobile view
  //   window.matchMedia = createMatchMedia(500);
  //   console.log("uhiuhuihdgdigdigjiodjgiojgdiojgiodjfgiodjfiogjdfigjdiojgoi")
  //   console.log(window.matchMedia("(min-width: 600px)").matches);

  //   render(
  //     <MemoryRouter>
  //       <ResponsiveAppBar routes={routes} />
  //     </MemoryRouter>,
  //   );
  //   const menuButton = screen.getByTestId("menu-box-xs");
  //   expect(menuButton).toBeVisible();
  // });

  // test("Clicking on a menu item closes the navigation menu", () => {
  //   render(
  //     <MemoryRouter>
  //       <ResponsiveAppBar routes={routes} />
  //     </MemoryRouter>,
  //   );

  //   // Click the MenuIcon to open the dropdown menu
  //   const menuButton = screen.getByRole("button", {
  //     name: /app bar drop down/i,
  //   });
  //   userEvent.click(menuButton);

  //   // Check if a menu item is visible, ensuring the menu is open
  //   const menuItem = screen.getByTestId("portfolio-button");
  //   expect(menuItem).toBeInTheDocument();

  //   // Click the menu item
  //   userEvent.click(menuItem);

  //   // Check if the menu item is no longer visible, ensuring the menu is closed
  //   expect(menuItem).not.toBeInTheDocument();
  // });

  // it("renders correctly on mobiles screens", () => {
  //   // Set the screen size to a smaller value
  //   window.matchMedia = "2000";

  //   // Render the component
  //   render(
  //     <MemoryRouter>
  //       <ResponsiveAppBar routes={routes} />
  //     </MemoryRouter>,
  //   );

  //   // Verify that the component styles are correct for the default screen size
  //   const menuButton = screen.getByTestId("menu-box-xs");

  //   expect(menuButton).toBeVisible();
  // });
});
