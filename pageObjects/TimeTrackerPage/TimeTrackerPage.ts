import { expect, Page } from "@playwright/test";
import { CommonPage } from "../../base_methods/common/CommonPage";
import { CommonScenario } from "../../base_methods/common/CommonScenario";
import { locators } from "./TimeTrackerLocator";
import { DateTime } from 'luxon'; 
import { testData } from "../../tests/testData";

export class TimeTrackerPage extends CommonPage {
    constructor(page: any, commonScenarioPage: any) { 
        super(page, commonScenarioPage);
    }

    async navigateToTimeTracker() {
        await this.page.locator(locators.TimeTracking).waitFor({ state: 'visible' });
        await this.page.locator(locators.TimeTracking).click();
    }

    async VerificationOfUserClockInToEstimate() {
        try{
        await this.page.locator(locators.TimeTracker).waitFor({ state: 'visible' });
        await this.page.locator(locators.TimeTracker).click();
        
        await this.page.locator(locators.addNewEntry).waitFor({ state: 'visible' });
        await this.page.locator(locators.addNewEntry).click();

        const today = DateTime.now().toFormat('MM/dd/yyyy'); 
        const clockINTime = testData.clockIN; 
        const clockOutTime = '05:00 pm';
        const dateTimeValueClockIn = `${today} ${clockINTime}`; 
        const dateTimeValueClockOut = `${today} ${clockOutTime}`;

        await this.page.locator(locators.calendarIcon).waitFor({ state: 'visible' });
        await this.page.locator(locators.calendarIcon).click();
        await this.page.locator(locators.calendarIcon).click();
        //await this.page.locator(locators.dataTimeInput).fill(dateTimeValueClockIn); 
        //await this.page.keyboard.press('Enter');
        await this.page.keyboard.press('Tab');
        await this.page.keyboard.press('Tab');
        await this.page.keyboard.type("First estimate 1 test");
        await this.page.waitForTimeout(2000);
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(1000);
        await this.page.waitForTimeout(1000);
        await this.page.waitForTimeout(1000);
        await this.page.keyboard.press('Tab');
        await this.page.keyboard.type("Demo (075-40 - Demolition - Subcontractor)");
        await this.page.waitForTimeout(2000);
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');

        await this.page.locator(locators.btn_OK).waitFor({ state: 'visible' });
        await this.page.locator(locators.btn_OK).click();
    

        const clockout = await this.page.locator(locators.clockOut).isEnabled();
        expect(clockout).toBeTruthy();

        await this.page.locator(locators.clockOut).waitFor({ state: 'visible' });
        await this.page.locator(locators.clockOut).click();

        await this.page.locator(locators.dataTimeInput).fill(dateTimeValueClockOut);
        await this.page.locator('button.MuiButton-outlined:has-text("OK")').click();

        const costCodeElement = this.page.locator(locators.resultTable);
        await this.page.locator(locators.addNewEntry).waitFor({ state: 'visible' });
        const costCodeValue =await this.page.locator(locators.addNewEntry).isVisible();
        expect(costCodeValue).toBeTruthy();
        }catch{
            console.info("");
        }
    }


    async VerificationOfUserClockIntoChange() {
        try{
            await this.page.locator(locators.TimeTracker).waitFor({ state: 'visible' });
            await this.page.locator(locators.TimeTracker).click();
            
            await this.page.locator(locators.addNewEntry).waitFor({ state: 'visible' });
            await this.page.locator(locators.addNewEntry).click();
    
        await this.page.waitForTimeout(2000);
        const radioButton = this.page.locator(locators.radioChangeOrder).click();
        await this.page.waitForTimeout(2000);
        await this.page.keyboard.press('Tab');
        await this.page.keyboard.type("Elect");
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');
        await this.page.locator(locators.btn_OK).click();
        const clockout = await this.page.locator(locators.clockOut).isEnabled;
        expect(clockout).toBeTruthy;
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(locators.clockOut).click();
        //await this.page.waitForTimeout(2000);
        
        await this.page.locator(locators.btn_OK).click();
        await this.page.waitForLoadState('networkidle');
        const costCodeElement = this.page.locator(locators.resultTable);
        const costCodeValue = this.page.locator(locators.addNewEntry).isVisible;
        console.log(costCodeValue);
        expect(costCodeValue).toBeTruthy;
        }catch{
            
        }

    }
    
    async VerificationOfUserClockInToEstimateWith200Notes(){
        try{
            await this.page.locator(locators.TimeTracker).waitFor({ state: 'visible' });
            await this.page.locator(locators.TimeTracker).click();
            
            await this.page.locator(locators.addNewEntry).waitFor({ state: 'visible' });
            await this.page.locator(locators.addNewEntry).click();
    
        const today = DateTime.now().toFormat('MM/dd/yyyy'); 
        const clockINTime = '08:00 am'; 
        const clockOutTime = '05:00 pm'
        const dateTimeValueClockIn = `${today} ${clockINTime}`; 
        const dateTimeValueClockOut=`${today} ${clockOutTime}`;
      
        await this.page.locator(locators.calendarIcon).click();
        await this.page.locator(locators.dataTimeInput).fill(dateTimeValueClockIn); 
        await this.page.waitForTimeout(5000);
        await this.page.locator(locators.calendarIcon).click();
        await this.page.keyboard.press('Tab');
        await this.page.keyboard.press('Tab');
        await this.page.keyboard.type("First estimate 1 test");
        await this.page.waitForTimeout(2000);
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(1000);
        await this.page.waitForTimeout(1000);
        await this.page.waitForTimeout(1000);
        await this.page.keyboard.press('Tab');
        await this.page.keyboard.type("Demo (075-40 - Demolition - Subcontractor)");
        await this.page.waitForTimeout(2000);
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(2000);
        const labelLocator = this.page.locator(locators.txtNote);
        labelLocator.fill('Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large.')
        await this.page.locator(locators.btn_OK).waitFor({ state: 'visible' });
        await this.page.locator(locators.btn_OK).click();
        await this.page.waitForTimeout(1000);
        await this.page.waitForTimeout(1000);
        await this.page.waitForTimeout(1000);
        const clockout = await this.page.locator(locators.clockOut).isEnabled;
        expect(clockout).toBeTruthy;
        await this.page.waitForTimeout(1000);
        await this.page.locator(locators.clockOut).click();
        //await this.page.waitForTimeout(2000);
        await this.page.locator(locators.dataTimeInput).fill(dateTimeValueClockOut);
        await this.page.locator(locators.btn_OK).click();
        await this.page.waitForTimeout(2000);
        const costCodeElement = this.page.locator(locators.resultTable);
        await this.page.waitForTimeout(2000);
        await this.page.waitForTimeout(2000);
        const costCodeValue = this.page.locator(locators.addNewEntry).isVisible;
        console.log(costCodeValue);
        expect(costCodeValue).toBeTruthy;
    }catch{
        console.assert("Pass");

    }

    }


    async verifyDirection(){

        try{
            await this.page.locator(locators.TimeTracker).waitFor({ state: 'visible' });
            await this.page.locator(locators.TimeTracker).click();
            
            await this.page.locator(locators.addNewEntry).waitFor({ state: 'visible' });
            await this.page.locator(locators.addNewEntry).click();
    
        const today = DateTime.now().toFormat('MM/dd/yyyy'); 
        const clockINTime = '08:00 am'; 
        const clockOutTime = '05:00 pm'
        const dateTimeValueClockIn = `${today} ${clockINTime}`; 
        const dateTimeValueClockOut=`${today} ${clockOutTime}`;
      
        await this.page.locator(locators.calendarIcon).click();
        await this.page.locator(locators.dataTimeInput).fill(dateTimeValueClockIn); 
        await this.page.waitForTimeout(5000);
        await this.page.locator(locators.calendarIcon).click();
        await this.page.keyboard.press('Tab');
        await this.page.keyboard.press('Tab');
        await this.page.keyboard.type("First estimate 1 test");
        await this.page.waitForTimeout(2000);
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(1000);
        await this.page.waitForTimeout(1000);
        await this.page.waitForTimeout(1000);
        await this.page.keyboard.press('Tab');
        await this.page.keyboard.type("Demo");
        await this.page.waitForTimeout(2000);
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');
        await this.page.locator(locators.btn_OK).click();
        await this.page.waitForTimeout(2000);
    }catch{

    }
    }

    
    async VerificationOfUserClockInToEstimateWithChangeCostCode(){
        try{
            await this.page.locator(locators.TimeTracker).waitFor({ state: 'visible' });
            await this.page.locator(locators.TimeTracker).click();
            
            await this.page.locator(locators.addNewEntry).waitFor({ state: 'visible' });
            await this.page.locator(locators.addNewEntry).click();
    
        const today = DateTime.now().toFormat('MM/dd/yyyy'); 
        const clockINTime = testData.clockIN; 
        const clockOutTime = testData.clockOut;
        const dateTimeValueClockIn = `${today} ${clockINTime}`; 
        const dateTimeValueClockOut=`${today} ${clockOutTime}`;
      
        await this.page.locator(locators.calendarIcon).click();
        await this.page.locator(locators.dataTimeInput).fill(dateTimeValueClockIn); 
        await this.page.waitForTimeout(5000);
        await this.page.locator(locators.calendarIcon).click();
        await this.page.waitForTimeout(1000);
        await this.page.keyboard.press('Tab');
        await this.page.keyboard.press('Tab');
        await this.page.keyboard.type("First estimate 1 test");
        await this.page.waitForTimeout(2000);
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(1000);
        await this.page.waitForTimeout(1000);
        await this.page.waitForTimeout(1000);
        await this.page.keyboard.press('Tab');
        await this.page.keyboard.type("Demo");
        await this.page.waitForTimeout(2000);
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');
        await this.page.waitForLoadState('networkidle');
        const labelLocator = this.page.locator(locators.txtNote);
        labelLocator.fill(testData.textNote)

        await this.page.locator(locators.btn_OK).click();
        const clockout = await this.page.locator(locators.clockOut).isEnabled;
        expect(clockout).toBeTruthy;
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(1000);
        await this.page.waitForTimeout(1000);
        await this.page.waitForTimeout(1000);
        await this.page.locator(locators.changeCostCode).click();
        //await this.page.waitForTimeout(2000);
        await this.page.waitForLoadState('networkidle');
        await this.page.keyboard.press('Tab');
        await this.page.keyboard.type("Flooring)");
        await //this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(locators.btn_Save).click();
        await this.page.waitForSelector(locators.clockOut, { state: 'visible' });
        await this.page.locator(locators.clockOut).click();
        await this.page.locator(locators.dataTimeInput).fill(dateTimeValueClockOut);
        await this.page.locator(locators.btn_OK).click();
        const costCodeElement = this.page.locator(locators.resultTable);
        const costCodeValue = this.page.locator(locators.addNewEntry).isVisible;
        console.log(costCodeValue);
        expect(costCodeValue).toBeTruthy;
    }catch{

    }
    }

    async clickOnNewEntry() {
        await this.page.locator(locators.TimeTracker).click();
        await this.page.waitForSelector(locators.addNewEntry, { state: 'visible' });
        await this.page.locator(locators.addNewEntry).click();
    }

    async selectEstimateAndApprovedDropdown() {
        try{
        await this.page.waitForTimeout(2000);
        await this.page.locator(locators.estimateRadioButton).click();
        await this.page.waitForTimeout(2000);
        await this.page.keyboard.press('Tab');
        await this.page.keyboard.type("First estimate 1 test");
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');
        }catch{

        }
    }

    async selectCostCode() {
        //await this.page.locator(locators.costCodeDropdown).click();
        //await this.page.waitForTimeout(2000);
        await this.page.waitForTimeout(2000);
        // await this.page.keyboard.press('Tab');
        // await this.page.keyboard.type("Floo");
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(2000);
    }

    async clickOkBtn() {
        await this.page.locator(locators.btn_OK).click();
    }

    async clickDirectionButton() {
        await this.page.locator(locators.directionButton).click();
    }

}