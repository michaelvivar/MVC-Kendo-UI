wizardsgroup(function (wg) {
    wg('#File1').fileupload(function (c) { return c.autoUpload(true); });
    wg('#File1').fileupload()
        .bind.select(function (upload, file) {
        console.log(upload);
        console.log(file);
        console.log('select');
    })
        .bind.success(function (upload, file) {
        console.log(upload);
        console.log(file);
        console.log('success');
    })
        .bind.error(function (upload, file) {
        console.log(upload);
        console.log(file);
        console.log('error');
    })
        .bind.remove(function (upload, file) {
        console.log(upload);
        console.log(file);
        console.log('remove');
    })
        .bind.upload(function (upload, file) {
        console.log(upload);
        console.log(file);
        console.log('upload');
    });
    $('#methods').click(function (e) {
        e.preventDefault();
        wg.modal(function (c) { return c
            .title('Methods')
            .width('modal-lg')
            .button('Close'); })
            .open(function (modal) {
            modal.block();
            wg.http.get('FileUpload/Methods').then(function (data) {
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
            wg.http.get('FileUpload/Properties').then(function (data) {
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
            wg.http.get('FileUpload/Events').then(function (data) {
                modal.html(data, function () {
                    modal.unblock();
                });
            });
        });
    });
});
//# sourceMappingURL=fileupload.js.map