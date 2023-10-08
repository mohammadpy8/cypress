/// <reference types="Cypress" />

describe("aghsat", () => {
  const BASE_URL = "https://stage1.qhami.com";
  const MHESAM_URL = "https://stage1.fardaap.com";

  it("open agsath", () => {
    let m_aghsat_url = "https://stage1maghsat.qhami.com/";

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

    // cy.get(".login100-form-btn").check();

    // console.log(cy.get(".login100-form-btn").check());

    cy.url().should("include", "qhami.com");

    cy.wait(500);

    cy.contains("ورود به ام حسام").click({ force: true });
    cy.wait(500);

    cy.origin(MHESAM_URL, () => {
      let checkDisbleATT;
      cy.get('a[href="/MAghsatHesan"]').click({ force: true }); 

      cy.wait(500);
    //   cy.pause();

    //   cy.wait(500);

    cy.get(':nth-child(1) > .col-12 > .mt-2.d-flex > .btn-primary-hesan').click()

      cy.get(".btn-apply-mhesam-credit")
        .should(($btn) => {
          if ($btn.hasClass("disabled")) {
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
            cy.getAllLocalStorage().then((result) => {
              const json = JSON.parse(result[BASE_URL].mresaletPwa);
              token = json.token.access_token;
              console.log(token);
            });
          })
            .then(() => {
              cy.url().then((url) => {
                console.log(url);
                LocationID = url.split("=")[1];
                console.log(LocationID);
              });
            })
            .then(() => {
              if (checkDisbleATT) {
                alert("غیرفعال است");
              } else {
                cy.get('.mx-auto').click({ force: true });
                cy.get(".amount-money-container").type(amount);
                cy.get(".btn-primary-hesan").click({ force: true });
              }
            });
        });
    }).then(() => {
      cy.wait(500);

      cy.visit(m_aghsat_url);

      cy.get(".confirm-btn").click({ force: true });
      cy.wait(500);
      cy.get(".form-check-input").click({ force: true });
      cy.get("confirmBtn").click({ force: true });
    });                
  });
});
