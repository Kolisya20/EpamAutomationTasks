import BasePage from './base.page';

class LoginPage extends BasePage {    
    get inputUsername () { return $("//input[@name='username']"); }
    get inputPassword () { return $("//input[@type='password']");}
    get btnSubmit () { return $("//button[@type='submit']"); }
    
    async defaultPassword() {
        let valuePasswordField = await $("//div[@class='orangehrm-login-error']/div/p[2]").getText();
        let defaultPassword = [];
        defaultPassword = valuePasswordField.split(' ');
        return defaultPassword.pop();
    }

    async defaultUsername() {
        let valueUserNameField = await $("//div[@class='orangehrm-login-error']/div/p[1]").getText();
        let defaultuserName = [];
        defaultuserName = valueUserNameField.split(' ');
        return defaultuserName.pop();
    }
    
    async login (userNameLogin, passwordLogin) {
        await this.inputUsername.setValue(userNameLogin);
        await this.inputPassword.setValue(passwordLogin);
        await this.btnSubmit.click();
        await expect(browser).toHaveUrlContaining('viewEmployeeList');
    }

    open() {
        return super.open("web/index.php/auth/login");
    }
}

export default new LoginPage();
