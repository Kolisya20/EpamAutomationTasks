import BasePage from "./base.page";

class SaveSystemUser extends BasePage {
    get selectUserRole_selector() { return $('//label[text()="User Role"]/../..//div[text()="-- Select --"]'); } //*
    get selectStatus_selector() { return $('//label[text()="Status"]/../..//div[text()="-- Select --"]'); }
    get inputListBoxAutocomplete () { return $('//input[@placeholder="Type for hints..."]'); }
    get save_button() { return $('//button[@type="submit"]'); }
    get inputUserName () { return $("(//form[@class='oxd-form']/div/div/div/div/div/input)[1]") }
    get verificationUserNameField () {return $ ("//form[@class='oxd-form']/div/div/div/div/div/input/../../span") }
    get inputPassword () { return $("(//form[@class='oxd-form']/div/div/div/div/div/input)[2]") }
    get inputConfirmPassword () { return $("(//form[@class='oxd-form']/div/div/div/div/div/input)[3]") }
    get success_popUp_elem() { return $('.oxd-toast--success')}
    get inputListBoxAutocompleteValue () { return $$('//div[@class="oxd-autocomplete-wrapper"]//div[@role="option"]'); }
    get employeeNameSearchIndicator() { return $('//div[@class="oxd-autocomplete-option"][text()="Searching...."]') }
    get employeeNameDropdownSearchIndicator() { return $('//div[@class="oxd-autocomplete-dropdown --positon-bottom"]') }
    get usernameErrorMessage() { return $('.oxd-input-field-error-message') }

    selectRole_fromListRole_Status(role_status) { 
        return $(`//div[@class="oxd-select-wrapper"]/div[@role="listbox"]/div[@role="option"]/span[text()="${role_status}"]`)
    }

    createdUserData = []
    
    async addNewUserAndSave(user) {
        await browser.waitThenClick(this.selectUserRole_selector);
        await browser.waitThenClick(this.selectRole_fromListRole_Status(user.role));
        await browser.waitThenClick(this.selectStatus_selector);
        await browser.waitThenClick(this.selectRole_fromListRole_Status(user.status));
        
        await browser.enterTextIntoTextField(this.inputListBoxAutocomplete, user.id);
        await this.employeeNameDropdownSearchIndicator.waitForExist({ timeout: 10000 });
        await this.employeeNameSearchIndicator.waitForExist({ timeout: 10000, reverse: true });
        await browser.waitThenClick(this.inputListBoxAutocompleteValue[0]);
        await browser.enterTextIntoTextField(this.inputUserName, user.name);
        await browser.enterTextIntoTextField(this.inputPassword, user.password);
        await browser.enterTextIntoTextField(this.inputConfirmPassword, user.password);
        await this.usernameErrorMessage.waitForExist({ timeout: 10000, reverse: true });
        await browser.waitThenClick(this.save_button);
        this.createdUserData.push(user.name, user.role, user.firsLastName, user.status)
        await this.success_popUp_elem.waitForDisplayed({ timeout: 10000 });
        //collect user data that was created
    }

    open() {
        return super.open('web/index.php/admin/saveSystemUser');
    }
}

export default new SaveSystemUser();