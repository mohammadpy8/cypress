///Locator////
///CSS selector & Xpath
describe("CSSLocatior", () => {
  it("csslocator", () => {
    cy.visit("https://automationpractice.com/index/php");

    cy.get("#search_query_top").type("T-Shirts");   ////id

    cy.get(".search_query").type("T-Shirts") ///class

    cy.get("[name='search_query']").type("T-Shirts")

    cy.get("input.search_query[name='search_query']").type("T-Shirts");   ///tag class attributes

    cy.get("[name='submit_search']").click();

    cy.get(".lighter").contains("T-Shirts")  ////Assertion 

    // cy.get("")

    cy.get(".lighter").contains("abc")
  });
});
