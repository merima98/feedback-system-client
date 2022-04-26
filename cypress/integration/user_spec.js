describe("Should test user's component.", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get('[cy-test="cy-test-login-email"]').type(
      "john.doe0.5541407036544952@test.com"
    );
    cy.get('[cy-test="cy-test-login-password"]').type("admin");
    cy.get('[cy-test="cy-test-login-button"]').click();
  });

  it("Should change user's data.", () => {
    cy.url().should("eq", "http://localhost:3000/");
    cy.get(".css-1nzm2p4 > .MuiButtonBase-root > svg").click();
    cy.get(
      '.css-1t3k1b1-MuiModal-root-MuiPopover-root-MuiMenu-root > .MuiPaper-root > .MuiList-root > [tabindex="0"]'
    ).click();

    cy.get('[cy-test="cy-test-edit-profile-button"]').click();

    cy.get('[cy-test="cy-test-edit-user-profile-firstName"]').type("Changing");
    cy.get('[cy-test="cy-test-edit-user-profile-update-button"]').click();
  });
});
