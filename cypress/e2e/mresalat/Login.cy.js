/// <reference types="Cypress" />

describe("login", () => {

    const BASE_URL = "https://stage1.qhami.com/";
    const MHESAM_URL = "https://stage1.fardaap.com"

    it("open web", () => {
        cy.visit(BASE_URL);

        cy.wait(500)

        cy.get("#profile > [href='/']").click();

        cy.wait(500);

        cy.url().should("include", "/login");

        // cy.wait(500);

        cy.wait(500);

        cy.get("input[name='username']").click().type("09550000012")

        cy.wait(500);

        cy.get("input[name='password']").click().type("123456789")

        cy.wait(500);

        cy.get("#captchaValue").click().type("111111")

        cy.get(".flex-sb-m > div > .txt1").click();

        cy.get('#username').click().type("00000");

        cy.get('#nationalCode').click().type("00000");
        cy.get('#captchaValue').click().type("0000000");
        cy.get('.login100-form-btn').click()
        cy.wait(500);
        cy.get('.swal2-confirm').click();
        cy.get('.back_btn').click();

        cy.get("input[name='username']").click().type("09550000012")

        cy.wait(500);

        cy.get("input[name='password']").click().type("123456789")

        cy.wait(500);

        cy.get("#captchaValue").click().type("111111")
        cy.get('.login100-form-btn').click();

        cy.url().should("include", "qhami.com");

        cy.wait(500);

        cy.get('.cardtwo > :nth-child(1) > [style="display: flex; text-align: center;"] > [style="display: flex; width: 100%; padding: 2% 1%; border-radius: 10px; align-items: center; justify-content: center; margin: auto; flex-direction: column;"] > :nth-child(1)').click({force: true})

        cy.contains("ورود به ام حسام").click({force: true});

        cy.origin(MHESAM_URL, () => {
            const amount = 1;
            const mqr = 9;
            let haseCreaditPlus = false;
            let token;

            cy.then(() => {
                cy.getAllLocalStorage().then((result) => {
                    let json = JSON.parse(result["https://stage1.qhami.com"].mresalatPwa);
                    token = json.token.access_token
                    console.log(token);
                })
            })
        })


    })
})