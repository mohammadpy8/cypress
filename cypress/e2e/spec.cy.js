describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })

  /* ==== Test Created with Cypress Studio ==== */
  it('mmmm', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('https://stage1.qhami.com');
    cy.get('#profile > [href="/"] > :nth-child(1) > .sc-eCQiwC').click();
    cy.get('#username').clear('0');
    cy.get('#username').type('09550000012');
    cy.get('#password').clear('1');
    cy.get('#password').type('123456789');
    cy.get('#captchaValue').clear('6');
    cy.get('#captchaValue').type('622926');
    cy.get('.login100-form-btn').click();
    cy.get('.cardtwo > :nth-child(1) > [style="display: flex; text-align: center;"] > [style="display: flex; width: 100%; padding: 2% 1%; border-radius: 10px; align-items: center; justify-content: center; margin: auto; flex-direction: column;"] > :nth-child(1) > .nav-link > .sc-eCQiwC').click();
    cy.get('.pr-3 > .ml-3').click();
    /* ==== End Cypress Studio ==== */
  });
})