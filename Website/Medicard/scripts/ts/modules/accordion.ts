wizardsgroup((wg) => {
    wg('#Accordion1').accordion(c => c
        .addItem('Personal', wg.url('Accordion/PersonalDetails'), true)
        .addItem('Contact', '<h3>Contact Details</h3>', false)
        .expandMode("single")
    ).bind.collapse(['Personal', 'Contact'], (a, ele) => {
        console.log(ele);
    }).bind.load((a, ele) => {
        console.log('loaded');
        console.log(ele);
    }).bind.expand('Contact, Personal', (accordion, ele) => {
        console.log('expanded');
    });

});