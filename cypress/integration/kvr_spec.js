describe("KVR", () => {
  it("first month", () => {
    cy.visit("https://www22.muenchen.de/termin/index.php?loc=FS");
    cy.viewport(1200, 1000); // Set viewport to 550px x 750px
    cy.get(
      "[href=\"javascript:toggle('Abholung_SPACE_Führerschein');\"] > h3"
    ).click();
    cy.get('[name="CASETYPES[FS Abholung Führerschein]"]').select("1");
    cy.get(".WEB_APPOINT_FORWARDBUTTON").click();
    cy.get('.WEBAPPOINT_LOCATION_CONTENT').screenshot()
  });
});
