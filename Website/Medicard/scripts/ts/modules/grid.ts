wizardsgroup((wg) => {
    wg('#CountryGrid').grid(c => c.dataSource('Grid/Data'));

    wg.bind.grid('CountryGrid').databound((grid) => {
        grid.table.columns('Status').each((column) => {
            if (column.text == 'Inactive') {
                column.row.red();
            }
        });
    });

    $('#methods').click((e) => {
        e.preventDefault();
        wg.modal(c => c
            .title('Methods')
            .width('modal-lg')
            .button('Close'))
            .open((modal) => {
                modal.block();
                wg.http.get('Grid/Methods').then((data) => {
                    modal.html(data, () => {
                        modal.unblock();
                    });
                });
            });
    });

    $('#properties').click((e) => {
        e.preventDefault();
        wg.modal(c => c
            .title('Properties')
            .width('modal-lg')
            .button('Close'))
            .open((modal) => {
                modal.block();
                wg.http.get('Grid/Properties').then((data) => {
                    modal.html(data, () => {
                        modal.unblock();
                    });
                });
            });
    });

    $('#subscriptions').click((e) => {
        e.preventDefault();
        wg.modal(c => c
            .title('Subscriptions')
            .width('modal-lg')
            .button('Close'))
            .open((modal) => {
                modal.block();
                wg.http.get('Grid/Subscriptions').then((data) => {
                    modal.html(data, () => {
                        modal.unblock();
                    });
                });
            });
    });

    wg.bind.grid('CountryGrid').refresh((grid) => {
        console.log(1);
    });
    wg.bind.grid('CountryGrid, RegionGrid').refresh((grid) => {
        console.log(2);
    });
    wg.bind.grid(['CountryGrid', 'RegionGrid']).refresh((grid) => {
        console.log(3);
        grid.table.columns('').each((columns) => {
            columns.row.red();
        });
    });

});
