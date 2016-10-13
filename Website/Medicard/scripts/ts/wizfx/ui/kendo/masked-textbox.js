var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var WizFx;
(function (WizFx) {
    var UI;
    (function (UI) {
        var Kendo;
        (function (Kendo) {
            var MaskedTextBox = (function (_super) {
                __extends(MaskedTextBox, _super);
                function MaskedTextBox() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(MaskedTextBox.prototype, "kendo", {
                    get: function () {
                        if (this.jquery && this.jquery.wg('kendo') == WizFx.WG.config.kendo.maskedtextbox) {
                            return this.jquery.data(WizFx.WG.config.kendo.maskedtextbox);
                        }
                        return null;
                    },
                    enumerable: true,
                    configurable: true
                });
                return MaskedTextBox;
            }(Kendo.Base));
            Kendo.MaskedTextBox = MaskedTextBox;
            var MaskedTextBoxConfig = (function () {
                function MaskedTextBoxConfig(jquery, options) {
                    this.jquery = jquery;
                    this.options = options;
                }
                MaskedTextBoxConfig.prototype.mask = function (str) {
                    this.options.mask = str;
                    return this;
                };
                MaskedTextBoxConfig.prototype.value = function (val) {
                    this.options.value = val;
                    return this;
                };
                return MaskedTextBoxConfig;
            }());
            Kendo.MaskedTextBoxConfig = MaskedTextBoxConfig;
        })(Kendo = UI.Kendo || (UI.Kendo = {}));
    })(UI = WizFx.UI || (WizFx.UI = {}));
})(WizFx || (WizFx = {}));
//# sourceMappingURL=masked-textbox.js.map