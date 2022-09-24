import BasePage from "./base.page";

class SaveSystemUser extends BasePage {
    get selectUserRole_selector() { return $('//label[text()="User Role"]/../..//div[text()="-- Select --"]'); } //*
    get selectStatus_selector() { return $('//label[text()="Status"]/../..//div[text()="-- Select --"]'); }
    get inputListBoxAutocomplete () { return $('//input[@placeholder="Type for hints..."]'); }
    get save_button() { return $('//button[@type="submit"]'); }
    get inputUserName () { return $("(//form[@class='oxd-form']/div/div/div/div/div/input)[1]") }
    get inputPassword () { return $("(//form[@class='oxd-form']/div/div/div/div/div/input)[2]") }
    get inputConfirmPassword () { return $("(//form[@class='oxd-form']/div/div/div/div/div/input)[3]") }
    get successSave_popUp() { return $('#oxd-toaster_1'); }
    get inputListBoxAutocompleteValue () { return $$('//div[@class="oxd-autocomplete-wrapper"]//div[@role="option"]'); }

    selectRole_fromListRole_Status(role_status) { 
        return $(`//div[@class="oxd-select-wrapper"]/div[@role="listbox"]/div[@role="option"]/span[text()="${role_status}"]`)
    }

    createdUserData = []
    
    async addNewUserAndSave(user) {
        await browser.waitThenClick(this.selectUserRole_selector);
        await browser.waitThenClick(this.selectRole_fromListRole_Status(user.userRole));
        await browser.waitThenClick(this.selectStatus_selector);
        await browser.waitThenClick(this.selectRole_fromListRole_Status(user.userStatus));
        await browser.enterTextIntoTextField(this.inputListBoxAutocomplete, user.employeeId);
        await browser.pause(5000);
        await browser.waitThenClick(this.inputListBoxAutocompleteValue[0]);
        await browser.enterTextIntoTextField(this.inputUserName, user.userName);
        await browser.enterTextIntoTextField(this.inputPassword, user.password);
        await browser.enterTextIntoTextField(this.inputConfirmPassword, user.password);
        await browser.pause(2000);
        await browser.waitThenClick(this.save_button);
        await this.successSave_popUp.waitForDisplayed({ timeout: 10000 });
        await expect(browser).toHaveUrlContaining('viewSystemUsers');
        //collect user data that was created
        this.createdUserData.push(user.userName, user.userRole, user.employeeFirsLastName, user.userStatus)
    }

    open() {
        return super.open('web/index.php/admin/saveSystemUser');
    }
}

export default new SaveSystemUser();