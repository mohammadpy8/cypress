// describe('تست لاگین', () => {


//     const users = [
//         { username: '09397645294', password: '123456789' },
//         { username: '09382730818', password: '123456789' },
//         { username: '09136640288', password: '123456789' },
//         { username: '09337246346', password: '123456789' }
//         // و بقیه یوزرها
//     ];

//     users.map(user => {
//         it('تست لاگین با افراد مختلف و بصورت همزمان ', () => {
//             cy.concurrentLogins(user);
//         })

//         // cy.task('concurrentLogin', users)

//     })
// })

// describe('Concurrent Login Test', () => {
//     it('should perform concurrent logins with different users', () => {

//         const users = [
//             { username: '09397645294', password: '123456789' },
//             { username: '09382730818', password: '123456789' },
//             { username: '09136640288', password: '123456789' },
//             { username: '09337246346', password: '123456789' }
//             // و بقیه یوزرها
//         ];



//         cy.wrap(users).each(user => {
//             it('testtttttttttttttttt', () => {
//                 cy.visit('/');//باز کردن وب سایت
//                 cy.get('#profile > [href="/"]').click()//رفتن به صفحه لاگین
//                 cy.url().should('include', '/sso/login')// چک کردن وارد شدن در صفحه لاگین
//                 cy.get('#username').type(user.username)//وارد کردن نام کاربری
//                 cy.get('#password').type(user.password)//وارد کردن پسور
//                 cy.get('#captchaValue').type('111111')//وارد کردن کد کپچا
//                 cy.get('.login100-form-btn').click()//انجام عملیات لاگین
//             })
//         });
//     });
// });

describe('Concurrent Login Test', () => {
    const mresalat_url = 'https://stage1.qhami.com/'

    it('should perform concurrent logins', () => {

        const users = [
            { username: '09397645294', password: '123456789' },
            { username: '09382730818', password: '123456789' },
            { username: '09136640288', password: '123456789' },
            { username: '09337246346', password: '123456789' }
            // و بقیه یوزرها
        ];
        // const userCount = users.length; // تعداد کاربران

        // const tasks = [];

        // // ایجاد وظایف جداگانه برای هر کاربر
        // for (let i = 1; i <= userCount; i++) {
        //     tasks.push({
        //         username: users[i - 1].username,
        //         password: users[i - 1].password
        //     });
        // }
        // cy.task('hello', { greeting: 'Hello', name: 'World' })
        // cy.task('loginTask', users[0])
        // cy.test('twa', 'aaaaaaaaaaaaaaaaaaaaaa')
        // cy.wrap(users).each(task => {
        //     // cy.task('loginTask', task);
        //     cy.task('loginTask', task)
        // });

        const userCount = 100; // تعداد کاربران

        // cy.task('runLoadTests', userCount).then(users => {
        cy.wrap(users).each(user => {
            console.log('user-->', user)

            cy.visit(mresalat_url);//باز کردن وب سایت
            cy.get('#profile > [href="/"]').click()//رفتن به صفحه لاگین

            cy.url().should('include', '/sso/login')// چک کردن وارد شدن در صفحه لاگین
            cy.get('#username').type(user.username)//وارد کردن نام کاربری
            cy.get('#password').type(user.password)//وارد کردن پسور
            cy.get('#captchaValue').type('111111')//وارد کردن کد کپچا
            cy.get('.login100-form-btn').click()//انجام عملیات لاگین

            cy.pause();

        });
        // });
    });
});



