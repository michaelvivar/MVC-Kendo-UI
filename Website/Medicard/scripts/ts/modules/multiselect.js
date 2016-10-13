wizardsgroup(function (wg) {
    wg('#Color').multiselect(function (c) { return c.dataSource('MultiSelect/Color'); });
    $('#methods').click(function (e) {
        e.preventDefault();
        wg.modal(function (c) { return c
            .title('Methods')
            .width('modal-lg')
            .button('Close'); })
            .open(function (modal) {
            modal.block();
            wg.http.get('MultiSelect/Methods').then(function (data) {
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
            wg.http.get('MultiSelect/Properties').then(function (data) {
                modal.html(data, function () {
                    modal.unblock();
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
            wg.http.get('MultiSelect/Events').then(function (data) {
                modal.html(data, function () {
                    modal.unblock();
                });
            });
        });
    });
});
//# sourceMappingURL=multiselect.js.map