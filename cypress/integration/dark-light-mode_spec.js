describe("Should test change between dark or light mode", () => {
  it("Should change mode of application.", () => {
    cy.visit("/login");
    cy.get('[cy-test="cy-test-mode-button"]').click();
  });

  afterEach(() => {
    const mode = window.localStorage.getItem("darkMode");
    expect(mode).to.equal("dark");
  });
});
