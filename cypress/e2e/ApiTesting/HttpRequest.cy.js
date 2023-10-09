/// <reference types="Cypress" />

describe("api", () => {

    const baseurl = "https://jsonplaceholder.typicode.com/posts/";
    const touristurl = "http://restapi.adequateshop.com/api/Tourist";

    it("httprequest GET", () => {

        cy.request("GET", `${baseurl}1`)
        .its("status")
        .should("equal", 200)

    });

    it("httprequest POST", () => {

        cy.request({
            method: "POST",
            url: baseurl,
            body: {
                title: "number1",
                body: "hello word",
                userId:1000,
            }
        })
        .its("status")
        .should("equal", 201)
    })

    it("httprequest PUT", () => {

        cy.request({
            method: "PUT",
            url: `${baseurl}1`,
            body: {
                title: "number2",
                body: "word",
                userId:10000,
            }
        })
        .its("status")
        .should("equal", 200);
    });

    it("httprequest DELETE", () => {

        cy.request({
            method: "DELETE", 
            url: `${baseurl}10`
        })
        .its("status")
        .should("equal", 200)
    });

    it("Hard coded json object", () => {

        const requestBody = {
            tourist_name: "Mike",
            tourist_email: "mike987645@gmail.com",
            tourist_location:" Paris",
        };

        cy.request({
            method: "POST", 
            url: touristurl,
            body: requestBody
        })
        .then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.tourist_name).to.eq("Mike");
            expect(response.body.tourist_email).to.eq("mike987645@gmail.com");
            expect(response.body.tourist_location).to.eq("Paris");
        })
    });

    it("dynamic object", () => {

        const requestBody = {
            tourist_name: Math.random().toString(5).substring(2),
            tourist_email: Math.random().toString(5).substring(2) + "@gmail.com",
            tourist_location: "Paris",
        };

        cy.request({
            method:"POST",
            url: touristurl,
            body: requestBody
        })
        .then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.tourist_name).to.eq(requestBody.tourist_name);
            expect(response.body.tourist_email).to.eq(requestBody.tourist_email);
            expect(response.body.tourist_location).to.eq(requestBody.tourist_location);
        })
    });

    it("json object", () => {

        cy.fixture("tourist").then(data => {
            const requestBody = data;

            cy.request({
                method:"POST",
                url: touristurl,
                body: requestBody
            })
            .then((response) => {
                expect(response.status).to.eq(201);
                expect(response.body.tourist_name).to.eq(requestBody.tourist_name);
                expect(response.body.tourist_email).to.eq(requestBody.tourist_email);
                expect(response.body.tourist_location).to.eq(requestBody.tourist_location);

                expect(response.body).has.property("tourist_name", requestBody.tourist_name);
                expect(response.body).has.property("tourist_email", requestBody.tourist_email);
                expect(response.body).has.property("tourist_location", requestBody.tourist_location);
            })
        })

    });

    it("query params", () => {
        
    })
})