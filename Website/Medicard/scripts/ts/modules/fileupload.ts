wizardsgroup((wg) => {
    wg('#File1').fileupload(c => c.autoUpload(true));

    wg('#File1').fileupload()
        .bind.select((upload, file) => {
            console.log(upload);
            console.log(file);
            console.log('select');
        })
        .bind.success((upload, file) => {
            console.log(upload);
            console.log(file);
            console.log('success');
        })
        .bind.error((upload, file) => {
            console.log(upload);
            console.log(file);
            console.log('error');
        })
        .bind.remove((upload, file) => {
            console.log(upload);
            console.log(file);
            console.log('remove');
        })
        .bind.upload((upload, file) => {
            console.log(upload);
            console.log(file);
            console.log('upload');
        });

    $('#methods').click((e) => {
        e.preventDefault();
        wg.modal(c => c
            .title('Methods')
            .width('modal-lg')
            .button('Close'))
            .open((modal) => {
                modal.block();
                wg.http.get('FileUpload/Methods').then((data) => {
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
                wg.http.get('FileUpload/Properties').then((data) => {
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
                wg.http.get('FileUpload/Events').then((data) => {
                    modal.html(data, () => {
                        modal.unblock();
                    });
                });
            });
    });
});