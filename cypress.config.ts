import { defineConfig } from "cypress";
// Populate process.env with values from .env file
require("dotenv").config();

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
