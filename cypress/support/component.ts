// Import custom Cypress commands from the commands.ts file
import "./commands.ts";

// Import the 'mount' command from the 'cypress/react' package for component testing
import { mount } from "cypress/react18";

// Extend the global Cypress object to include the 'mount' command
declare global {
  namespace Cypress {
    interface Chainable {
      // Add type definition for the 'mount' command, allowing TypeScript to recognize it
      mount: typeof mount;
    }
  }
}

// Add the 'mount' command to Cypress, so it can be used as 'cy.mount()' in tests
Cypress.Commands.add("mount", mount);
