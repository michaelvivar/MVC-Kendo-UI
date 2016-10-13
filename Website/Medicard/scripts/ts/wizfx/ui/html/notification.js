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
            var Notification = (function (_super) {
                __extends(Notification, _super);
                function Notification(id) {
                    _super.call(this, id);
                    this.jquery.click(function () {
                        clearTimeout(WizFx.Helper.Notification.time);
                        $(this).slideUp();
                    });
                }
                Notification.prototype.success = function (msg) {
                    WizFx.Helper.Notification.displayMessage(this, WizFx.WG.config.notification.type.success, msg);
                };
                Notification.prototype.info = function (msg) {
                    WizFx.Helper.Notification.displayMessage(this, WizFx.WG.config.notification.type.info, msg);
                };
                Notification.prototype.warning = function (msg) {
                    WizFx.Helper.Notification.displayMessage(this, WizFx.WG.config.notification.type.warning, msg);
                };
                Notification.prototype.error = function (msg) {
                    WizFx.Helper.Notification.displayMessage(this, WizFx.WG.config.notification.type.error, msg);
                };
                Notification.prototype.display = function (result) {
                    WizFx.Helper.Notification.displayMessage(this, result.status, result.message);
                };
                return Notification;
            }(UI.Element));
            Html.Notification = Notification;
        })(Html = UI.Html || (UI.Html = {}));
    })(UI = WizFx.UI || (WizFx.UI = {}));
})(WizFx || (WizFx = {}));
var WizFx;
(function (WizFx) {
    var Helper;
    (function (Helper) {
        var Notification = (function () {
            function Notification() {
            }
            Notification.displayMessage = function (notification, type, msg) {
                clearTimeout(Notification.time);
                var $color;
                notification.jquery.slideUp(function () {
                    setTimeout(function () {
                        notification.jquery.css({ 'padding-left': 10 });
                        switch (type.toLowerCase()) {
                            case WizFx.WG.config.notification.type.success.toLowerCase():
                                $color = Color.green;
                                break;
                            case WizFx.WG.config.notification.type.info.toLowerCase():
                                $color = Color.blue;
                                break;
                            case WizFx.WG.config.notification.type.warning.toLowerCase():
                                $color = Color.orange;
                                break;
                            case WizFx.WG.config.notification.type.error.toLowerCase():
                                $color = Color.red;
                                break;
                        }
                        notification.jquery.css({
                            'background-color': $color
                        }).text(msg).slideDown();
                    }, 300);
                });
                Notification.time = setTimeout(function () {
                    notification.jquery.slideUp(function () {
                        notification.jquery.text('');
                    });
                }, WizFx.WG.config.notification.timeOut);
            };
            return Notification;
        }());
        Helper.Notification = Notification;
    })(Helper = WizFx.Helper || (WizFx.Helper = {}));
})(WizFx || (WizFx = {}));
//# sourceMappingURL=notification.js.map