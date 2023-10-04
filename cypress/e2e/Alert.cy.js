/// <reference types="Cypress" />


describe("alert", function() {
    it("alert show", () => {
        cy.visit("https://the-internet.herokuapp.com/javascript_alerts")

        cy.get("button[onclick='jsAlert()']").click()

        cy.on("window:alert", (t => {
            expect(t).to.contains("I am js Alert")
        }))

        cy.get("#result").should("have.text", "You successfully clicked alert")
    })

    it.skip("alert show", () => {
        cy.visit("https://the-internet.herokuapp.com/javascript_alerts")

        cy.get("button[onclick='jsAlert()']").click()

        cy.on("window:alert", (t => {
            expect(t).to.contains("I am js Alert")
        }))

        cy.get("#result").should("have.text", "You successfully clicked alert")
    })
})