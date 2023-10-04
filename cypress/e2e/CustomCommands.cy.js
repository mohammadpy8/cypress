/// <reference types="Cypress" />

describe("custom", function() {

    const BASE_URL = "https://demo.nopcommerce.com/";

    it("handling links", () => {

        cy.visit(BASE_URL);

        cy.get("div[class='item-grid'] div:nth-child(2) div:nth-child(1) div:nth-child(2) h2:nth-child(1) a:nth-child(1)").click()
        cy.get("div[class='product-name'] h1").should("have.text", "Apple MacBook Pro 13-inch");

        cy.clickLinks("Apple MacBook Pro 13-inch")

    });

    it("owerithing existing commands", function(){

        cy.visit(BASE_URL);

        cy.clickLinks("Apple MacBook Pro 13-inch".toUpperCase());
        cy.get("div[class='product-name'] h1").should("have.text", "Apple MacBook Pro 13-inch");
        

    });

    it.only("login commands", function(){

        cy.visit(BASE_URL);

        cy.clickLinks("Log in");
        cy.loginapp("m@gmail.com", "123456");

        cy.get(".ico-account").should("have.text", "My account");

    });

})