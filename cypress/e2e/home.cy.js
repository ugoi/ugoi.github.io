/// <reference types="cypress" />

describe("Home Page", () => {
  // Visit your homepage before each test
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  // Check if the main greetings and your name render correctly
  it("displays the main greetings and name", () => {
    cy.contains("Hi There!");
    cy.contains("I'm Stefan Dukic");
  });

  // Check if the homeLogo is displayed correctly
  it("displays the home logo", () => {
    cy.get('img[alt="home"]').should("be.visible");
  });

  it("checks if the typewriter effect component is present", () => {
    cy.get('[data-testid="typewriter"]').should("be.visible");
  });

  it("LinkedIn button contains the correct base LinkedIn URL", () => {
    // Scroll to the LinkedIn button
    cy.get('[data-testid="linkedin-button"]')
      .scrollIntoView()
      .should("be.visible");

    // Check that the LinkedIn button's href attribute contains the base LinkedIn URL
    cy.get('[data-testid="linkedin-button"]')
      .should("have.attr", "href")
      .and("include", "https://www.linkedin.com/");
  });

  it("LinkedIn profile URL is valid", () => {
    // Confirm the URL is valid
    cy.request({
      url: "https://www.linkedin.com/in/stefan-dukic-68682b20b/",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.oneOf([200, 999]);
    });
  });

  it("GitHub button contains the correct base GitHub URL", () => {
    // Scroll to the GitHub button
    cy.get('[data-testid="github-button"]')
      .scrollIntoView()
      .should("be.visible");

    // Check that the GitHub button's href attribute contains the base GitHub URL
    cy.get('[data-testid="github-button"]')
      .should("have.attr", "href")
      .and("include", "https://github.com/");
  });

  it("GitHub profile URL is valid", () => {
    // Confirm the URL is valid
    cy.request("https://github.com/ugoi").its("status").should("eq", 200);
  });
});
