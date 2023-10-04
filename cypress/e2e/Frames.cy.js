/// <reference types="Cypress" />

import "cypress-inframe";

describe("frame" ,function() {

    const BASE_URL = "http://the-internet.herokuapp.com/iframe";

    it("frames1", function() {
        
        cy.visit(BASE_URL);

        const iframe = cy.get("#mce_0_ifr")
            .its("0.contentDocument.body")
            .should("be.visible")
            .then(cy.wrap)

        iframe.clear().type("Welcome {cmd+a}");

        cy.get("[aria-label='bold']").click()
         
    })

    it.only("frames2", function() {
        
        cy.visit(BASE_URL);

        cy.getIframe("#mce_0_ifr")
            .clear().type("Welcome {cmd+a}");

        cy.get("[aria-label='bold']").click()
         
    })

    it.only("frames3 for plugin npm ", function() {
        
        cy.visit(BASE_URL);

        cy.frameLoaded("#mce_0_ifr") ////load in frame

        cy.inframe("#mce_0_ifr").clear().type("Welcome")

        cy.get("[aria-label='bold']").click();

    })

})