import BasePage from './base.page';

class LoginPage extends BasePage {    
    get inputUsername () { return $("//input[@name='username']");}
    get inputPassword () { return $("//input[@type='password']");}
    get valueLogindFieldLocator () {return $("//div[@class='orangehrm-login-error']/div/p[1]")};
    get valuePasswordFieldLocator () { return $("//div[@class='orangehrm-login-error']/div/p[2]")};
    get btnSubmit () { return $("//button[@type='submit']"); }
    
    async getDefaultPassword() {
        const valuePasswordField = await this.valuePasswordFieldLocator.getText();
        return valuePasswordField.split(' ').pop(); //generate list and return the last
    }

    async getDefaultUsername() {
        const valueUserNameField = await this.valueLogindFieldLocator.getText();
        return valueUserNameField.split(' ').pop(); //generate list and return the last
    }
    
    async login (userNameLogin, passwordLogin) {
        await this.inputUsername.setValue(userNameLogin);
        await this.inputPassword.setValue(passwordLogin);
        await this.btnSubmit.click();
    }

    open() {
        return super.open("web/index.php/auth/login");
    }
}

export default new LoginPage();
