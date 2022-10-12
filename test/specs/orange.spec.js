import LoginPage from "../pageobjects/login.page"
import SidePanelComponent from "../pageobjects/components/sidepanel.comp"
import SystemUsers from "../pageobjects/view-system-users.page"
import FakeData from '../utils/fake.data'
import { UserRoleTypes, UserStatusTypes } from "../constants/add.user.props";
import TopbarMenuComponent from "../pageobjects/components/topbarMenu.comp"
import SaveSystemUser from "../pageobjects/save-systems-users.page";
import TableComponent from "../pageobjects/components/table.comp"
import Spinner from "../pageobjects/components/spinner.comp"
import ViewEmployeePage from "../pageobjects/view-employee.page";
import UserData from "../utils/user.data"

describe('Create, delete user', () => {
    before(async() => {
        await browser.maximizeWindow();
        //login
        await LoginPage.open();
        await LoginPage.login(await LoginPage.getDefaultUsername(), await LoginPage.getDefaultPassword());        
        //select first employee from the data table for new userData
        const employeeData = await ViewEmployeePage.getFirstEmployeeData();
        //set fake user data
        UserData.setFakeData(FakeData.userNameFake, FakeData.passwordFake, UserRoleTypes.ESS, UserStatusTypes.ENABLED);
        //set employee data for user
        UserData.setEmployeeData(employeeData.id, employeeData.firstLastName);
    });

    it('should allows to create user', async() => {
        await SidePanelComponent.goToAdminUserManagmentUsersPage();
        await TopbarMenuComponent.goToUserManagement_users();        
        await browser.waitThenClick(SystemUsers.add_button);
        await SaveSystemUser.addNewUserAndSave(UserData);
        expect(SaveSystemUser.success_popUp_elem).toExist;
    });

    it('should allows to search user by username', async() => {
        await SystemUsers.findUser(UserData.name);
        await Spinner.spinner.waitForExist({ timeout: 10000, reverse: true });
        const findUserData = await TableComponent.tableRowsText();
        expect(findUserData).toEqual(SaveSystemUser.createdUserData);
    });

    it('should allows to reset search results', async() => {
        await browser.waitThenClick(SystemUsers.reset_button);
        await Spinner.spinner.waitForExist({ timeout: 10000, reverse: true });
        expect(await SystemUsers.userNameCelInGrid(UserData.name)).toExist();
    });

    it('should allows to delete user', async() => {
        await SystemUsers.deleteUser(UserData.name);  
        expect(SystemUsers.success_popUp_elem).toExist;
    });
});