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
            var ComboBox = (function (_super) {
                __extends(ComboBox, _super);
                function ComboBox() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(ComboBox.prototype, "kendo", {
                    get: function () {
                        if (this.jquery && this.jquery.wg('kendo') == WizFx.WG.config.kendo.combobox) {
                            return this.jquery.data(WizFx.WG.config.kendo.combobox);
                        }
                        return null;
                    },
                    enumerable: true,
                    configurable: true
                });
                ComboBox.prototype.reset = function () {
                    if (this.jquery && this.jquery.wg('kendo')) {
                        this.kendo.select(-1);
                    }
                    return this;
                };
                ComboBox.prototype.error = function (bool) {
                    if (this.jquery && this.jquery.wg('kendo')) {
                        if (bool == false) {
                            this.kendo._inputWrapper.removeClass(WizFx.WG.config.kendo.error.class);
                        }
                        else {
                            this.kendo._inputWrapper.addClass(WizFx.WG.config.kendo.error.class);
                        }
                    }
                    return this;
                };
                return ComboBox;
            }(Kendo.Base));
            Kendo.ComboBox = ComboBox;
            var ComboBoxConfig = (function () {
                function ComboBoxConfig(jquery, options) {
                    this.jquery = jquery;
                    this.options = options;
                }
                ComboBoxConfig.prototype.dataSource = function (data) {
                    this.options.dataSource = data;
                    return this;
                };
                ComboBoxConfig.prototype.cascadeFrom = function (id) {
                    if (this.jquery) {
                        this.jquery.data('cascadefrom', id);
                    }
                    return this;
                };
                ComboBoxConfig.prototype.maxLength = function (int) {
                    this.options.maxLength = int;
                    return this;
                };
                ComboBoxConfig.prototype.autoBind = function (bool) {
                    this.options.autoBind = bool;
                    return this;
                };
                ComboBoxConfig.prototype.value = function (val) {
                    if (_.isString(val)) {
                        this.options.value = val;
                    }
                    return this;
                };
                return ComboBoxConfig;
            }());
            Kendo.ComboBoxConfig = ComboBoxConfig;
        })(Kendo = UI.Kendo || (UI.Kendo = {}));
    })(UI = WizFx.UI || (WizFx.UI = {}));
})(WizFx || (WizFx = {}));
//# sourceMappingURL=combobox.js.map