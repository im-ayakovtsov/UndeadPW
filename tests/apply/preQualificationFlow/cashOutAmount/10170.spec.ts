import {cardData, flowData, urlData} from 'data/apply'
import {expect, test} from 'fixtures'
import ENV from 'data/envs/env'

test.describe('Apply', () => {
  test(`@P1 @apply @refinance 10170_CashOutAmount_Navigation[RefinanceCashOut]`,
    async ({steps, page}) => {
      await steps.typeOfLoan.openApply(ENV.APPLY_URL)
      await steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.REFINANCE)
      await steps.propertyType.selectPropertyType(cardData.propertyType.TOWNHOUSE)
      await steps.propertyUsageDetails.selectPropertyUsageDetails(cardData.propertyUsageDetails.PRIMARY_RESIDENCE)
      await steps.propertyAddress.enterAddress(flowData.street)
      await steps.propertyValue.enterPropertyValue(flowData.propertyValue)
      await steps.currentMortgageBalance.enterCurrentMortgageBalance(flowData.currentMortgageBalance)
      await steps.purposeOfRefinance.selectPurposeOfRefinance(cardData.purposeOfRefinance.TAKE_CASH_OUT_OF_YOUR_HOME)

      await test.step(`STEP 1 - Verify that user can return to the previous step by clicking "Go Back" button`, 
        async () => {
          await steps.cashOutAmount.footer.goBackButton.click()
          await expect(page).toHaveURL(urlData.purposeOfRefinance)
          await steps.purposeOfRefinance.
            selectPurposeOfRefinance(cardData.purposeOfRefinance.TAKE_CASH_OUT_OF_YOUR_HOME)
        })

      await test.step(`STEP 2 - Enter unique valid data only into required fields:- Street Address`, async () => {
        await steps.cashOutAmount.enterAmount(flowData.cashOutAmount)
        await expect(page).toHaveURL(urlData.currentCreditProfile)
      })
    })
})
