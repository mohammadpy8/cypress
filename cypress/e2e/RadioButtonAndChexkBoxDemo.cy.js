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

/// <reference types="Cypress" />

describe("karafrini ejtamaie", () => {
    const main_url = "https://stage1.qhami.com/";
  
    it("karafrini", () => {
  
      cy.visit(main_url);
      cy.get('#profile > [href="/"]').click()//رفتن به صفحه لاگین 
  
      cy.url().should('include', '/sso/login')// چک کردن وارد شدن در صفحه لاگین
      cy.get('#username').type("09550000012")//وارد کردن نام کاربری
      cy.get('#password').type("123456789")//وارد کردن پسور
      cy.get('#captchaValue').type('111111')//وارد کردن کد کپچا
      cy.get('.login100-form-btn').click();
  
      cy.wait(750);
      cy.get('#profile > [href="/"] > :nth-child(1)').click({force: true}); ///رفتن به پروفایل
  
      cy.wait(750);
  
      cy.get('.gawfzR').scrollTo("0%", "35%", {ensureScrollable: false})
      cy.wait(750);
  
      let nationalCode;
      let username;
  
      cy.then(() => {
        cy.getAllLocalStorage().then(result => {
          
          const getNationalCode = JSON.parse(result["https://stage1.qhami.com"].userInfo);/////گرفتن کل اطلاعات کاربر
          const getValusOfObjects = Object.values(getNationalCode); ////گرفتن تمام value های ابجکت
          
          username = getValusOfObjects[2]; ////ست کردن کاربر
          nationalCode = getValusOfObjects[3]; ////ست کردن کد ملی
  
          console.log(username, nationalCode);///// چک کردن کد ملی و نام کاربری
        })
        .then(() => {
          cy.get(':nth-child(4) > .frameTextandIcon > .sc-guDMob').click({force: true}); //// رفتن به قسمت اعضا
          cy.wait(750);
          cy.pause(); /// تا اطلاعات لود بشه
          cy.request({ //////گرفتن اطلاعات کاربران
            method: "GET",
            url: 
            "https://stage1api.qhami.com/mems/user-profile/?searchFilterModel=%7B%22searchFilterBoxList%22%3A%5B%7B%22restrictionList%22%3A%5B%7B%22fieldName%22%3A%22selected_role_id%22%2C%22fieldOperation%22%3A%22EQUAL%22%2C%22fieldValue%22%3A46%2C%22nextConditionOperator%22%3A%22AND%22%7D%5D%7D%2C%7B%22restrictionList%22%3A%5B%5D%7D%5D%2C%22sortList%22%3A%5B%7B%22fieldName%22%3A%22id%22%2C%22type%22%3A%22DSC%22%7D%5D%2C%22page%22%3A0%2C%22rows%22%3A10%7D",
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(response => {
            console.log(response);
          })
        })
      })
    });
  });
  