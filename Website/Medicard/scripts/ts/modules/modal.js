wizardsgroup(function (wg) {
    $('#Alert').click(function () {
        wg.alert('Alert Message', function () {
        }, 'Alert!');
    });
    $('#Confirm').click(function () {
        wg.confirm('Confirm Messsage', function (bool) {
        }, 'Confirm!');
    });
    $('#methods').click(function (e) {
        e.preventDefault();
        wg.modal(function (c) { return c
            .title('Methods')
            .width('modal-lg')
            .button('Close'); })
            .open(function (modal) {
            modal.block();
            wg.http.get('Modal/Methods').then(function (data) {
                modal.html(data, function () {
                    modal.unblock();
                });
            });
        });
    });
    $('#subscriptions').click(function (e) {
        e.preventDefault();
        wg.modal(function (c) { return c
            .title('Methods')
            .width('modal-lg')
            .button('Close'); })
            .open(function (modal) {
            modal.block();
            wg.http.get('Modal/Subscriptions').then(function (data) {
                modal.html(data, function () {
                    modal.unblock();
                });
            });
        });
    });
});
//# sourceMappingURL=modal.js.map