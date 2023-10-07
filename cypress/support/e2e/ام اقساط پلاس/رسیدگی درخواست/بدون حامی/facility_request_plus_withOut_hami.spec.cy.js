describe('mqr test', () => {

    const mresalat_url = 'https://stage1bp.qhami.com/'
    const delay = 500
    const requestNumber = 4069
    const usersListLoan = [{ userName: '09550000012', nationalCode: '1111111111', code: '111111' }]

    it('M_Aghsat_Plus with charge credit test', () => {
        Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false
        })
        const _handleSearchByID = () => {
            cy.contains('ام اقساط پلاس').click({ force: true })
            cy.wait(delay)
            cy.contains('لیست درخواست های ام اقساط پلاس بدون حامی').click({ force: true })
            cy.wait(delay)
        }

        const filterRequest = () => {
            cy.get('#text-filter-column-id').type(requestNumber)
            cy.wait(delay)
            cy.get('.btn-lg.btn-info').click()
            cy.wait(delay)
            cy.get('.btn-lg.btn-info').click()
            cy.wait(delay)
        }

        const addToList = (user) => {
            cy.contains('اضافه به لیست').click({ force: true })
            cy.get(':nth-child(1) > .my-auto > .form-control').type(user.userName)
            cy.get(':nth-child(2) > .my-auto > .form-control').type(user.nationalCode)
            cy.get(':nth-child(3) > .my-auto > .form-control').type(user.code)
            cy.get('.btn-blue').click({ force: true })
        }

        cy.visit(mresalat_url);//باز کردن وب سایت
        cy.wait(delay)
        cy.url().should('include', '/sso/login')// چک کردن وارد شدن در صفحه لاگین
        cy.wait(delay)
        cy.get('#username').type('09550000012')//وارد کردن نام کاربری
        cy.wait(delay)
        cy.get('#password').type('123456789')//وارد کردن پسورد
        cy.wait(delay)
        cy.get('#captchaValue').type('111111')//وارد کردن کد کپچا
        cy.wait(delay)
        cy.get('.login100-form-btn').click()//انجام عملیات لاگین
        cy.wait(delay)
        cy.url().should('include', 'bp#')//چک کردن بازگشت به صفحه اصلی بعد از لاگین
        cy.wait(delay)
        cy.contains('لیست درخواست های اقساطی').click({ force: true })
        cy.wait(delay)
        _handleSearchByID()
        filterRequest()
        cy.get(`a[href="/bp#/facility/back-panel/admin/view/${requestNumber}?platform=facility-hesan&checkOn=with-out-hami"]`).click()//در انتظار بررسی
        cy.wait(delay)
        cy.get('.btn-info').contains('تایید').click({ force: true })
        cy.wait(delay)
        filterRequest()
        cy.get('.fa-user-circle').click({ force: true })
        cy.wait(delay)
        cy.get('.btn-info').contains('تایید').click({ force: true })
        cy.wait(delay)
        filterRequest()
        cy.get('.fa-check-circle').click({ force: true })
        cy.wait(delay)
        cy.get('.btn-info').contains('تایید').click({ force: true })
        cy.wait(delay)
        filterRequest()
        cy.get('.fa-check-square').click({ force: true })
        cy.wait(delay)
        usersListLoan.map(user => addToList(user))//اضافه به لیست
        cy.get('.btn-info').contains('تایید').click({ force: true })//باز کردن مودال افزودن به لیست
        cy.wait(delay)
        cy.wait(delay)
        filterRequest()
        cy.get('.fa-check').click({ force: true })//در انتظار واریز تسهیلات
        cy.wait(delay)
        cy.get('.my-auto > .form-control').type('1212121212121')//شماره سند
        cy.wait(delay)
        cy.get('[data-testid="datepicker-input"]').click({ force: true })
        cy.wait(delay)
        cy.get('[data-testid="days-section-wrapper"] > .-shown > :nth-child(2) > :nth-child(2) ').click()// انتخاب تاریخ
        cy.wait(delay)
        cy.get(':nth-child(1) > .form-control').type('1212121212121')// مبلغ واریزی
        cy.wait(delay)
        cy.get('.btn-info').contains('تایید').click({ force: true })
        cy.wait(delay)
    });
})
