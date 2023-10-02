//Assertions ////

describe("assertion1", () =>{
    it("visit web", () => {
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")

        cy.url().should("include", "orangehrmlive.com")
        cy.url().should("eq", "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")

        cy.url().should("contain", "orangehrm")

        cy.url().should("include", ".com")

        // .cy.url().should().should().should() /////// to dar to////
    })

    ////////// should before and ///////////////

    it("and", () => {

        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
        cy.url().should("include", "orangehrmlive.com")
        .and("eq", "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
        .and("contain", "login")
        .and("not.contain", "greenhrm")

        cy.title().should("include", "Orange")
        .and("eq", "OrangeHRM")
        .and("contain", "HRM")

        ////////cy.title().and().and()/////

         cy.get(".orangehrm-login-branding > img").should("be.visible")  ///logo visible
         .and("exist") /// logo exist

         cy.xpath("//a").should("have.length", "5")   ///No of Links////

         cy.get('.orangehrm-login-logo > img').and("exist");

         cy.get("input[placeholder='Username']").type("Admin") /// check value into input box////

         cy.get("input[placeholder='Username']").should("have.value", "Admin") /// check have value into input box////

        //  cy.get("input[placeholder='Password']").type("Passowrd")

        //  cy.get("input[placeholder='Password']").should("have.value", "admin123")

    });

    it("assertion and explicit", () => {
    
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")

        cy.get("input[placeholder='Username']").type("Admin") ///username

        cy.get("input[placeholder='Password']").type("admin123") ///password///

        cy.get("button[type='submit']").click() /////Login website//////

        let expName = "Paul Collings";

        cy.get(".oxd-userdropdown-name").then((x) => {
            let actName = x.text()

            ///BDD styles

            expect(actName).to.equal(expName)
            expect(actName).to.not.equal(expName)

            ///TDD styles

            assert.equal(actName, expName)
            assert.notEqual(actName, expName)
        })

    })

})