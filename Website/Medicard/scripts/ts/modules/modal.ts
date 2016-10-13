wizardsgroup((wg) => {
    $('#Alert').click(() => {
        wg.alert('Alert Message', () => {

        }, 'Alert!');
    });
    $('#Confirm').click(() => {
        wg.confirm('Confirm Messsage', (bool) => {

        }, 'Confirm!');
    });

    $('#methods').click((e) => {
        e.preventDefault();
        wg.modal(c => c
            .title('Methods')
            .width('modal-lg')
            .button('Close'))
            .open((modal) => {
                modal.block();
                wg.http.get('Modal/Methods').then((data) => {
                    modal.html(data, () => {
                        modal.unblock();
                    });
                });
            });
    });

    $('#subscriptions').click((e) => {
        e.preventDefault();
        wg.modal(c => c
            .title('Methods')
            .width('modal-lg')
            .button('Close'))
            .open((modal) => {
                modal.block();
                wg.http.get('Modal/Subscriptions').then((data) => {
                    modal.html(data, () => {
                        modal.unblock();
                    });
                });
            });
    });
});