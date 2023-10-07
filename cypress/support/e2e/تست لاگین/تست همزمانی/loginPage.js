describe('Mresalat-pwa', (username, password) => {

    it('open web site', () => {
        cy.visit('/');//باز کردن وب سایت
        cy.get('#profile > [href="/"]').click()//رفتن به صفحه لاگین 

        cy.url().should('include', '/sso/login')// چک کردن وارد شدن در صفحه لاگین
        cy.get('#username').type(username)//وارد کردن نام کاربری
        cy.get('#password').type(password)//وارد کردن پسور
        cy.get('#captchaValue').type('111111')//وارد کردن کد کپچا
        cy.get('.login100-form-btn').click()//انجام عملیات لاگین

        cy.url().should('include', 'qhami.com')//چک کردن بازگشت به صفحه اصلی بعد از لاگین 
    });

})
