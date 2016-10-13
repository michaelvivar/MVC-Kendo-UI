var WizFx;
(function (WizFx) {
    var UI;
    (function (UI) {
        var Element = (function () {
            function Element(id) {
                if (id instanceof jQuery) {
                    this.jquery = id;
                }
                else {
                    this.jquery = $(id);
                }
                this.jquery = (this.jquery.length > 0) ? this.jquery.first() : null;
            }
            return Element;
        }());
        UI.Element = Element;
    })(UI = WizFx.UI || (WizFx.UI = {}));
})(WizFx || (WizFx = {}));
//# sourceMappingURL=element.js.map