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
        await LoginPage.login(await LoginPage.defaultUsername(), await LoginPage.defaultPassword());
                
        //set fake user data
        const userData = {
            userName: FakeData.userNameFake,
            password: FakeData.passwordFake,
            userRole: UserRoleTypes.ESS,
            userStatus: UserStatusTypes.ENABLED,

            //set wich employee will be used for create new user
            employeeId: (await ViewEmployeePage.firstEmployeeData)[0],
            employeeFullName: ((await ViewEmployeePage.firstEmployeeData)[1]).split(" ").shift() + " " + (await ViewEmployeePage.firstEmployeeData)[2] 
        }
        
        //go to add user page
        await expect(SidePanelComponent.sidePanelCompoment).toBeDisplayed();
        await browser.waitThenClick(SidePanelComponent.categorySidePanelLinkStrict('Admin'));
        await expect(browser).toHaveUrlContaining('viewSystemUsers');
        await browser.waitThenClick(TopbarMenuComponent.topBarMenuLink('User Management'));
        await browser.waitThenClick(TopbarMenuComponent.topbarSubMenuLink('Users'));
        
        //add new user with fake data
        await browser.waitThenClick(SystemUsers.add_button);
        await expect(browser).toHaveUrlContaining('saveSystemUser');
        await SaveSystemUser.addNewUserAndSave(userData);

        //find added user
        await SystemUsers.findUser(userData.userName);
        browser.waitUntil(() => Spinner.spinner.isDisplayed() == false);

        //check if user is displayed in the grid
        expect(await TableComponent.tableRowsText()).toEqual(SaveSystemUser.createdUserData);

        //reset and check if its appear in the grid
        await browser.waitThenClick(SystemUsers.reset_button);
        await SystemUsers.checkDisplayedInTheGrid(userData.userName);

        //delete user, check if it removed
        await SystemUsers.deleteUser(userData.userName);  
        await SystemUsers.checkIsUserDeleted(userData.userName);
    });
});