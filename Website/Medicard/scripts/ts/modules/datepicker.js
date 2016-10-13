wizardsgroup(function (wg) {
    //wg('#DatePickerEnd').datepicker(c => c.cascadeFrom('DatePickerStart'));
    //wg('#DateTimePickerEnd').datetimepicker(c => c.cascadeFrom('DateTimePickerStart'));
    //wg('#TimePickerEnd').timepicker(c => c.interval(30).cascadeFrom('TimePickerStart'));
    $('#methods').click(function (e) {
        e.preventDefault();
        wg.modal(function (c) { return c
            .title('Methods')
            .width('modal-lg')
            .button('Close'); })
            .open(function (modal) {
            modal.block();
            wg.http.get('DatePicker/Methods').then(function (data) {
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
            wg.http.get('DatePicker/Properties').then(function (data) {
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
            wg.http.get('DatePicker/Events').then(function (data) {
                modal.html(data, function () {
                    modal.unblock();
                });
            });
        });
    });
});
//# sourceMappingURL=datepicker.js.map