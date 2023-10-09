/// <reference types="Cypress" />

describe("api", () => {
  const baseurl = "https://jsonplaceholder.typicode.com/posts/";
  const touristurl = "http://restapi.adequateshop.com/api/Tourist";
  const queryurl = "https://reqres.in/api/users";
  const accessTokenUrl = "https://simple-books-api.glitch.me/api-clients/";
  const accessToken = "https://simple-books-api.glitch.me/orders/";
  const storeApi = "https://fakestoreapi.com/products";
  const baseAuth = "https://postman-echo.com/basic-auth";
  const bearerAccessToken = "https://api.github.com/user/repos";

  it("httprequest GET", () => {
    cy.request("GET", `${baseurl}1`).its("status").should("equal", 200);
  });

  it("httprequest POST", () => {
    cy.request({
      method: "POST",
      url: baseurl,
      body: {
        title: "number1",
        body: "hello word",
        userId: 1000,
      },
    })
      .its("status")
      .should("equal", 201);
  });

  it("httprequest PUT", () => {
    cy.request({
      method: "PUT",
      url: `${baseurl}1`,
      body: {
        title: "number2",
        body: "word",
        userId: 10000,
      },
    })
      .its("status")
      .should("equal", 200);
  });

  it("httprequest DELETE", () => {
    cy.request({
      method: "DELETE",
      url: `${baseurl}10`,
    })
      .its("status")
      .should("equal", 200);
  });

  it("Hard coded json object", () => {
    const requestBody = {
      tourist_name: "Mike",
      tourist_email: "mike987645@gmail.com",
      tourist_location: " Paris",
    };

    cy.request({
      method: "POST",
      url: touristurl,
      body: requestBody,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.tourist_name).to.eq("Mike");
      expect(response.body.tourist_email).to.eq("mike987645@gmail.com");
      expect(response.body.tourist_location).to.eq("Paris");
    });
  });

  it("dynamic object", () => {
    const requestBody = {
      tourist_name: Math.random().toString(5).substring(2),
      tourist_email: Math.random().toString(5).substring(2) + "@gmail.com",
      tourist_location: "Paris",
    };

    cy.request({
      method: "POST",
      url: touristurl,
      body: requestBody,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.tourist_name).to.eq(requestBody.tourist_name);
      expect(response.body.tourist_email).to.eq(requestBody.tourist_email);
      expect(response.body.tourist_location).to.eq(
        requestBody.tourist_location
      );
    });
  });

  it("json object", () => {
    cy.fixture("tourist").then((data) => {
      const requestBody = data;

      cy.request({
        method: "POST",
        url: touristurl,
        body: requestBody,
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.tourist_name).to.eq(requestBody.tourist_name);
        expect(response.body.tourist_email).to.eq(requestBody.tourist_email);
        expect(response.body.tourist_location).to.eq(
          requestBody.tourist_location
        );

        expect(response.body).has.property(
          "tourist_name",
          requestBody.tourist_name
        );
        expect(response.body).has.property(
          "tourist_email",
          requestBody.tourist_email
        );
        expect(response.body).has.property(
          "tourist_location",
          requestBody.tourist_location
        );
      });
    });
  });

  it.only("query params", () => {
    const queryParams = { page: 2 };

    cy.request({
      method: "GET",
      url: queryurl,
      qs: queryParams,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.status).equal(200);
      expect(response.body.page).to.eq(2);
      expect(response.body.data).has.length(6);
      expect(response.body.data[0]).has.property("id", 7);
      expect(response.body.data[0]).has.property("first_name", "Michael");
    });
  });

  let AuthToken;

  it.only("access token", () => {
    cy.request({
      method: "POST",
      url: accessTokenUrl,
      headers: {
        "Content-Types": "application/json",
      },
      body: {
        clientName: "ABC",
        clientEmail: Math.random().toString(5).substring(2) + "@gmail.com",
      },
    }).then((response) => {
      AuthToken = response.body.accessToken;
      console.log(AuthToken);
    });
  });
  it.only("create new order", () => {
    cy.request({
      method: "POST",
      url: accessToken,
      headers: {
        "Content-Types": "application/json",
        Authorization: `Bearer ${AuthToken}`,
      },
      body: {
        bookId: 1,
        customerName: "xyz",
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.created).to.eq(true);
    });
  });

  it.only("fetch orders", () => {
    cy.request({
      method: "GET",
      url: accessToken,
      headers: {
        "Content-Types": "application/json",
        Authorization: `Bearer ${AuthToken}`,
      },
      cookies: {
        cookieName: "mycookie",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).has.length(1);
    });
  });

  it("parsing json", () => {
    cy.request({
      method: "GET",
      url: storeApi,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).has.length(20);
      expect(response.body[0].id).to.equal(1);
    });
  });

  it("complex parsing json", () => {
    const limitQs = { limit: 5 };
    let totalPrice = 0;

    cy.request({
      method: "GET",
      url: storeApi,
      qs: limitQs,
    }).then((response) => {
      expect(response.status).to.eq(200);

      response.body.forEach((items) => {
        totalPrice += items.price;
        console.log(totalPrice);
      });
      expect(totalPrice).to.eq(899.23);
    });
  });

  it("basic authentication", () => {
    cy.request({
      method: "GET",
      url: baseAuth,
      auth: {
        user: "postman",
        password: "password",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);

      expect(response.body.authenticated).to.equal(true);
    });
  });

  it("digest auth", () => {
    cy.request({
      method: "GET",
      url: baseAuth,
      auth: {
        username: "postman",
        password: "password",
        method: "degest",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);

      expect(response.body.authenticated).to.equal(true);
    });
  });

  it("Bearer access token", () => {
    const token = "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";

    cy.request({
      method: "GET",
      url: bearerAccessToken,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it.only("requset chaining", () => {

    const id = 10

    cy.request({
      method: "GET", 
      url: baseurl, 
    })
    .then(response => {
        expect(response.status).to.eq(200);
        console.log((response.body));
        if(response.body.length === 100) {
            const filterProducts = response.body.filter(items => items.id === 10);
            console.log(filterProducts, "one");
            const filterdProductsChanges = response.body.filter(items => items.id !== id);
            console.log(filterdProductsChanges, "other");
        } else {
            console.log("error");
        }
    })
  });

  it.only("fetching", () => {

    const url = ["posts", "todos", "albums", "users"]

    const randomIndex = (max) => Math.floor(Math.random() * max) + 1;
         
    const BASE_URL = "https://jsonplaceholder.typicode.com";

    cy.request({
        method: "GET",
        url: `${BASE_URL}/${url[randomIndex(3)]}`
    })
    .then(response => {
        console.log(response.body);
        expect(response.status).to.eq(200);
    })
  })
});
