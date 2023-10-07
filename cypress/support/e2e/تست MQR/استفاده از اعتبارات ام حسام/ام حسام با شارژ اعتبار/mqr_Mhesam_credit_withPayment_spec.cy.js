describe('mqr test', () => {

    const mresalat_url = 'https://stage1.qhami.com/'
    const mhesam_url = 'https://stage1.fardaap.com'


    it('open web site', () => {
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
            const amount_payable = 1
            const mqr_code = 9
            let hasCreditPlus = false
            let token;


            cy.then(() => {
                cy.getAllLocalStorage().then((result) => {
                    token = JSON.parse(result['https://stage1.qhami.com'].mresalatPwa).token.access_token//دریافت توکن 
                })
            }).then(() => {
                cy.wait(500)
                cy.get('a[href="/mqr"]').click({ force: true })//انتخاب mqr
                cy.wait(500)
                cy.get('.confirm_input_mqr').type(mqr_code)//وارد کردن کد mqr
                cy.wait(500)
                cy.get('.confirm_code_mqr').click()//رفتن به صفحه mqr
                cy.wait(350)


                cy.request({
                    method: 'GET',
                    url: `https://stage1api.qhami.com/mhesam/mqr/get-sat-info/${mqr_code}`,
                    headers: {
                        'Content-Type': 'application/json', // تنظیم هدر Content-Type
                        'Authorization': `Bearer ${token}`, // تنظیم هدر توکن با استفاده از Bearer Token
                    }
                }).then((response) => {
                    cy.request({//دریافت لیست اعتبارات 
                        method: 'GET',
                        url: `https://stage1api.qhami.com/mhesam/mqr/mqr-credit?checkCreditRequestModel={"promotedMemberUserId":${response.body.terminalFacilityId},"parcelAmount":${amount_payable}}`,
                        headers: {
                            'Content-Type': 'application/json', // تنظیم هدر Content-Type
                            'Authorization': `Bearer ${token}`, // تنظیم هدر توکن با استفاده از Bearer Token
                        }
                    }).then((response) => {

                        let amountFinal = 0

                        cy.then(() => {
                            response.body.userCreditModels.map(item => {
                                amountFinal += item.availableAmount//جمع مبلغ اعتبارات اقساط پلاس قابل استفاده
                            })
                        }).then(() => {
                            const _handleSelectCredit = () => {
                                cy.wait(350)
                                cy.get('#id-undefined').click()//انتخاب combo box
                                cy.wait(350)
                                cy.get('#id-undefined').then(($el) => {//چک کردن وجود اعتبار ام اقساط پلاس
                                    if ($el.find('#react-select-2-listbox').length > 0) {

                                        cy.get('#react-select-2-listbox > div:nth-child(1) > :nth-child(1)')
                                            .invoke('text')
                                            .then(text => {
                                                if (text.includes('موردی')) {
                                                    hasCreditPlus = false
                                                } else {
                                                    hasCreditPlus = true
                                                    cy.get('#react-select-2-option-0 > div > :nth-child(1)').click({ force: true })//انتخاب اعتبار
                                                }
                                            })
                                    } else {
                                        hasCreditPlus = false
                                    }
                                })

                                cy.get('.input_remain_mqr')//چک کردن مقدار باقی مانده 
                                    .invoke('val')
                                    .then(value => {
                                        if (value == 0) {
                                            return true
                                        } else {//صفر  نشدن مبلغ باقی مانده
                                            if (!hasCreditPlus) {// درصورت عدم وجود اعتبار عملیات متوقف شود
                                                return false
                                            }
                                            return _handleSelectCredit()//انتخاب اعتبار بعدی
                                        }
                                    });
                            }

                            cy.get('.mqrCreditPaymen-amount').type(amountFinal + 10000)//وارد کردن مبلغ قابل پرداخت

                            cy.then(() => {
                                return _handleSelectCredit()
                            })
                                .then((checkCredit) => {
                                    if (checkCredit) {//تایید درخواست
                                        cy.contains('ادامه').click({ force: true })
                                        cy.wait(350)
                                        cy.contains('بله ادامه').click({ force: true })
                                        cy.wait(350)
                                        cy.window().then(win => {
                                            const getUserInfo = JSON.parse(win.localStorage.getItem('userInfo'))
                                            cy.wait(500)
                                            cy.get('.national_box_mqr > .Input_cnfPayment_modal_one').type(getUserInfo.nationalCode)
                                                .invoke('val')
                                                .then(inputValue => {
                                                    if (inputValue.length == 10) {
                                                        cy.contains('دریافت کد تایید').click({ force: true })
                                                    }
                                                });//وارد کردن مبلغ قابل پرداخت

                                        })

                                    } else {// رفتن به در گاه ام حسام جهت افزایش شارژ
                                        cy.get('.confirm_Mqr_btn_active').click({ force: true })
                                        cy.pause()
                                    }
                                })
                        })
                    })
                })
            })
        })
    });
})
