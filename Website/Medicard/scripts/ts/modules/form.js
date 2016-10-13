wizardsgroup(function (wg) {
    $('#methods').click(function (e) {
        e.preventDefault();
        wg.modal(function (c) { return c
            .title('Methods')
            .width('modal-lg')
            .button('Close'); })
            .open(function (modal) {
            modal.block();
            wg.http.get('Form/Methods').then(function (data) {
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
            wg.http.get('Form/Events').then(function (data) {
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
            wg.http.get('Form/Subscriptions').then(function (data) {
                modal.html(data, function () {
                    modal.unblock();
                });
            });
        });
    });
    wg('#File2').fileupload(function (c) { return c.autoUpload(false); });
    var $form = wg('#Uploader').form();
    $('#SaveFile').click(function (e) {
        e.preventDefault();
        $form.submit().then(function (result) {
            console.log(1);
        });
        wg.bind.form('Create, Edit').submit(function (form) {
            wg('#CountryGrid').grid().refresh();
        });
    });
    wg.bind.form('Create, Edit').submit({
        success: function (data) {
            console.log(data);
        },
        failed: function (data) {
            console.log(data);
        }
    });
    wg.bind.form('Create').submit(function (data) {
        console.log(data);
    });
});
//# sourceMappingURL=form.js.map