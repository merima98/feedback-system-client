describe("Should test feedback.", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get('[cy-test="cy-test-login-email"]').type(
      "john.doe0.5541407036544952@test.com"
    );
    cy.get('[cy-test="cy-test-login-password"]').type("admin");
    cy.get('[cy-test="cy-test-login-button"]').click();
  });

  it("Should add new feedback.", () => {
    cy.url().should("eq", "http://localhost:3000/");
    cy.get(".MuiContainer-maxWidthSm > :nth-child(1)").click();
    cy.get('[cy-test="cy-test-new-feedback"]').type(
      "You did great job on today's presentation!!👌🏻"
    );

    cy.get('[cy-test="cy-test-leave-feedback-button"]').click();
  });
});
