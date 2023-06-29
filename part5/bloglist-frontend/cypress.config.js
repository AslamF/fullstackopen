const { defineConfig } = require("cypress");

module.exports = defineConfig({
  describe("Blog app", function() {
    it("front page can be openend", function() {
        cy.visit("http://localhost:3003")
        cy.contains("Blogs")
        cy.contains("Blog app")
    })
})
});
