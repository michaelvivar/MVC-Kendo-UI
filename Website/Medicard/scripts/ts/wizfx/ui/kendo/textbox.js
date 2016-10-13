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
            var Textbox = (function (_super) {
                __extends(Textbox, _super);
                function Textbox() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(Textbox.prototype, "kendo", {
                    get: function () {
                        if (this.jquery && this.jquery.wg('kendo') == WizFx.WG.config.kendo.textbox) {
                            return this.jquery.data('kendoAutoComplete');
                        }
                        return null;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Textbox;
            }(Kendo.Base));
            Kendo.Textbox = Textbox;
            var TextBoxConfig = (function () {
                function TextBoxConfig(jquery, options) {
                    this.jquery = jquery;
                    this.options = options;
                }
                TextBoxConfig.prototype.value = function (val) {
                    this.jquery.val(val);
                    return this;
                };
                TextBoxConfig.prototype.serverFiltering = function (bool) {
                    this.options.serverFiltering = bool;
                    return this;
                };
                TextBoxConfig.prototype.dataSource = function (data) {
                    this.options.dataSource = data;
                    return this;
                };
                return TextBoxConfig;
            }());
            Kendo.TextBoxConfig = TextBoxConfig;
        })(Kendo = UI.Kendo || (UI.Kendo = {}));
    })(UI = WizFx.UI || (WizFx.UI = {}));
})(WizFx || (WizFx = {}));
//# sourceMappingURL=textbox.js.map