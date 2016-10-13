wizardsgroup(function (wg) {
    wg('#Accordion').accordion().bind.load('Notification', function () {
        $('#Success').click(function () {
            wg.notification.success('Test');
        });
        $('#Info').click(function () {
            wg.notification.info('Test');
        });
        $('#Warning').click(function () {
            wg.notification.warning('Test');
        });
        $('#Error').click(function () {
            wg.notification.error('Test');
        });
    });
});
//# sourceMappingURL=home.js.map