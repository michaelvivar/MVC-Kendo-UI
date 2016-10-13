wizardsgroup((wg) => {

    $('#methods').click((e) => {
        e.preventDefault();
        wg.modal(c => c
            .title('Methods')
            .width('modal-lg')
            .button('Close'))
            .open((modal) => {
                modal.block();
                wg.http.get('Form/Methods').then((data) => {
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
                wg.http.get('Form/Events').then((data) => {
                    modal.html(data, () => {
                        modal.unblock();
                    });
                });
            });
    });

    $('#subscriptions').click((e) => {
        e.preventDefault();
        wg.modal(c => c
            .title('Subscriptions')
            .width('modal-lg')
            .button('Close'))
            .open((modal) => {
                modal.block();
                wg.http.get('Form/Subscriptions').then((data) => {
                    modal.html(data, () => {
                        modal.unblock();
                    });
                });
            });
    });

    wg('#File2').fileupload(c => c.autoUpload(false));

    let $form = wg('#Uploader').form();

    $('#SaveFile').click((e) => {
        e.preventDefault();

        $form.submit().then((result) => {
            console.log(1);
        });


        wg.bind.form('Create, Edit').submit((form) => {
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
    wg.bind.form('Create').submit((data) => {
        console.log(data);
    });
});