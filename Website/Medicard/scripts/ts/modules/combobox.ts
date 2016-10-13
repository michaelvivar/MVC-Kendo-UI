wizardsgroup((wg) => {
    wg('#Country').combobox(c => c.dataSource('ComboBox/Country'))
        .bind.change((combobox) => {
            console.log(combobox.value);
        });

    $('#methods').click((e) => {
        e.preventDefault();
        wg.modal(c => c
            .title('Methods')
            .width('modal-lg')
            .button('Close'))
            .open((modal) => {
                modal.block();
                wg.http.get('ComboBox/Methods').then((data) => {
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
                wg.http.get('ComboBox/Properties').then((data) => {
                    modal.html(data, () => {
                        modal.unblock();
                    });
                });
            });
    });

    $('#events').click((e) => {
        e.preventDefault();
        wg.modal(c => c
            .title('Events')
            .width('modal-lg')
            .button('Close'))
            .open((modal) => {
                modal.block();
                wg.http.get('ComboBox/Events').then((data) => {
                    modal.html(data, () => {
                        modal.unblock();
                    });
                });
            });
    });
});