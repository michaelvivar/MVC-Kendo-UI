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
            var ContextMenu = (function (_super) {
                __extends(ContextMenu, _super);
                function ContextMenu() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(ContextMenu.prototype, "kendo", {
                    get: function () {
                        if (this.jquery && this.jquery.wg('kendo') == WizFx.WG.config.kendo.contextmenu) {
                            return this.jquery.data(WizFx.WG.config.kendo.contextmenu);
                        }
                        return null;
                    },
                    enumerable: true,
                    configurable: true
                });
                ContextMenu.prototype.open = function (callback) {
                    invoke(callback, this);
                    return this;
                };
                return ContextMenu;
            }(Kendo.Base));
            Kendo.ContextMenu = ContextMenu;
            var ContextMenuConfig = (function () {
                function ContextMenuConfig(jquery, options) {
                    this.jquery = jquery;
                    this.options = options;
                }
                ContextMenuConfig.prototype.target = function (selector) {
                    this.options.target = selector;
                };
                return ContextMenuConfig;
            }());
            Kendo.ContextMenuConfig = ContextMenuConfig;
        })(Kendo = UI.Kendo || (UI.Kendo = {}));
    })(UI = WizFx.UI || (WizFx.UI = {}));
})(WizFx || (WizFx = {}));
//# sourceMappingURL=contextmenu.js.map