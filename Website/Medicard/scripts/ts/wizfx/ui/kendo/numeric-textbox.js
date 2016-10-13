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
            var NumericTextBox = (function (_super) {
                __extends(NumericTextBox, _super);
                function NumericTextBox() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(NumericTextBox.prototype, "kendo", {
                    get: function () {
                        if (this.jquery && this.jquery.wg('kendo') == WizFx.WG.config.kendo.numerictextbox) {
                            return this.jquery.data(WizFx.WG.config.kendo.numerictextbox);
                        }
                        return null;
                    },
                    enumerable: true,
                    configurable: true
                });
                NumericTextBox.prototype.min = function (value) {
                    if (this.kendo) {
                        this.kendo.min(value);
                    }
                    return this;
                };
                NumericTextBox.prototype.max = function (value) {
                    if (this.kendo) {
                        this.kendo.max(value);
                    }
                    return this;
                };
                return NumericTextBox;
            }(Kendo.Base));
            Kendo.NumericTextBox = NumericTextBox;
            var NumericTextBoxConfig = (function () {
                function NumericTextBoxConfig(jquery, options) {
                    this.jquery = jquery;
                    this.options = options;
                }
                NumericTextBoxConfig.prototype.spinner = function (bool) {
                    this.options.spinners = bool;
                    return this;
                };
                NumericTextBoxConfig.prototype.max = function (value) {
                    this.options.max = value;
                    return this;
                };
                NumericTextBoxConfig.prototype.min = function (value) {
                    this.options.min = value;
                    return this;
                };
                NumericTextBoxConfig.prototype.format = function (str) {
                    this.options.format = str;
                    return this;
                };
                NumericTextBoxConfig.prototype.decimals = function (int) {
                    this.options.decimals = int;
                    return this;
                };
                NumericTextBoxConfig.prototype.value = function (val) {
                    this.options.value = val;
                    return this;
                };
                NumericTextBoxConfig.prototype.cascadeFrom = function (id) {
                    if (this.jquery) {
                        this.jquery.data('cascadefrom', id);
                    }
                    return this;
                };
                return NumericTextBoxConfig;
            }());
            Kendo.NumericTextBoxConfig = NumericTextBoxConfig;
        })(Kendo = UI.Kendo || (UI.Kendo = {}));
    })(UI = WizFx.UI || (WizFx.UI = {}));
})(WizFx || (WizFx = {}));
//# sourceMappingURL=numeric-textbox.js.map