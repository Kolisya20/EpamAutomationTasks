module.exports = {
    waitThenClick: async function (element) {
        await element.waitForExist();
        await element.waitForDisplayed();
        await element.click()
    },

    enterTextIntoTextField: async function(textField, textData) {
        await textField.waitForExist();
        await textField.setValue(textData)
    }
}
