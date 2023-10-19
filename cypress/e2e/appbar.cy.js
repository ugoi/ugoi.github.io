/// <reference types="cypress" />

describe("App Bar Navigation", () => {
  // Visit your homepage before each test
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  const mobileSizes = ["iphone-6", "ipad-2"];
  const desktopSizes = ["macbook-16", "macbook-13"];
  const allSizes = [...mobileSizes, ...desktopSizes];

  // These are your actual routes
  const routes = [
    { name: "Home", path: "/", isLogo: true },
    { name: "Portfolio", path: "/portfolio" },
    { name: "About", path: "/about" },
    { name: "Chat", path: "/chat" },
  ];

  // Mobile tests
  mobileSizes.forEach((size) => {
    context(`Mobile Testing on ${size}`, () => {
      beforeEach(() => {
        cy.viewport(size);
      });

      it("should display the mobile", () => {
        cy.get('[data-testid="menu-box-xs"]').should("be.visible");
      });

      it("should navigate to the correct URL when app bar buttons are clicked", () => {
        routes.forEach((route) => {
          const testId = `${route.name.toLowerCase()}-button-xs`;

          // Special case for logo
          if (route.isLogo) {
            // Navigate to the first non-logo route directly
            const nonLogoRoute = routes.find((r) => !r.isLogo);
            cy.visit(`http://localhost:3000${nonLogoRoute.path}`);

            // Click on the logo
            cy.get(`[data-testid="${testId}"]`).click();
            cy.url().should("eq", `http://localhost:3000${route.path}`);
          } else {
            // Clicking the menu icon to open the menu
            cy.get('[data-testid="icon-button-xs"]').click();

            // Clicking the actual button inside the menu
            cy.get(`[data-testid="${testId}"]`).click();
            cy.url().should("eq", `http://localhost:3000${route.path}`);
          }
        });
      });

      it("should open the correct page when app bar buttons are clicked", () => {
        routes.forEach((route) => {
          const testIdButton = `${route.name.toLowerCase()}-button-xs`;
          const testIdPage = `${route.name.toLowerCase()}-page`;

          // Special case for logo
          if (route.isLogo) {
            // Navigate to the first non-logo route directly
            const nonLogoRoute = routes.find((r) => !r.isLogo);
            cy.visit(`http://localhost:3000${nonLogoRoute.path}`);

            // Click on the logo
            cy.get(`[data-testid="${testIdButton}"]`).click();

            cy.get(`[data-testid="${testIdPage}"]`).should("be.visible");
          } else {
            // Clicking the menu icon to open the menu
            cy.get('[data-testid="icon-button-xs"]').click();

            // Clicking the actual button inside the menu
            cy.get(`[data-testid="${testIdButton}"]`).click();
            cy.get(`[data-testid="${testIdPage}"]`).should("be.visible");
          }
        });
      });

      // 4. Testing the navigation using back and forward commands.
      it("should navigate correctly using the browser's history", () => {
        routes.forEach((route, index) => {
          const testId = `${route.name.toLowerCase()}-button-xs`;

          if (route.isLogo) {
            // Directly visit a non-logo route
            const nonLogoRoute = routes.find((r) => !r.isLogo);
            cy.visit(`http://localhost:3000${nonLogoRoute.path}`);
            cy.get(`[data-testid="${testId}"]`).click();
          } else {
            cy.get('[data-testid="icon-button-xs"]').click();
            cy.get(`[data-testid="${testId}"]`).click();
          }

          if (index > 0) {
            cy.go("back");
            cy.url().should(
              "eq",
              `http://localhost:3000${routes[index - 1].path}`,
            );
            cy.go("forward");
            cy.url().should("eq", `http://localhost:3000${route.path}`);
          }
        });

        for (let i = routes.length - 1; i > 0; i--) {
          cy.go("back");
          cy.url().should("eq", `http://localhost:3000${routes[i - 1].path}`);
        }
      });

      // 5. Testing the reload functionality
      it("should maintain the current route on page reload", () => {
        routes.forEach((route) => {
          const testId = `${route.name.toLowerCase()}-button-xs`;

          if (route.isLogo) {
            // Directly visit a non-logo route
            const nonLogoRoute = routes.find((r) => !r.isLogo);
            cy.visit(`http://localhost:3000${nonLogoRoute.path}`);
            // Then click on the logo to go to the home page
            cy.get(`[data-testid="${testId}"]`).click();
          } else {
            cy.get('[data-testid="icon-button-xs"]').click();
            cy.get(`[data-testid="${testId}"]`).click();
          }

          cy.url().should("eq", `http://localhost:3000${route.path}`);
          cy.reload();
          cy.url().should("eq", `http://localhost:3000${route.path}`);
        });
      });
    });
  });

  // Desktop tests
  desktopSizes.forEach((size) => {
    context(`Mobile Testing on ${size}`, () => {
      beforeEach(() => {
        cy.viewport(size);
      });

      // 1. Testing if clicking on logo, portfolio, about, chat, etc. directs to the correct URL.
      it("should navigate to the correct URL when app bar buttons are clicked", () => {
        routes.forEach((route) => {
          const testId = `${route.name.toLowerCase()}-button`;
          cy.get(`[data-testid="${testId}"]`).click();
          cy.url().should("eq", `http://localhost:3000${route.path}`);
          cy.visit("http://localhost:3000/"); // Navigate back to homepage after each click for the next test
        });
      });

      // 2. Tests if opening the URL by clicking on the button actually opens the correct page.
      it("should open the correct page when app bar buttons are clicked", () => {
        // You can add specific checks for each route, like checking if certain elements are visible on that page
        routes.forEach((route) => {
          const testIdButton = `${route.name.toLowerCase()}-button`;
          const testIdPage = `${route.name.toLowerCase()}-page`;

          cy.get(`[data-testid="${testIdButton}"]`).click();
          // Example: Check if a certain element is visible on the 'About' page
          cy.get(`[data-testid="${testIdPage}"]`).should("be.visible");
          cy.visit("http://localhost:3000/"); // Navigate back to homepage after each click for the next test
        });
      });

      // 4. Testing the navigation using back and forward commands.
      it("should navigate correctly using the browser's history", () => {
        routes.forEach((route, index) => {
          // Navigate to each route
          cy.get(`[data-testid="${route.name.toLowerCase()}-button"]`).click();
          cy.url().should("eq", `http://localhost:3000${route.path}`);

          // If it's not the first route, test the browser's back button
          if (index > 0) {
            cy.go("back");
            cy.url().should(
              "eq",
              `http://localhost:3000${routes[index - 1].path}`,
            );

            // Test the browser's forward button
            cy.go("forward");
            cy.url().should("eq", `http://localhost:3000${route.path}`);
          }
        });

        // Test going all the way back to the start
        for (let i = routes.length - 1; i > 0; i--) {
          cy.go("back");
          cy.url().should("eq", `http://localhost:3000${routes[i - 1].path}`);
        }
      });
      // 5. Testing the reload functionality
      it("should maintain the current route on page reload", () => {
        routes.forEach((route) => {
          // Navigate to each route
          cy.get(`[data-testid="${route.name.toLowerCase()}-button"]`).click();
          cy.url().should("eq", `http://localhost:3000${route.path}`);

          // Reload the page and check the URL remains the same
          cy.reload();
          cy.url().should("eq", `http://localhost:3000${route.path}`);
        });
      });
    });
  });

  allSizes.forEach((size) => {
    context(`Testing on ${size}`, () => {
      beforeEach(() => {
        cy.viewport(size);
      });

      // 3. Tests if directly opening that URL opens the correct page without clicking on the buttons in the app bar.
      it("should display the correct page when visiting URLs directly", () => {
        routes.forEach((route) => {
          const testIdPage = `${route.name.toLowerCase()}-page`;

          cy.visit(`http://localhost:3000${route.path}`);
          cy.get(`[data-testid="${testIdPage}"]`).should("be.visible");
        });
      });

      // ... Add more tests here if needed
    });
  });
});
