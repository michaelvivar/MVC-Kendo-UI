wizardsgroup(function (wg) {
    $('#methods').click(function (e) {
        e.preventDefault();
        wg.modal(function (c) { return c
            .title('Methods')
            .width('modal-lg')
            .button('Close'); })
            .open(function (modal) {
            modal.block();
            wg.http.get('AutoComplete/Methods').then(function (data) {
                modal.html(data, function () {
                    modal.unblock();
                    wg('#FirstName').textbox().error(true);
                    wg('#LastName').textbox().readonly(true);
                    wg('#MiddleName').textbox().hide();
                });
            });
        });
    });
    $('#events').click(function (e) {
        e.preventDefault();
        wg.modal(function (c) { return c
            .title('Events')
            .width('modal-lg')
            .button('Close'); })
            .open(function (modal) {
            modal.block();
            wg.http.get('AutoComplete/Events').then(function (data) {
                modal.html(data, function () {
                    modal.unblock();
                    wg('#Address').textbox().bind.change(function (textbox) {
                        alert('value has change to: ' + textbox.value);
                    });
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
            wg.http.get('AutoComplete/Properties').then(function (data) {
                modal.html(data, function () {
                    modal.unblock();
                });
            });
        });
    });
    wg('#Country2').textbox(function (c) { return c.dataSource(wg.url('AutoComplete/Data')).serverFiltering(true).value(''); }, {
        placeholder: 'Country',
        maxLength: 50
    });
});
//# sourceMappingURL=autocomplete.js.map