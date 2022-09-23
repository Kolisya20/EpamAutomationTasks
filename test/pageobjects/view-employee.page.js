import BasePage from "../pageobjects/base.page"
import TableComponent from "../pageobjects/components/table.comp";


class ViewEmployeePage extends BasePage {
    get firstEmployeeData() { return TableComponent.tableRowsText(); }

    async goToAdminUserManagmentUsersPage() { 
        await browser.waitThenClick(this.sidePanelComp.categorySidePanelLink('Admin')); 
        await expect(browser).toHaveUrlContaining('viewSystemUsers');
    }
    
    open() {
        return super.open('viewEmployeeList');
    }
}

export default new ViewEmployeePage()