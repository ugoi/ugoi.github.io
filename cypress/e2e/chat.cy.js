/// <reference types="cypress" />

describe("Chat Page", () => {
  // Visit your homepage before each test
  beforeEach(() => {
    cy.visit("http://localhost:3000/chat");
  });

  // Create blank test cases for the chat page
  it("displays the chat login page", () => {
    cy.contains("Sign in with Google", { timeout: 10000 }).should("be.visible");
  });
});

// describe('Google', function () {
//   beforeEach(function () {
//     cy.visit("http://localhost:3000/chat");
//     cy.loginByGoogleApi()
//   })

//   it('shows Stefan', function () {
//     cy.contains('Stefan').should('be.visible')
//   })
// })

describe("Email and Password Login", function () {
  it("allows a user to sign in with email and password", function () {
    // Use the custom command to login
    // Replace 'user@example.com' and 'password' with your test user's credentials
    cy.loginByEmailAndPassword("test@gmail.com", "test123*");

    // After login, write assertions that verify the login was successful
    // This could be checking for the presence of a logout button, user's name, or other elements that indicate a logged-in state
    cy.contains("Sign Out", { timeout: 10000 }).should("be.visible"); // Adjust this to match a unique element visible only when logged in

    cy.contains('Users', { timeout: 10000 }).should("be.visible"); // Adjust this to match a unique element visible only when logged in

  });
});
