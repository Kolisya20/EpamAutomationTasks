import BasePage from "../pageobjects/base.page"
import TableComponent from "../pageobjects/components/table.comp";
import TopbarMenuComponent from "../pageobjects/components/topbarMenu.comp"


class ViewEmployeePage extends BasePage {
    get topbarMenuComp() { return TopbarMenuComponent }
    get firstEmployeeData() { return TableComponent.tableRowsText(); }

    async goToAdminUserManagmentUsersPage() { 
        await browser.waitThenClick(this.sidePanelComp.categorySidePanelLink('Admin')); 
    }

    async getFirstEmployeeData() {
        const employeeDataArr = await TableComponent.tableRowsText();
        const emplFirsLastName = `${employeeDataArr[1].split(" ").shift()} ${employeeDataArr[2]}`
        return {
            id: employeeDataArr[0],
            firstLastName: emplFirsLastName
        }
    }
    
    open() {
        return super.open('viewEmployeeList');
    }
}

export default new ViewEmployeePage()