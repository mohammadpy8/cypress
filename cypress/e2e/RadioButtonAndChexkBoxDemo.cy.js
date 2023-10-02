/// <reference types="Cypress" />
/// <reference types="cypress-xpath" />

describe("check ui elemnt", () => {

    it("checking radio button" ,() => {

        cy.visit("https://itera-qa.azurewebsites.net/home/automation")

        ////visibility for radio button

        cy.get("input#male").should("be.visible")
        cy.get("input#female").should("be.visible")
        
        //selected radio button

        cy.get("input#male").check().should("be.checked");
        cy.get("input#female").should("not.be.checked");

        cy.get("input#female").check().should("be.checked");
        cy.get("input#male").should("not.be.checked");
    })

    it("check box ui", () => {

        cy.visit("https://itera-qa.azurewebsites.net/home/automation")

        ///visibility

        cy.get("input#monday").should("be.visible");

        /////checked 

        cy.get("input#monday").click().should("be.checked")

        ///unSelected

        cy.get("input#monday").uncheck().should("not.be.checked");

        //selecting all check box

        cy.get("input.form-check-input[input='checkbox']").check().should("be.checked");
        cy.get("input.form-check-input[input='checkbox']").uncheck().should("not.be.checked");

        //selected first and last check box

        cy.get("input.form-check-input[input='checkbox']").first().check().should("be.checked")
        cy.get("input.form-check-input[input='checkbox']").last().check().should("be.checked")
    })

})