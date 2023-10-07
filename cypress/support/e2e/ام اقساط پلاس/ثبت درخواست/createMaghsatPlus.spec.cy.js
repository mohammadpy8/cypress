describe('ثبت درخواست ام اقساط پلاس', () => {
    const mresalat_url = 'https://stage1.qhami.com/'
    const mhesam_url = 'https://stage1.fardaap.com'

    it('open web site', () => {
        let m_aghsat_url = 'https://stage1maghsat.qhami.com/';
        cy.visit(mresalat_url);//باز کردن وب سایت
        cy.wait(350)
        cy.get('#profile > [href="/"]').click()//رفتن به صفحه لاگین 

        cy.url().should('include', '/sso/login')// چک کردن وارد شدن در صفحه لاگین
        cy.wait(350)
        cy.get('#username').type('09550000012')//وارد کردن نام کاربری
        cy.wait(350)
        cy.get('#password').type('123456789')//وارد کردن پسور
        cy.wait(350)
        cy.get('#captchaValue').type('111111')//وارد کردن کد کپچا
        cy.wait(350)
        cy.get('.login100-form-btn').click()//انجام عملیات لاگین
        cy.wait(350)
        cy.url().should('include', 'qhami.com')//چک کردن بازگشت به صفحه اصلی بعد از لاگین
        cy.wait(350)
        cy.get('.cardtwo > :nth-child(1) > [style="display: flex; text-align: center;"] > [style="display: flex; width: 100%; padding: 2% 1%; border-radius: 10px; align-items: center; justify-content: center; margin: auto; flex-direction: column;"] > :nth-child(1) > .nav-link > .sc-gtcAbF').click({ force: true })
        cy.wait(350)
        cy.contains('ورود به ام حسام').click({ force: true })
        cy.wait(350)
        cy.origin(mhesam_url, () => {
            let checkDisabledATTR;

            cy.get('a[href="/MAghsatHesan"]').click({ force: true })//ورود به ام اقساط پلاس
            cy.pause();//متوقف کردن تست جهت انتخاب گزینه ها و ادامه دادن فرایند
            console.log('یک گزینه را انتخاب نمایید!!!!!!!!!!!!!!!!');
            cy.wait(350)
            cy.get('.btn-apply-mhesam-credit')
                .should(($btn) => {
                    if ($btn.hasClass('disabled')) {
                        // اگر اتریبیوت disabled وجود داشته باشد
                        checkDisabledATTR = true
                    } else {
                        // اگر اتریبیوت disabled وجود نداشته باشد
                        checkDisabledATTR = false
                    }
                })
                .then(() => {
                    let amount = 5000000;
                    let location_href_id;
                    let token;

                    cy.then(() => {
                        cy.getAllLocalStorage().then((result) => {
                            token = JSON.parse(result['https://stage1.qhami.com'].mresalatPwa).token.access_token
                        })
                    })
                        .then(() => {
                            cy.url().then(url => {
                                location_href_id = url.split("=")[1]
                            });
                        })
                        .then(() => {
                            if (checkDisabledATTR) {
                                alert('ثبت درخواست ام اقساط پلاس برای شما غیرفعال میباشد')
                            } else {
                                cy.get('.btn-apply-mhesam-credit').click({ force: true })//ثبت درخواست ام اقساط پلاس

                                cy.get('.amount-money-container').type(amount) // وارد کردن مبلغ ام اقساط پلاس

                                cy.get('.btn-primary-hesan').click({ force: true })

                            }
                        })
                })
        }).then(() => {
            cy.wait(500)
            cy.visit(m_aghsat_url);// باز کردن درگاه ام اقساط

            cy.get('.confirm-btn').click({ force: true })//تایید درخواست و باز کردن مودال قوانین و مقررات
            cy.wait(350)
            cy.get('.form-check-input').click({ force: true })// تیک قوانین و مقررات
            cy.get('.confirmBtn').click({ force: true })//پذیرفتن قوانین و مقررات

            cy.getAllLocalStorage().then((result) => {//دریافت کد ملی شخص لاگین شده از لوکال
                return JSON.parse(result['https://stage1.qhami.com'].userInfo)
            })
                .then((getUserInfo) => {

                    cy.get('.removeArrowInput').type(getUserInfo.nationalCode)//وارد کردن کد ملی
                        .invoke('val')//دریافت کدملی وارد شده
                        .then(inputValue => {//بررسی کدملی وارد شده
                            if (inputValue.length == 10) {
                                cy.contains('دریافت کد تایید').click({ force: true })//دریافت کد دو عاملی
                            }
                        });
                })
        })

    })
})