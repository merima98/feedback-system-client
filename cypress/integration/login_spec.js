describe("Should test login form.", () => {
  it("Should login to the application.", () => {
    cy.visit("/login");
    cy.get('[cy-test="cy-test-login-email"]').type("admin@gmail.com");
    cy.get('[cy-test="cy-test-login-password"]').type("admin");
    cy.get('[cy-test="cy-test-login-button"]').click();
    cy.url().should("eq", "http://localhost:3000/");
  });
});
