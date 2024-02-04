/// <reference types="cypress" />

describe("Chat Page", () => {
  // Visit your homepage before each test
  beforeEach(() => {
    cy.visit("http://localhost:3000/chat");
  });

  // Create blank test cases for the chat page
  it("displays the chat login page", () => {
    cy.contains("Sign in with Google");
  });


});
