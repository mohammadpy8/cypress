describe('Load Test Login with Multiple Users', async () => {
    const mresalat_url = 'https://stage1.qhami.com/'
    const users = [
        { username: '09550000012', password: '123456789' },
        { username: '09550000015', password: '123456789' },
        { username: '09550000007', password: '123456789' },
        { username: '09550000008', password: '123456789' },
        { username: '09397645294', password: '123456789' },
        // ... افزودن یوزرهای دیگر
    ];

    users.forEach(user => {
        it(`should login with user: ${user.username}`, () => {
            cy.visit(mresalat_url);//باز کردن وب سایت
            cy.get('#profile > [href="/"]').click()//رفتن به صفحه لاگین 

            cy.url().should('include', '/sso/login')// چک کردن وارد شدن در صفحه لاگین
            cy.get('#username').type(user.username)//وارد کردن نام کاربری
            cy.get('#password').type(user.password)//وارد کردن پسور
            cy.get('#captchaValue').type('111111')//وارد کردن کد کپچا
            cy.get('.login100-form-btn').click()//انجام عملیات لاگین

            cy.url().should('include', 'qhami.com')//چک کردن بازگشت به صفحه اصلی بعد از لاگین 

        });
    });

});

