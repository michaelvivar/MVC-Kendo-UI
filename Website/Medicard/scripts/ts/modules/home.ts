wizardsgroup((wg) => {
    wg('#Accordion').accordion().bind.load('Notification', () => {
        $('#Success').click(() => {
            wg.notification.success('Test');
        });
        $('#Info').click(() => {
            wg.notification.info('Test');
        });
        $('#Warning').click(() => {
            wg.notification.warning('Test');
        });
        $('#Error').click(() => {
            wg.notification.error('Test');
        });
    });
});