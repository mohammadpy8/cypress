// const cypress = require("cypress");

describe("first name", () => {
  it("test1", () => {
    expect(true).to.equal(true);
  });
  it("test2", () => {
    expect(true).to.equal(true);
  });
  it("test3", () => {
    expect(true).to.equal(true);
  });
});

describe("secode", () => {
  it("secondeTest", function () {
    expect(true).to.equal(true);
  });
});

describe("My First Test", () => {
  it("Does not do much!", () => {
    //steps
    expect(true).to.equal(true);
  });
});

describe("test one", () => {
    it("visit1 verify-title-positive", function() {
        cy.visit('https://opensource-demo.orangehrmlive.com/')

        cy.title().should("eq", "OrangeHRM");
    })  
    
    it("visit2 verify-title-negitive", () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/')

        cy.title().should("eq", "OrangeHRM");
    })
})


