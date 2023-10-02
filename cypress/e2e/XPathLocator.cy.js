/////XPath Locator

describe("Xpath", () => {
    it("test1",() => {

        cy.visit("https://automationpractice.com/index/php")

        cy.xpath("//ul[@id='homefeatured']/li").should("java.length", 7)

    })

    it("test2",() => {

        cy.visit("https://automationpractice.com/index/php")

        cy.xpath("//ul[@id='homefeatured']").xpath("./li").should("java.length", 7)

    })
})