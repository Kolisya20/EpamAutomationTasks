class SidePanelComponent {
    get sidePanelCompoment() { return $('//nav[@class="oxd-navbar-nav"]'); } //*
    get sidePanelElements() { return $$('.oxd-main-menu-item-wrapper'); }
    // get admin_SidePanelButton() { return $('//a[@href="/web/index.php/admin/viewAdminModule"]') }
    
    async goToAdminUserManagmentUsersPage() { 
        await (await this.sidePanelCompoment).isExisting();
        const sidePanelEls = await this.sidePanelElements; //get sidePanel Elements
        await browser.waitThenClick(sidePanelEls[0]); //click ti 1st element(Admin)
    }    
}

export default new SidePanelComponent();