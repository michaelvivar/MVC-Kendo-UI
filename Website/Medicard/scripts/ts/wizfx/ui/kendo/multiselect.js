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
            var MultiSelect = (function (_super) {
                __extends(MultiSelect, _super);
                function MultiSelect() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(MultiSelect.prototype, "kendo", {
                    get: function () {
                        if (this.jquery && this.jquery.wg('kendo') == WizFx.WG.config.kendo.multiselect) {
                            return this.jquery.data(WizFx.WG.config.kendo.multiselect);
                        }
                        return null;
                    },
                    enumerable: true,
                    configurable: true
                });
                MultiSelect.prototype.reset = function () {
                    this.value = [];
                    return this;
                };
                return MultiSelect;
            }(Kendo.Base));
            Kendo.MultiSelect = MultiSelect;
            var MultiSelectConfig = (function () {
                function MultiSelectConfig(jquery, options) {
                    this.jquery = jquery;
                    this.options = options;
                }
                MultiSelectConfig.prototype.dataSource = function (data) {
                    this.options.dataSource = data;
                    return this;
                };
                MultiSelectConfig.prototype.serverFiltering = function (bool) {
                    this.options.serverFiltering = bool;
                    return this;
                };
                MultiSelectConfig.prototype.maxLength = function (int) {
                    this.options.maxLength = int;
                    return this;
                };
                MultiSelectConfig.prototype.autoBind = function (bool) {
                    this.options.autoBind = bool;
                    return this;
                };
                MultiSelectConfig.prototype.value = function (val) {
                    if (_.isString(val)) {
                        val = [val];
                    }
                    this.options.value = val;
                    return this;
                };
                MultiSelectConfig.prototype.cascadeFrom = function (id) {
                    if (this.jquery) {
                        this.jquery.data('cascadefrom', id);
                    }
                    return this;
                };
                return MultiSelectConfig;
            }());
            Kendo.MultiSelectConfig = MultiSelectConfig;
        })(Kendo = UI.Kendo || (UI.Kendo = {}));
    })(UI = WizFx.UI || (WizFx.UI = {}));
})(WizFx || (WizFx = {}));
//# sourceMappingURL=multiselect.js.map