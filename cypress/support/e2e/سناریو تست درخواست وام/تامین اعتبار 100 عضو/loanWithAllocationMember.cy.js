describe('Mresalat-pwa', () => {
    const mresalat_url = 'https://stage1.qhami.com/'

    it('open web site', () => {
        cy.visit(mresalat_url);//باز کردن وب سایت
        cy.get('#profile > [href="/"]').click()//رفتن به صفحه لاگین 

        cy.url().should('include', '/sso/login')// چک کردن وارد شدن در صفحه لاگین
        cy.get('#username').type('09397645294')//وارد کردن نام کاربری
        cy.get('#password').type('123456789')//وارد کردن پسور
        cy.get('#captchaValue').type('111111')//وارد کردن کد کپچا
        cy.get('.login100-form-btn').click()//انجام عملیات لاگین

        cy.url().should('include', 'qhami.com')//چک کردن بازگشت به صفحه اصلی بعد از لاگین 
        cy.contains('درخواست وام').click({ force: true })//رفتن به صفحه درخواست وام
        cy.get('.PrerequisitesLoan-rqu').click({ force: true })//رفتن به صفحه ثبت درخواست وام

        cy.contains('استعلام').click()
    });

})