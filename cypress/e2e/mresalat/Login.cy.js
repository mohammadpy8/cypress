/// <reference types="Cypress" />

describe("login", () => {
  const BASE_URL = "https://stage1.qhami.com";
  const MHESAM_URL = "https://stage1.fardaap.com";

  it("open web", () => {
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

    cy.get(
      '.cardtwo > :nth-child(1) > [style="display: flex; text-align: center;"] > [style="display: flex; width: 100%; padding: 2% 1%; border-radius: 10px; align-items: center; justify-content: center; margin: auto; flex-direction: column;"] > :nth-child(1)'
    ).click({ force: true });

    cy.contains("ورود به ام حسام").click({ force: true });

    cy.origin(MHESAM_URL, () => {
      const amount = 1;
      const mqr = 9;
      let haseCreaditPlus = false;
      let token;

      cy.then(() => {
        cy.getAllLocalStorage().then((result) => {
          console.log(result);
          let json = JSON.parse(result[BASE_URL].mresalatPwa);
          console.log(json);
          token = json.token.access_token;
          console.log(token);
        });
      }).then(() => {
        cy.wait(500);

        cy.get("#profile > div").click({ force: true });

        cy.wait(500);

        cy.get(".confirm_input_mqr").click().type(mqr);

        cy.wait(500);

        cy.get(":nth-child(2) > :nth-child(3) > .sc-bczRLJ").click();

        cy.wait(500);

        cy.request({
          method: "GET",
          url: `https://stage1api.qhami.com/mhesam/mqr/get-sat-info/${mqr}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          cy.request({
            method: "GET",
            url: `https://stage1api.qhami.com/mhesam/mqr/mqr-credit?checkCreditRequestModel={"promotedMemberUserId":${response.body.terminalFacilityId},"parcelAmount":${amount}}`,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }).then((response) => {
            let amountFinal = 0;

            cy.then(() => {
              console.log(response.body);
              response.body.creditFacilityHesanResponseModels.map((items) => {
                if (items.facilityModel) {
                  items.creditFacilityHesanListModelList.map((finall) => {
                    amountFinal += finall.availableAmount;
                    console.log(amountFinal);
                  });
                }
              });
            }).then(() => {
              let price = 50000;
              cy.get("input[label='ام اقساط پلاس']").click();
              cy.wait(500);
              cy.get(".input_mqr_credit").type(price);
              cy.wait(500);
              cy.get("div[class='p-2']").click({ force: true });
              cy.wait(1000);

              cy.wait(500);
              cy.get(".aghsat-plus").click();
              cy.wait(500);
              cy.get(".aghsat-plus").then(($el) => {
                if ($el.find("#react-select-3-listbox").length > 0) {
                  haseCreaditPlus = true;
                  console.log(haseCreaditPlus);
                  cy.get(
                    "#react-select-3-option-0 > div > :nth-child(1)"
                  ).click({ force: true });
                  cy.wait(500);
                  cy.get(
                    "button[class='sc-bczRLJ VtMnX confirm_Mqr_btn_active']"
                  ).click({ force: true });

                  cy.window().then((getNatioalCode) => {
                    const userInfos = JSON.parse(
                      getNatioalCode.localStorage.getItem("userInfo")
                    );
                    console.log(userInfos);
                    cy.wait(500);
                    cy.get(".Input_cnfPayment_modal_one")
                      .type(userInfos.nationalCode)
                      .invoke("val")
                      .then((lengthVal) => {
                        if (lengthVal.length === 10) {
                          cy.contains("دریافت کد تایید").click({ force: true });
                        }
                      });
                  });

                  cy.wait(500);

                  cy.get(
                    ":nth-child(4) > :nth-child(1) > .modal > #modalFadeOut > .modal-content > .modal-custom-component-header > .sc-gsnTZi"
                  ).click({ force: true });

                  cy.wait(500);
                }
              });
            });
          });
        });
      });
    });
    cy.visit(BASE_URL);
  });
});
