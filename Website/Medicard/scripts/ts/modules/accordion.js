wizardsgroup(function (wg) {
    wg('#Accordion1').accordion(function (c) { return c
        .addItem('Personal', wg.url('Accordion/PersonalDetails'), true)
        .addItem('Contact', '<h3>Contact Details</h3>', false)
        .expandMode("single"); }).bind.collapse(['Personal', 'Contact'], function (a, ele) {
        console.log(ele);
    }).bind.load(function (a, ele) {
        console.log('loaded');
        console.log(ele);
    }).bind.expand('Contact, Personal', function (accordion, ele) {
        console.log('expanded');
    });
});
//# sourceMappingURL=accordion.js.map