var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var WizFx;
(function (WizFx) {
    var UI;
    (function (UI) {
        var Html;
        (function (Html) {
            var Label = (function (_super) {
                __extends(Label, _super);
                function Label(jq) {
                    _super.call(this, jq);
                }
                Label.prototype.hide = function () {
                    if (this.jquery) {
                        this.jquery.addClass('hide');
                    }
                    return this;
                };
                Label.prototype.show = function () {
                    if (this.jquery) {
                        this.jquery.removeClass('hide');
                    }
                    return this;
                };
                Object.defineProperty(Label.prototype, "text", {
                    get: function () {
                        if (this.jquery) {
                            return this.jquery.text();
                        }
                        return '';
                    },
                    set: function (str) {
                        if (this.jquery) {
                            this.jquery.text(str);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return Label;
            }(UI.Element));
            Html.Label = Label;
        })(Html = UI.Html || (UI.Html = {}));
    })(UI = WizFx.UI || (WizFx.UI = {}));
})(WizFx || (WizFx = {}));
//# sourceMappingURL=label.js.map