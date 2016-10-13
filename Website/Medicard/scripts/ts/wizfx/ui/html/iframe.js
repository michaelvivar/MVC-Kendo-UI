var WizFx;
(function (WizFx) {
    var UI;
    (function (UI) {
        var Html;
        (function (Html) {
            var Iframe = (function () {
                function Iframe() {
                }
                Iframe.prototype.resize = function (int) {
                    var jquery = $(WizFx.WG.config.tab.id).find('.k-state-active iframe').first();
                    if (parseInt(int) < WizFx.WG.config.tab.height) {
                        int = WizFx.WG.config.tab.height;
                    }
                    if (WizFx.WG.config.tab.animation) {
                        jquery.animate({ height: int }, 500);
                    }
                    else {
                        jquery.height(int);
                    }
                };
                return Iframe;
            }());
            Html.Iframe = Iframe;
        })(Html = UI.Html || (UI.Html = {}));
    })(UI = WizFx.UI || (WizFx.UI = {}));
})(WizFx || (WizFx = {}));
var WizFx;
(function (WizFx) {
    var Helper;
    (function (Helper) {
        var IFrame = (function () {
            function IFrame() {
            }
            IFrame.getHeight = function () {
                var height = $('body').outerHeight();
                return (height > WizFx.WG.config.tab.height) ? height + 50 : WizFx.WG.config.tab.height;
            };
            return IFrame;
        }());
        Helper.IFrame = IFrame;
    })(Helper = WizFx.Helper || (WizFx.Helper = {}));
})(WizFx || (WizFx = {}));
//# sourceMappingURL=iframe.js.map