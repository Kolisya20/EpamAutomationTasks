import BasePage from "./base.page"

class SystemUsers extends BasePage {
    get userName_input () { return $('//label[@class="oxd-label"][text()="Username"]/../../div/input'); }
    get search_button() { return $('//button[@type="submit"]'); }
    get add_button() {return $('[type="button"][class="oxd-button oxd-button--medium oxd-button--secondary"]'); }
    get reset_button() { return $('[type="button"][class="oxd-button oxd-button--medium oxd-button--ghost"]'); }
    get success_popUp_elem() { return $('.oxd-toast--success')}
    get delete_popUp() { return $('[role="document"]'); }
    get yes_button_OnDeletePopUp() { return $('//div[@role="document"]/*/button[@class="oxd-button oxd-button--medium oxd-button--label-danger orangehrm-button-margin"]'); }
    
    userNameCelInGrid(userName) {return $(`//*[@role = "cell"]/div[contains(text(),"${userName}")]`); }
    deleteButtonUserRow(userName) {return $(`//*[@role = "cell"]/div[contains(text(),"${userName}")]/../../div/div/button/i[@class="oxd-icon bi-trash"]`); }
    
    async findUser(userName) {
        await this.open();
        await browser.enterTextIntoTextField(await this.userName_input, userName);
        await browser.waitThenClick(this.search_button);
    }

    // async checkDisplayedInTheGrid(userName) {
    //     await expect(await this.userNameCelInGrid(userName)).toExist();
    // }

    async deleteUser(userName) {
        await browser.waitThenClick(await this.deleteButtonUserRow(userName));
        await (await this.delete_popUp).waitForDisplayed({ timeout: 10000 })
        await browser.waitThenClick(await this.yes_button_OnDeletePopUp);
        await this.success_popUp_elem.waitForDisplayed({ timeout: 10000 });
    }

    // async checkIsUserDeleted(userName) {
    //     const cellWithUserNameText = await this.userNameCelInGrid(userName);
    //     await cellWithUserNameText.isExisting({
    //         timeout: 5000,
    //         reverse: true
    //     })
    // }
 
    open() {
        return super.open('web/index.php/admin/viewSystemUsers');
    }
}

export default new SystemUsers(); 