class TableComponent {
    get tableBody() {
        return $('.oxd-table-body')
    }

    async tableRowsText() {
        return (await Promise.all(
            (await $('//*[@class="oxd-table-body"]//*[@role="row"]').$$(".oxd-table-cell")).map(cell => {
                return cell.$("div").getText()
            })
        )).filter(Boolean)
    }
}

export default new TableComponent();