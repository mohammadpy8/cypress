/// <reference types="Cypress" />
//<reference types="cypress-xpath" />

describe("drop", () => {

    it.skip("selected drop down", () => {

        cy.visit("https://www.zoho.com/commerce/free-demo.html")

        cy.get("#zcf_address_country").select("Italy").should("have.value", "Italy")

    })

    it("selected drop down", () => { ////auto suggest

        cy.visit("https://www.zoho.com/commerce/free-demo.html")

        cy.get("#zcf_address_country").select("Italy").should("have.value", "Italy");

        cy.get("#selectedItem").click()

        cy.get(".selected").type("Italy").type("{enter}") /////key enter click////

        cy.get("#selectedItem").should("heve.text", "Italy")

    })

    it("dynamic wiki", function() {
        cy.visit("https://www.wikipedia.org/")

        const search = cy.get("#searchInput").type("Dehli9");

        const newSearch = Object(search);

        console.log(search);
        console.log(newSearch);

        cy.get(".suggestion-title").contains("Dehli").click()
    })

    it.skip("wiki", function() {
        cy.visit("https://www.wikipedia.org/")

        cy.get("#searchInput").type("Dehli")

        cy.get(".suggestion-title").contains("Dehli").click()
    })

    it("google", function() {
        cy.visit("https://www.google.com")

        cy.get("div").should("have.length", 11)

        cy.wait(3000);

        cy.get("div.dd").each(($el, index, $list) => {
            if($el.text() === "") {
                cy.wrap($el).click()
            }
        })

        cy.get("div").should("have.value", "delkhahe")
    })

})