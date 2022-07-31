var dayjs = require("dayjs");
const timeString = "MM-DD-HH:mm:ss";
describe("KVR", () => {
  it("first month", () => {
    cy.visit("https://terminvereinbarung.muenchen.de/bba/termin/?loc=BB");
    cy.viewport(1200, 1000); // Set viewport to 550px x 750px
    cy.get(
      '[href="javascript:toggle(\'Meldeangelegenheiten\');"] > h3'
    ).click();
    /*cy.get(
      "[href=\"javascript:toggle('Ortskundeprüfung');\"] > h3"
    ).click();*/
    cy.get('[name="CASETYPES[FS Umschreibung Ausländischer FS]"]').select("1");
    //cy.get('[name="CASETYPES[FS Anmeldung und Vereinbarung Prüftermin]"]').select("1");
    cy.get(".WEB_APPOINT_FORWARDBUTTON").click();

    cy.get(".nat_calendar_weekday_bookable").should("not.exist");

    cy.get(".WEBAPPOINT_LOCATION_CONTENT > div > div > .navMonthText")
      .nextAll()
      .eq(0)
      .click();

    //cy.get(".nat_calendar")
    cy.get(".nat_calendar_weekday_bookable").should("not.exist");
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
