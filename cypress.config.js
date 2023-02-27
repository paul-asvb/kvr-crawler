const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "3vytos",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
