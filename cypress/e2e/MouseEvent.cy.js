/// <reference types="Cypress" />

import "cypress-iframe";

require("@4tw/cypress-drag-drop");

describe("event", function() {

    const BASE_URL = "https://demo.opencart.com/";
    const URL_CLICK = "https://swisnl.github.io/jQuery-contextMenu/demo.html";
    const URL_DOUBLE_CLICK = "https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_ev_ondbclick3";
    const URL_DROP_DOWN = "http://www.dhtmlgoodies.com/scripts/drag-drop-custom/demo-drag-drop-3.html";
    const URL_SCROLL = "http://countries-ofthe-world.com/flags-of-the-world.html";

    it("MouseHover", () => {

        cy.visit(BASE_URL);
        
        cy.get("body > main:nth-child(3) > div:nth-child(1) > nav:nth-child(1) > div:nth-child(3) > ul:nth-child(1) > li:nth-child(2) > a:nth-child(1)")
        .should("not.be.visible")

        cy.get(".nav > :nth-child(1) > .dropdown-toggle").trigger("mouseover").click({force: true});

        cy.get("body > main:nth-child(3) > div:nth-child(1) > nav:nth-child(1) > div:nth-child(3) > ul:nth-child(1) > li:nth-child(2) > a:nth-child(1)")
            .should("be.visible")

    })

    it("rigth click", () => {

        cy.visit(URL_CLICK);

        cy.get(".context-menu-one.btn.btn-neutral").trigger("contextmenu");

        cy.get(".context-menu-icon-copy > span").should("be.visible");

        /////////////

        cy.get(".context-menu-one.btn.btn-neutral").rightclick();

        cy.get(".context-menu-icon-copy > span").should("be.visible");
        
    })

    it("double click ", () => {

        cy.visit(URL_DOUBLE_CLICK);

        cy.frameLoaded("#iframeResult");

        cy.iframe("#iframeResult").find("button[ondbclick='myFunction()']").trigger("ondbclick");
        cy.iframe("#iframeResult").find("field2").should("have.value", "Hello World!");

        cy.iframe("#iframeResult").find("button[ondbclick='myFunction()']").ondbclick();
        cy.iframe("#iframeResult").find("field2").should("have.value", "Hello World!");
        
    })

    it("drop and drag using plugin ", () => {
        
        cy.visit(URL_DROP_DOWN);

        cy.get("#box6").should("be.visible");
        cy.get("#box106").should("be.visible");

        cy.wait(2000);

        cy.get("#box6").drag("box106", {force: true});

    })

    it.only("scrollign pages ", () => {
        
        cy.visit(URL_SCROLL);

        cy.get(":nth.child(1) > tbody > :nth:child(86) > :nth-child(1) > img").scrollIntoView({duration: 2000}); 
        cy.get(":nth.child(1) > tbody > :nth:child(86) > :nth-child(1) > img").should("be.visible"); 
        cy.get(":nth.child(1) > tbody > :nth:child(4) > :nth-child(1) > img").scrollIntoView({duration: 1500});
        cy.get(":nth.child(1) > tbody > :nth:child(4) > :nth-child(1) > img").should("be.visible"); 

        cy.wait(3000);

        cy.get("#footer").scrollIntoView();

    })

})