/// <reference types="Cypress" />

describe("aghsat", () => {
  const BASE_URL = "https://stage1.qhami.com";
  const MHESAM_URL = "https://stage1.fardaap.com";

  it("open agsath", () => {
    cy.visit(BASE_URL);

    cy.wait(500);

    cy.get("#profile > [href='/']").click();

    cy.wait(500);

    cy.url().should("include", "sso/login");

    // cy.wait(500);

    cy.wait(500);

    cy.get("input[name='username']").click().type("09550000012");

    cy.wait(500);

    cy.get("input[name='password']").click().type("123456789");

    cy.wait(500);

    cy.get("#captchaValue").click().type("111111");

    cy.get(".flex-sb-m > div > .txt1").click();

    cy.get("#username").click().type("00000");

    cy.get("#nationalCode").click().type("00000");
    cy.get("#captchaValue").click().type("0000000");
    cy.get(".login100-form-btn").click();
    cy.wait(500);
    cy.get(".swal2-confirm").click();
    cy.get(".back_btn").click();

    cy.get("input[name='username']").click().type("09550000012");

    cy.wait(500);

    cy.get("input[name='password']").click().type("123456789");

    cy.wait(500);

    cy.get("#captchaValue").click().type("111111");
    cy.get(".login100-form-btn").click();

    cy.url().should("include", "qhami.com");

    cy.wait(500);

    cy.contains("ورود به ام حسام").click({ force: true });
    cy.wait(500);

    cy.origin(MHESAM_URL, () => {
      let checkDisbleATT;
      cy.contains("ام اقساط پلاس").click({ force: true });

      cy.wait(500);
      cy.pause();

      cy.get(".btn-apply-mhesam-credit")
        .should(($btn) => {
          if ($btn.hasClass(".disabled")) {
            checkDisbleATT = true;
          } else {
            checkDisbleATT = false;
          }
        })
        .then(() => {
          let amount = 50000;
          let LocationID;
          let token;

          cy.then(() => {
            cy.getAllLocalStorage().then((reslut) => {
              const json = JSON.parse(reslut[BASE_URL].mresaletPwa);
              token = json.token.access_token;
              console.log(token);
            });
          })
          .then(() => {
            cy.url().then(url => {

                console.log(url);
                LocationID = url.split("=")[1];
                console.log(LocationID);
            })
          })
          .then(() => {
            if(checkDisbleATT) {
                alert("غیرفعال است")
            } else {
                cy.get(".btn-apply-mhesam-credit").click({force: true});
            }
          })
        });
    });
  });
});
