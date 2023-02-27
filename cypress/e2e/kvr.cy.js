var dayjs = require("dayjs");
const timeString = "MM-DD-HH:mm:ss";
describe("KVR", () => {
  it("first month", () => {
    cy.visit("https://terminvereinbarung.muenchen.de/fs/termin/?loc=FS&ct=1071898");
    cy.viewport(1200, 1000); // Set viewport to 550px x 750px

    // cy.get(
    //   '#Umschreibung_SPACE_eines_SPACE_ausländischen_SPACE_Führerscheins'
    // ).click();
    // /*cy.get(
    //   "[href=\"javascript:toggle('Ortskundeprüfung');\"] > h3"
    // ).click();*/
    // cy.get('#').select("1");
    //cy.get('[name="CASETYPES[FS Anmeldung und Vereinbarung Prüftermin]"]').select("1");
    cy.get(".WEB_APPOINT_FORWARDBUTTON").should("exist");

    cy.get(".WEB_APPOINT_FORWARDBUTTON").click();

    cy.get(".nat_calendar_weekday_bookable").should("not.exist");

    cy.get(".WEBAPPOINT_LOCATION_CONTENT > div > div > .navMonthText")
      .nextAll()
      .eq(0)
      .click();

    //cy.get(".nat_calendar")
    //cy.get(".nat_calendar_weekday_bookable").should("not.exist");
  });
});

/*cy.get(".WEBAPPOINT_LOCATION_CONTENT").screenshot(
      dayjs().format(timeString + "-1")
    );
    cy.get(".WEBAPPOINT_LOCATION_CONTENT > div > div > .navMonthText")
      .nextAll()
      .eq(0)
      .click();
    cy.get(".WEBAPPOINT_LOCATION_CONTENT").screenshot(
      dayjs().format(timeString + "-2")
    );*/
