/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add("loginByGoogleApi", () => {
  cy.log("Logging in to Google");
  cy.request({
    method: "POST",
    url: "https://www.googleapis.com/oauth2/v4/token",
    body: {
      grant_type: "refresh_token",
      client_id: Cypress.env("googleClientId"),
      client_secret: Cypress.env("googleClientSecret"),
      refresh_token: Cypress.env("googleRefreshToken"),
    },
  }).then(({ body }) => {
    const { access_token, id_token } = body;

    cy.request({
      method: "GET",
      url: "https://www.googleapis.com/oauth2/v3/userinfo",
      headers: { Authorization: `Bearer ${access_token}` },
    }).then(({ body }) => {
      cy.log(body);
      const userItem = {
        token: id_token,
        user: {
          googleId: body.sub,
          email: body.email,
          givenName: body.given_name,
          familyName: body.family_name,
          imageUrl: body.picture,
        },
      };

      window.localStorage.setItem("googleCypress", JSON.stringify(userItem));
      cy.visit("http://localhost:3000/chat");
    });
  });
});

// Cypress.Commands.add("loginByEmailAndPassword", (email, password) => {
//   cy.visit("/"); // Adjust this if your login page is not the home page

//   // Here you'd typically find the input fields for email and password, fill them in, and submit the form
//   // This is just a placeholder. Replace the selectors and URL with your actual values.
//   cy.get('input[name="email"]').type(email);
//   cy.get('input[name="password"]').type(password);
//   cy.get('button[type="submit"]').click(); // Adjust the selector to match your login button

//   // Optionally wait for a known element that appears only when logged in
//   cy.contains("Your Dashboard", { timeout: 10000 }).should("be.visible"); // Adjust this to match a unique element visible only when logged in
// });

//create typed version of the code below
import { signOut } from "firebase/auth";
import { auth } from "../../src/firebase-config";

Cypress.Commands.add(
  "loginByEmailAndPassword",
  (email: string, password: string) => {
    // delete cookies and reset browser
    signOut(auth);
    cy.clearCookies();
    cy.visit("localhost:3000/chat"); // Adjust this if your login page is not the home page

    // Here you'd typically find the input fields for email and password, fill them in, and submit the form
    // This is just a placeholder. Replace the selectors and URL with your actual values.
    cy.get('input[type="email"]').type(email);

    cy.get('input[type="password"]').type(password);
    cy.get('button[type="submit"]').click(); // Adjust the selector to match your login button
  },
);
