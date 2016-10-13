var WizFx;
(function (WizFx) {
    var Window = (function () {
        function Window() {
        }
        Window.prototype.redirectTo = function (url) {
            window.location = url;
        };
        Object.defineProperty(Window.prototype, "scroll", {
            get: function () {
                return {
                    top: function (int) {
                        $('html, body').animate({
                            scrollTop: int || 0
                        }, 1);
                    },
                    bottom: function (int) {
                        $('html, body').animate({
                            scrollTop: $(document).height() - $(window).height()
                        }, 1);
                    }
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Window.prototype, "scrollTop", {
            get: function () {
                return parent.window.__scrollTop;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Window.prototype, "browser", {
            get: function () {
                if ($('html').hasClass('k-ff')) {
                    return Browser.firefox;
                }
                else if ($('html').hasClass('k-webkit')) {
                    return Browser.chrome;
                }
                else if ($('html').hasClass('k-ie')) {
                    return Browser.ie;
                }
            },
            enumerable: true,
            configurable: true
        });
        return Window;
    }());
    WizFx.Window = Window;
})(WizFx || (WizFx = {}));
//# sourceMappingURL=window.js.map