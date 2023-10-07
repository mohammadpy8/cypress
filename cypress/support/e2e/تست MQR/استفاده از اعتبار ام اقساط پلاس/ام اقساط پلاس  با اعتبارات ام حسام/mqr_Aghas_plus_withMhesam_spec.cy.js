describe('mqr test', () => {

    const mresalat_url = 'https://stage1.qhami.com/'
    const mhesam_url = 'https://stage1.fardaap.com'

    it('M_Aghsat_Plus with charge credit test', () => {
        cy.visit(mresalat_url);//باز کردن وب سایت
        cy.wait(350)
        cy.get('#profile > [href="/"]').click()//رفتن به صفحه لاگین 
        cy.wait(350)
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
        cy.contains('ام حسام').click({ force: true })//ورود به مسترپیج ام حسام
        cy.wait(350)
        cy.contains('ورود به ام حسام').click({ force: true })//ورود به وب سایت ام حسام
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
                cy.wait(350)
                cy.get('a[href="/mqr"]').click({ force: true })//انتخاب mqr
                cy.wait(350)
                cy.get('.btn_mqr_scanner').click({ force: true })
                cy.wait(350)
                cy.get('.confirm_input_mqr').type(mqr_code)//وارد کردن کد mqr
                cy.wait(350)
                cy.get('.confirm_code_mqr').click()//رفتن به صفحه mqr
                cy.wait(350)

                // دریافت ترمینال عرضه کننده terminalFacilityId
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
                            response.body.creditFacilityHesanResponseModels.map(item => {
                                if (item.facilityModel) {//درصورت true بودن اعتبار قابل استفاده میباشد.
                                    item.creditFacilityHesanListModelList.map(creditFacility => {
                                        amountFinal += creditFacility.availableAmount//جمع مبلغ اعتبارات اقساط پلاس قابل استفاده
                                    })
                                }
                            })
                        }).then(() => {

                            const _handleSelectCredit = () => {
                                cy.wait(350)
                                cy.get('.aghsat-plus').click()//انتخاب combo box
                                cy.wait(350)

                                cy.get('.aghsat-plus').then(($el) => {//چک کردن وجود اعتبار ام اقساط پلاس
                                    if ($el.find('#react-select-3-listbox').length > 0) {
                                        hasCreditPlus = true
                                        cy.get('#react-select-3-option-0 > div > :nth-child(1)').click({ force: true })//انتخاب اعتبار
                                    } else {
                                        hasCreditPlus = false
                                    }
                                })

                                cy.get('.div5-in-card-peyment-aghsat > div:nth-child(2)')//چک کردن مقدار باقی مانده 
                                    .invoke('text')
                                    .then(valueStr => {
                                        const value = valueStr.replace('تومان', '').split(',').join('')
                                        if (value == 0) {
                                            return true// صفر شدن اعتبار باقی مانده
                                        } else {//صفر  نشدن مبلغ باقی مانده
                                            if (!hasCreditPlus) {// درصورت عدم وجود اعتبار عملیات متوقف شود
                                                return false
                                            }
                                            return _handleSelectCredit()//انتخاب اعتبار بعدی
                                        }
                                    });
                            }

                            const amountMorThan = +amountFinal + 10000//محاسبه مبلغ بصورتیکه اعتبار ام اقساط پلاس شرط حداقل 50 را داراست اما کمتر از مبلغ ورودی باشد

                            cy.wait(350)
                            cy.get('.mqrCreditPaymen-amount').type(amountMorThan)//وارد کردن مبلغ قابل پرداخت
                            cy.wait(350)
                            cy.get("input[label='ام اقساط پلاس']").click({ force: true })//انتخاب رادیو ام اقساط پلاس

                            cy.then(() => {
                                return _handleSelectCredit()//انتخاب اعتبارات
                            }).then((checkCredit) => {
                                if (checkCredit) {//تایید درخواست
                                } else {
                                    cy.get('.confirm_Mqr_btn_active').click({ force: true })
                                    cy.wait(200)

                                    const _handleSelectCreditMhesam = () => {
                                        cy.wait(200)
                                        cy.get('.css-1lim7pw-control').click()//انتخاب combo box
                                        cy.get('#react-select-4-option-0 > .d-flex > :nth-child(1)').click()//انتخاب اعتبار
                                        cy.wait(200)

                                        cy.contains('مبلغ باقی مانده جهت شارژ اعتبار ام حسام').siblings()//چک کردن مقدار باقی مانده 
                                            .invoke('text')
                                            .then(valueStr => {
                                                const value = valueStr.replace('تومان', '').split(',').join('').trim()
                                                if (value == 0) {
                                                    return true
                                                } else {

                                                    cy.get('span[aria-live="polite"]').siblings().then($el => {
                                                        if ($el.find('.css-1lim7pw-control').length > 0) {
                                                            cy.get('.css-1lim7pw-control').click().wait(200).then($el => {
                                                                if ($el.find('#react-select-4-option-0').length > 0) {
                                                                    cy.get('#react-select-4-option-0 > .d-flex > :nth-child(1)')
                                                                        .invoke('text')
                                                                        .then(value => {
                                                                            if (value.includes("No options")) {
                                                                                return false
                                                                            } else {
                                                                                return _handleSelectCreditMhesam()
                                                                            }
                                                                        })
                                                                } else {
                                                                    return false
                                                                }
                                                            })
                                                        } else {
                                                            return false
                                                        }
                                                    })
                                                }
                                            });
                                    }

                                    cy.then(() => {
                                        return _handleSelectCreditMhesam()//انتخاب اعتبارات
                                    }).then((checkCredit) => {
                                        if (checkCredit) {//تایید درخواست

                                            cy.contains('تایید و پرداخت').click({ force: true })
                                            cy.wait(100)
                                            cy.contains('موافقت و پرداخت').click({ force: true })

                                            cy.window().then(win => {
                                                const getUserInfo = JSON.parse(win.localStorage.getItem('userInfo'))//دریافت اطلاعات شخص لاگین شده 
                                                cy.wait(500)
                                                cy.get('.Input_cnfPayment_modal_one').type(getUserInfo.nationalCode)//وارد کردن کدملی
                                                    .invoke('val')
                                                    .then(inputValue => {
                                                        if (inputValue.length == 10) {
                                                            cy.contains('دریافت کد تایید').click({ force: true })
                                                        }
                                                    });
                                            })
                                        } else {// رفتن به در گاه ام حسام جهت افزایش شارژ
                                            cy.get('button[class="w-100 text-white py-2 border-0"]').click({ force: true })
                                            cy.pause()
                                        }
                                    })
                                }
                            })
                        })
                    })
                })
            })
        })
    });
})
