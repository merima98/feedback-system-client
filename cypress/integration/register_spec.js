describe("Should test register form.", () => {
  it("Should register to the application.", () => {
    cy.visit("/");
    cy.get('[cy-test="cy-test-first-name"]').type("John");
    cy.get('[cy-test="cy-test-last-name"]').type("Doe");
    cy.get('[cy-test="cy-test-register-email"]').type(
      `john.doe${Math.random()}@test.com`
    );

    cy.get('[cy-test="cy-test-register-password"]').type("admin");
    cy.get('[cy-test="cy-test-register-role"]').type("Software developer");
    cy.get('[cy-test="cy-test-register-button"]').click();
    cy.url().should("eq", "http://localhost:3000/");
  });
});
