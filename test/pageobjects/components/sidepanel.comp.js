class SidePanelComponent {
    get sidePanelCompoment() { return $('//nav[@class="oxd-navbar-nav"]'); }
    get sidePanelElements() { return $$('.oxd-main-menu-item-wrapper'); }
    
    categorySidePanelLink(linkText) {
        // return $(`//nav[@class="oxd-navbar-nav"]/div[@class="oxd-sidepanel-body"]/ul/li/a[@href="/web/index.php/admin/view${linkText}Module"]`)
        // return this.sidePanelComp.$(`[href="/web/index.php/maintenance/view${linkText}Module"]`)
        this.sidePanelElements.filter(async (elem) => {
            return await elem.$('.oxd-main-menu-item').getAttribute('href').includes(linkText);
        })

    }    

    categorySidePanelLinkStrict(linkText) {
        return $(`//a[@href="/web/index.php/admin/view${linkText}Module"]`)
    } 

    async goToAdminUserManagmentUsersPage() { 
        await browser.waitThenClick(this.categorySidePanelLink('Admin')); 
        await expect(browser).toHaveUrlContaining('viewSystemUsers');
    }

    
}

export default new SidePanelComponent();