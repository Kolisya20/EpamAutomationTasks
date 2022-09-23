import BasePage from "./base.page"

class SystemUsers extends BasePage {
    get input_userName () { return $('//label[@class="oxd-label"][text()="Username"]/../../div/input'); }
    get search_button() { return $('//button[@type="submit"]'); }
    get add_button() {return $('[type="button"][class="oxd-button oxd-button--medium oxd-button--secondary"]')}
    get reset_button() { return $('[type="button"][class="oxd-button oxd-button--medium oxd-button--ghost"]'); }
    get success_delete() { return $('#oxd-toaster_1'); }

    async findUser(userName) {
        await this.open();
        await this.input_userName.setValue(userName);
        await browser.waitThenClick(this.search_button);
    }

    async checkDisplayedInTheGrid(userName, employeeName, status, userRole) {
        await expect(await $(`//*[@role = "cell"]/div[contains(text(),"${userName}")]`)).toExist();
        // await expect(await $(`//*[@role = "cell"]/div[contains(text(),"${userRole}")]`)).toExist();
        // await expect(await $(`//*[@role = "cell"]/div[contains(text(),"${status}")]`)).toExist();
    }

    async deleteUser(userName) {
        await $(`//*[@role = "cell"]/div[contains(text(),"${userName}")]/../../div/div/button/i[@class="oxd-icon bi-trash"]`).click();
        await browser.pause(5000);
        await $('//div[@role="document"]/*/button[@class="oxd-button oxd-button--medium oxd-button--label-danger orangehrm-button-margin"]').click();
        await this.success_delete.waitForDisplayed({ timeout: 10000 });
    }

    async checkIsUserDeleted(userName) {
        browser.waitUntil(() => (`//*[@role = "cell"]/div[contains(text(),"${userName}")]`).isDisplayed() == false)
    }

    open() {
        return super.open('web/index.php/admin/viewSystemUsers');
    }
}

export default new SystemUsers(); 