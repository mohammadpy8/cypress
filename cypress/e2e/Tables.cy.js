/// <reference types="Cypress" />

describe("handle table ", () => {

    const BASE_URL = "https://demo.opencart.com/admin/index.php"

    beforeEach("login", () => {

        cy.visit(BASE_URL);

        cy.get("#input-username").type("demo");

        cy.get("#input-password").type("demo");

        cy.get("button[type='submit']").click()

        cy.get(".btn-close").click()

        cy.get("#menu-customer>a").click()
        cy.get("#menu-customer>ul>li:first-child").click()

    });

    it("check number row & columns", () => {

        cy.get("table[class='table table-bordered table-hover']>tbody>tr").should("have.length", "10");
        cy.get("table[class='table table-bordered table-hover']>thead>tr>td").should("have.length", "7");

    });

    it("check cell data from specefic row & columns ", () => {

        cy.get("table[class='table table-bordered table-hover']>tbody>tr:nth-child(5)>td:nth-child(3)")
            .contains("hfgjhgjgjggj@gmail.com")

    });

    it("read all the rows  & columns data in the first page", () => {

        cy.get("table[class='table table-bordered table-hover']>tbody>tr")
            .each(($row, index, $rows) => {

                cy.wrap($row).within(() => {

                    cy.get("td").each(($col, index, $cols) => {

                        cy.log($col.text())

                    })

                })

            })

    });

    it("pagination", () => {

        let totalPages;

        ///find total number pages 
        cy.get(".col-sm-6.text-end").then(e => {

            let mytext = e.text();
            totalPages = mytext.substring(mytext.indexOf("(")+1, mytext.indexOf("Pages")-1);

            cy.log(`Total pages is => ${totalPages}`);

        })

        /////move pagination step by step /////

        let pages = 5;
        for(let p=1; p<=pages;p++) {
            if(pages>1) {
                cy.log(`total pages is  =>> ${p}`);

                cy.get(`ul[class='pagination']>li:nth-child(${p})`).click()

                cy.wait(3000);

                cy.log("end-pagination");

                cy.get("table[class='table table-bordered table-hover']>tbody>tr")
                    .each(($row, index, $rows) => {
                        cy.wrap($row).within(() => {
                            cy.get("td:nth-child(3)").then(e => {
                                const message = e.text();
                                cy.log(message);  ///email into table/////
                            })
                        })
                    })

            }
        }

    })

})