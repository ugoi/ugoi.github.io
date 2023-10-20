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

  context("Page Navigation", () => {
    allSizes.forEach((size) => {
      context(`${size} viewport`, () => {
        beforeEach(() => {
          cy.viewport(size);
        });
        if (mobileSizes.includes(size)) {
          it(`should open the correct page when app bar buttons are clicked on size ${size}`, () => {
            routes.forEach((route) => {
              const testIdButton = `${route.name.toLowerCase()}-button-xs`;
              const testIdPage = `${route.name.toLowerCase()}-page`;

              if (route.isLogo) {
                const nonLogoRoute = routes.find((r) => !r.isLogo);
                cy.visit(`http://localhost:3000${nonLogoRoute.path}`);
                cy.get(`[data-testid="${testIdButton}"]`).click();
                cy.get(`[data-testid="${testIdPage}"]`).should("be.visible");
              } else {
                cy.get('[data-testid="icon-button-xs"]').click();
                cy.get(`[data-testid="${testIdButton}"]`).click();
                cy.get(`[data-testid="${testIdPage}"]`).should("be.visible");
              }
            });
          });
        }

        if (desktopSizes.includes(size)) {
          it(`should open the correct page when app bar buttons are clicked on size ${size}`, () => {
            routes.forEach((route) => {
              const testIdButton = `${route.name.toLowerCase()}-button`;
              const testIdPage = `${route.name.toLowerCase()}-page`;

              cy.get(`[data-testid="${testIdButton}"]`).click();
              cy.get(`[data-testid="${testIdPage}"]`).should("be.visible");
              cy.visit("http://localhost:3000/");
            });
          });
        }
      });
    });
  });

  context("Menu Display", () => {
    allSizes.forEach((size) => {
      context(`${size} viewport`, () => {
        beforeEach(() => {
          cy.viewport(size);
        });

        if (mobileSizes.includes(size)) {
          it(`should display`, () => {
            cy.get('[data-testid="menu-box-xs"]').should("be.visible");
          });
        }

        if (desktopSizes.includes(size)) {
          it(`should not display`, () => {
            cy.get('[data-testid="menu-box-xs"]').should("not.be.visible");
          });
        }
      });
    });
  });

  context("URL Navigation", () => {
    allSizes.forEach((size) => {
      context(`${size} viewport`, () => {
        beforeEach(() => {
          cy.viewport(size);
        });

        if (mobileSizes.includes(size)) {
          it("should navigate to the correct URL when app bar buttons are clicked on mobile", () => {
            routes.forEach((route) => {
              const baseName = route.name.toLowerCase();
              const testId = `${baseName}-button-xs`;

              if (route.isLogo) {
                const nonLogoRoute = routes.find((r) => !r.isLogo);
                cy.visit(`http://localhost:3000${nonLogoRoute.path}`);
                cy.get(`[data-testid="${testId}"]`).click();
                cy.url().should("eq", `http://localhost:3000${route.path}`);
              } else {
                cy.get('[data-testid="icon-button-xs"]').click();
                cy.get(`[data-testid="${testId}"]`).click();
                cy.url().should("eq", `http://localhost:3000${route.path}`);
              }
            });
          });
        }

        if (desktopSizes.includes(size)) {
          it("should navigate to the correct URL when app bar buttons are clicked on desktop", () => {
            routes.forEach((route) => {
              const baseName = route.name.toLowerCase();
              const testId = `${baseName}-button`; // This might change based on your testID format for desktop

              // Assuming there's no special behavior for the logo in desktop view
              cy.get(`[data-testid="${testId}"]`).click();
              cy.url().should("eq", `http://localhost:3000${route.path}`);
            });
          });
        }
      });
    });
  });

  context("Browser History Navigation", () => {
    allSizes.forEach((size) => {
      context(`${size} viewport`, () => {
        beforeEach(() => {
          cy.viewport(size);
        });

        if (mobileSizes.includes(size)) {
          it("should navigate correctly using the browser's history on mobile", () => {
            routes.forEach((route, index) => {
              const baseName = route.name.toLowerCase();
              const testId = `${baseName}-button-xs`;

              if (route.isLogo) {
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
              cy.url().should(
                "eq",
                `http://localhost:3000${routes[i - 1].path}`,
              );
            }
          });
        }

        if (desktopSizes.includes(size)) {
          it("should navigate correctly using the browser's history on desktop", () => {
            routes.forEach((route, index) => {
              const baseName = route.name.toLowerCase();
              const testId = `${baseName}-button`;

              cy.get(`[data-testid="${testId}"]`).click();
              cy.url().should("eq", `http://localhost:3000${route.path}`);

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
              cy.url().should(
                "eq",
                `http://localhost:3000${routes[i - 1].path}`,
              );
            }
          });
        }
      });
    });
  });

  context("Page Reload Behavior", () => {
    allSizes.forEach((size) => {
      context(`${size} viewport`, () => {
        beforeEach(() => {
          cy.viewport(size);
        });

        if (mobileSizes.includes(size)) {
          it("should maintain the current route on page reload for mobile", () => {
            routes.forEach((route) => {
              const baseName = route.name.toLowerCase();
              const testId = `${baseName}-button-xs`;

              if (route.isLogo) {
                const nonLogoRoute = routes.find((r) => !r.isLogo);
                cy.visit(`http://localhost:3000${nonLogoRoute.path}`);
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
        }

        if (desktopSizes.includes(size)) {
          it("should maintain the current route on page reload for desktop", () => {
            routes.forEach((route) => {
              const baseName = route.name.toLowerCase();
              const testId = `${baseName}-button`;

              cy.get(`[data-testid="${testId}"]`).click();
              cy.url().should("eq", `http://localhost:3000${route.path}`);

              cy.reload();
              cy.url().should("eq", `http://localhost:3000${route.path}`);
            });
          });
        }
      });
    });
  });

  context("Direct URL Navigation", () => {
    allSizes.forEach((size) => {
      context(`${size} viewport`, () => {
        beforeEach(() => {
          cy.viewport(size);
        });

        it("should display the correct page when visiting URLs directly", () => {
          routes.forEach((route) => {
            const testIdPage = `${route.name.toLowerCase()}-page`;

            cy.visit(`http://localhost:3000${route.path}`);
            cy.get(`[data-testid="${testIdPage}"]`).should("be.visible");
          });
        });
      });
    });
  });
});
