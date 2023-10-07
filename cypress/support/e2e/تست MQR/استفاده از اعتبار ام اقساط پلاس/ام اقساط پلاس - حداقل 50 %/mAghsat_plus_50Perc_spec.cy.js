
describe('mqr test', () => {

    const mresalat_url = 'https://stage1.qhami.com/'
    const mhesam_url = 'https://stage1.fardaap.com'

    it('M_Aghsat_Plus 50 percentage minimun test', () => {
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
        cy.wait(500)
        cy.url().should('include', 'qhami.com')//چک کردن بازگشت به صفحه اصلی بعد از لاگین
        cy.wait(500)
        cy.get('.cardtwo > :nth-child(1) > [style="display: flex; text-align: center;"] > [style="display: flex; width: 100%; padding: 2% 1%; border-radius: 10px; align-items: center; justify-content: center; margin: auto; flex-direction: column;"] > :nth-child(1) > .nav-link > .sc-gtcAbF').click({ force: true })
        cy.wait(500)
        cy.contains('ام حسام').click({ force: true })
        cy.wait(500)
        cy.contains('ورود به ام حسام').click({ force: true })
        cy.wait(500)
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
                cy.get('.btn_mqr_scanner').click({ force: true })
                cy.wait(500)
                cy.get('.confirm_input_mqr').type(mqr_code)//وارد کردن کد mqr
                cy.wait(500)
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
                            const amountMorThan = (amountFinal * 2) + 50//محاسبه مبلغ بصورتیکه اعتبار ام اقساط پلاس کمتر از 50% از مبلغ وارد شده باشد
                            cy.wait(350)
                            cy.get('.mqrCreditPaymen-amount').type(amountMorThan)//وارد کردن مبلغ قابل پرداخت
                            cy.wait(350)
                            cy.get("input[label='ام اقساط پلاس']").click({ force: true })//انتخاب رادیو ام اقساط پلاس
                            cy.wait(3000)

                        })
                    })
                })
            })
        })
    });
})
