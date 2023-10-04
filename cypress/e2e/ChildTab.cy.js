/// <reference types="Cypress" />


describe("child tab", () => {

    const baseurl= "https://www....";

    it("child1", () => {
        cy.visit(baseurl);  ////parent tab

        cy.get(".example > a").invoke("removeAttr", "target").click() /// checking link

        cy.url().should("include", baseurl);

        cy.wait(5000);

        ////oprators

        cy.go("back");   ///back to parent tab
    })


    it("child2", () => {
        cy.visit(baseurl);

        cy.get(".example > a").then(e => {
            let url = e.prop("href");

            cy.visit(url);
        })

        cy.url().should("include", baseurl);

        cy.wait(5000);

        cy.go("back");
    })
    
})