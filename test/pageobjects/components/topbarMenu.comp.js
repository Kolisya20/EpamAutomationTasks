class TopbarMenuComponent {
    get topbarMenu() { return $('[aria-label="Topbar Menu"]'); }
    get topBarMenuElements() { return $$('//span[@class="oxd-topbar-body-nav-tab-item"]') }
    get topBarSubMenuElements() { return $$('//a[@role="menuitem"]') }
    
    async goToUserManagement_users() {
        await (await this.topbarMenu).isExisting();
        const topBarMenuEls = await this.topBarMenuElements; //get topBarMenu elements
        await browser.waitThenClick(topBarMenuEls[0]); //click to the 1st (UserManagnent)
        const topBarSubMenuEls = await (this.topBarSubMenuElements); //get all sub menu elements
        await browser.waitThenClick(topBarSubMenuEls[0]); //click to the 1st (Users)
    }
}

export default new TopbarMenuComponent();