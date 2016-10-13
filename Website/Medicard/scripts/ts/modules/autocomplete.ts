wizardsgroup((wg) => {

    $('#methods').click((e) => {
        e.preventDefault();
        wg.modal(c => c
            .title('Methods')
            .width('modal-lg')
            .button('Close'))
            .open((modal) => {
                modal.block();
                wg.http.get('AutoComplete/Methods').then((data) => {
                    modal.html(data, () => {
                        modal.unblock();
                        wg('#FirstName').textbox().error(true);
                        wg('#LastName').textbox().readonly(true);
                        wg('#MiddleName').textbox().hide();
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
                wg.http.get('AutoComplete/Events').then((data) => {
                    modal.html(data, () => {
                        modal.unblock();
                        wg('#Address').textbox().bind.change((textbox) => {
                            alert('value has change to: ' + textbox.value);
                        });
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
                wg.http.get('AutoComplete/Properties').then((data) => {
                    modal.html(data, () => {
                        modal.unblock();
                    });
                });
            });
    });

    wg('#Country2').textbox(c => c.dataSource(wg.url('AutoComplete/Data')).serverFiltering(true).value(''), {
        placeholder: 'Country',
        maxLength: 50
    });
});