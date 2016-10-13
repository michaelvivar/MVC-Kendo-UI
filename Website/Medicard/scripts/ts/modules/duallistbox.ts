wizardsgroup((wg) => {
    wg('#Country').duallistbox(c => c.dataSource('DualListBox/Data'));

    wg('#Country').duallistbox().bind.move((box, list, btn) => {
        console.log(box);
        console.log(btn);
        console.log(list);
    });

    $('#methods').click((e) => {
        e.preventDefault();
        wg.modal(c => c
            .title('Methods')
            .width('modal-lg')
            .button('Close'))
            .open((modal) => {
                modal.block();
                wg.http.get('DualListBox/Methods').then((data) => {
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
                wg.http.get('DualListBox/Properties').then((data) => {
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
                wg.http.get('DualListBox/Events').then((data) => {
                    modal.html(data, () => {
                        modal.unblock();
                    });
                });
            });
    });

});