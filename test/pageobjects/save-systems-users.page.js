import BasePage from "./base.page";

class SaveSystemUser extends BasePage {
    get selectUserRole_selector() { return $('//label[text()="User Role"]/../..//div[text()="-- Select --"]'); }
    get selectStatus_selector() { return $('//label[text()="Status"]/../..//div[text()="-- Select --"]'); }
    get inputListBoxAutocomplete () { return $('//input[@placeholder="Type for hints..."]'); }
    get save_button() { return $('//button[@type="submit"]'); }
    get inputUserName_Pass_ConfPass () { return $$("//form[@class='oxd-form']/div/div/div/div/div/input"); }
    get success_save() { return $('#oxd-toaster_1'); }
    get inputListBoxAutocompleteValue () { return $$('//div[@class="oxd-autocomplete-wrapper"]//div[@role="option"]'); }

    selectRole_fromListRole_Status(role_status) { 
        return $(`//div[@class="oxd-select-wrapper"]/div[@role="listbox"]/div[@role="option"]/span[text()="${role_status}"]`)
    }

    createdUserData = []
    
    async addNewUserAndSave(user) {
        console.log(user.userName);
        console.log(user.password);
        console.log(user.userRole);
        console.log(user.userStatus);
        console.log(user.employeeId);
        console.log(user.employeeFullName);

        await browser.waitThenClick(this.selectUserRole_selector);
        await browser.waitThenClick(this.selectRole_fromListRole_Status(user.userRole));
        await browser.waitThenClick(this.selectStatus_selector);
        await browser.waitThenClick(this.selectRole_fromListRole_Status(user.userStatus));
        await browser.enterTextIntoTextField(this.inputListBoxAutocomplete, user.employeeId);
        await browser.pause(5000);
        await browser.waitThenClick(this.inputListBoxAutocompleteValue[0]);
        await browser.enterTextIntoTextField(this.inputUserName_Pass_ConfPass[0], user.userName);
        await browser.enterTextIntoTextField(this.inputUserName_Pass_ConfPass[1], user.password);
        await browser.enterTextIntoTextField(this.inputUserName_Pass_ConfPass[2], user.password);
        await browser.pause(2000);
        await browser.waitThenClick(this.save_button);
        await this.success_save.waitForDisplayed({ timeout: 10000 });
        await expect(browser).toHaveUrlContaining('viewSystemUsers');

        this.createdUserData.push(user.userName, user.userRole, user.employeeFullName, user.userStatus)
    }

    open() {
        return super.open('web/index.php/admin/saveSystemUser');
    }
}

export default new SaveSystemUser();