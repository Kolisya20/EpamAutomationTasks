class TopbarMenuComponent {
    get topbarMenu() { return $('[aria-label="Topbar Menu"]'); }
    topbarSubMenuLink(subMenuName) {
        return $(`//a[@role="menuitem"][(text()="${subMenuName}")]`);
    }
    topBarMenuLink(menuName) {
        return $(`//nav[@aria-label="Topbar Menu"]/ul/li/span[contains(text(), "${menuName}")]`);
    }


}

export default new TopbarMenuComponent();