var dayjs = require("dayjs");
const timeString = "MM-DD-HH:mm:ss";
describe("KVR", () => {
  it("first month", () => {
    cy.visit("https://www22.muenchen.de/termin/index.php?loc=FS");
    cy.viewport(1200, 1000); // Set viewport to 550px x 750px
    cy.get(
      "[href=\"javascript:toggle('Umschreibung_SPACE_eines_SPACE_ausländischen_SPACE_Führerscheins');\"] > h3"
    ).click();
    cy.get('[name="CASETYPES[FS Umschreibung Ausländischer FS]"]').select("1");
    cy.get(".WEB_APPOINT_FORWARDBUTTON").click();
    cy.get(".WEBAPPOINT_LOCATION_CONTENT").screenshot(
      dayjs().format(timeString + "-1")
    );
    cy.get(".WEBAPPOINT_LOCATION_CONTENT > div > div > .navMonthText")
      .nextAll()
      .eq(0)
      .click();
    cy.get(".WEBAPPOINT_LOCATION_CONTENT").screenshot(
      dayjs().format(timeString + "-2")
    );
  });
});
