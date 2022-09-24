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



describe('Create, delete user', () => {
    beforeEach(async() => {
        await browser.maximizeWindow();
    });
    afterEach(async() => {
        await browser.deleteSession();
    });
    it('should login, add new user and delete it', async() => {
        //login
        await LoginPage.open();
        await expect(browser).toHaveUrlContaining('login');
        await LoginPage.login(await LoginPage.getDefaultUsername(), await LoginPage.getDefaultPassword());

        //select first employee from the data table for new userData
        const employeeData = await ViewEmployeePage.getFirstEmployeeData();

        //set fake user data
        const userData = {
            userName: FakeData.userNameFake,
            password: FakeData.passwordFake,
            userRole: UserRoleTypes.ESS,
            userStatus: UserStatusTypes.ENABLED,

            //set employee data for user
            employeeId: employeeData.id,
            employeeFirsLastName: employeeData.firstLastName
        }
        
        //go to add user page
        await SidePanelComponent.goToAdminUserManagmentUsersPage();
        await expect(browser).toHaveUrlContaining('viewSystemUsers');
        await TopbarMenuComponent.goToUserManagement_users();
        
        //add new user with fake data
        await browser.waitThenClick(SystemUsers.add_button);
        await expect(browser).toHaveUrlContaining('saveSystemUser');
        await SaveSystemUser.addNewUserAndSave(userData);

        //find added user
        await SystemUsers.findUser(userData.userName);
        browser.waitUntil(() => Spinner.spinner.isDisplayed() == false);

        //check if user is displayed in the grid
        const findUserData = await TableComponent.tableRowsText();
        expect(findUserData).toEqual(SaveSystemUser.createdUserData);

        //reset and check if its appear in the grid
        await browser.waitThenClick(SystemUsers.reset_button);
        await SystemUsers.checkDisplayedInTheGrid(userData.userName);

        //delete user, check if it removed
        await SystemUsers.deleteUser(userData.userName);  
        await SystemUsers.checkIsUserDeleted(userData.userName);
        // await SystemUsers.checkIsUserDeleted('Jacqueline.White');
    });
});