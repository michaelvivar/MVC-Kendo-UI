wizardsgroup(function (wg) {
    wg('#Mobile').maskedtextbox(function (c) { return c.mask('0000-0000000'); });
    $('#methods').click(function (e) {
        e.preventDefault();
        wg.modal(function (c) { return c
            .title('Methods')
            .width('modal-lg')
            .button('Close'); })
            .open(function (modal) {
            modal.block();
            wg.http.get('MaskedTextBox/Methods').then(function (data) {
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
            wg.http.get('MaskedTextBox/Properties').then(function (data) {
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
            wg.http.get('MaskedTextBox/Events').then(function (data) {
                modal.html(data, function () {
                    modal.unblock();
                });
            });
        });
    });
});
//# sourceMappingURL=maskedtextbox.js.map