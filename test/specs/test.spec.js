describe('', () => {
    it('check if element exist', async() => {
        await browser.maximizeWindow();
        await browser.url('https://webdriver.io/docs/api/element/waitForExist/')
        // const cat = await $("[role] [role='none']:nth-child(6) [role]");
        const cat = await $(".header-github-link");
        // await cat.waitForExist({ timeout: 5000 });
        await cat.waitForExist({ 
            reverse: true,
            timeout: 5000
        });

        //"[role] [role='none']:nth-child(6) [role]"
    });
});