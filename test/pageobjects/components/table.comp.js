class TableComponent {
    get tableBody() {
        return $('.oxd-table-body')
    }

    async tableRowsText(rowsNamber = 1) {
        ////*[@class="oxd-table-body"]//*[@role="row"]
        // let rows =  await $('//*[@class="oxd-table-body"]//*[@class="oxd-table-row oxd-table-row--with-border"]');
        let rows =  await $('//*[@class="oxd-table-body"]//*[@role="row"]');
        let cells = await rows.$$(".oxd-table-cell");
        let resultArray = [];
        for (let cell of cells) {
            let text = await cell.$("div").getText()
            if(text) {
                resultArray.push(text)
            }            
        }

        return resultArray;
    }

    async tableCells(index) {
        return this.tableRows[index].$$(".oxd-table-cell");
    }

    get firstRowOgEmployee() {
        return this.tableBody.$('.oxd-table-card').$(".oxd-table-row").$$('[@role="cell"]');
    }
}

export default new TableComponent();