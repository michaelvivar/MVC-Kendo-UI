wizardsgroup(function (wg) {
    wg('#CountryGrid').grid(function (c) { return c.dataSource('Grid/Data'); });
    wg.bind.grid('CountryGrid').databound(function (grid) {
        grid.table.columns('Status').each(function (column) {
            if (column.text == 'Inactive') {
                column.row.red();
            }
        });
    });
    $('#methods').click(function (e) {
        e.preventDefault();
        wg.modal(function (c) { return c
            .title('Methods')
            .width('modal-lg')
            .button('Close'); })
            .open(function (modal) {
            modal.block();
            wg.http.get('Grid/Methods').then(function (data) {
                modal.html(data, function () {
                    modal.unblock();
                });
            });
        });
    });
    $('#properties').click(function (e) {
        e.preventDefault();
        wg.modal(function (c) { return c
            .title('Properties')
            .width('modal-lg')
            .button('Close'); })
            .open(function (modal) {
            modal.block();
            wg.http.get('Grid/Properties').then(function (data) {
                modal.html(data, function () {
                    modal.unblock();
                });
            });
        });
    });
    $('#subscriptions').click(function (e) {
        e.preventDefault();
        wg.modal(function (c) { return c
            .title('Subscriptions')
            .width('modal-lg')
            .button('Close'); })
            .open(function (modal) {
            modal.block();
            wg.http.get('Grid/Subscriptions').then(function (data) {
                modal.html(data, function () {
                    modal.unblock();
                });
            });
        });
    });
    wg.bind.grid('CountryGrid').refresh(function (grid) {
        console.log(1);
    });
    wg.bind.grid('CountryGrid, RegionGrid').refresh(function (grid) {
        console.log(2);
    });
    wg.bind.grid(['CountryGrid', 'RegionGrid']).refresh(function (grid) {
        console.log(3);
        grid.table.columns('').each(function (columns) {
            columns.row.red();
        });
    });
});
//# sourceMappingURL=grid.js.map