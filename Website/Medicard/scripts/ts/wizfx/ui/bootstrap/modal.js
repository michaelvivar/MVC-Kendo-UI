var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var WizFx;
(function (WizFx) {
    var UI;
    (function (UI) {
        var Bootstrap;
        (function (Bootstrap) {
            var Modal = (function (_super) {
                __extends(Modal, _super);
                function Modal(id) {
                    _super.call(this, id);
                    this.options = {};
                }
                Modal.prototype.html = function (content, callback) {
                    var _this = this;
                    WizFx.wg(this.jquery.find('.modal-body').first()).html(content, function () {
                        trigger('modal-bootstrap-ready', _this, 'wg.bind.modal().ready(function(modal) { })');
                        trigger('modal-' + _this.jquery.find('.modal-title').first().text() + '-ready', _this, 'wg.bind.modal(\'' + _this.jquery.find('.modal-title').text() + '\').ready(function(modal) { })');
                        invoke(callback, _this);
                        WizFx.Helper.Modal.ResizeIframe(_this);
                    });
                    return this;
                };
                Modal.prototype.open = function (callback) {
                    var _this = this;
                    this.jquery.modal('show');
                    this.options.show = true;
                    this.jquery.modal(this.options);
                    _.delay(function () {
                        invoke(callback, _this);
                    }, 150);
                };
                Modal.prototype.close = function (callback) {
                    var _this = this;
                    this.unblock(function () {
                        _this.jquery.modal('hide');
                        invoke(callback, _this);
                    });
                };
                Modal.prototype.block = function (callback) {
                    var _this = this;
                    this.jquery.find('.modal-footer button, .modal-header button').attr('disabled', 'disabled');
                    WizFx.wg(this.jquery.find('.modal-container').first()).block(function () {
                        invoke(callback, _this);
                    });
                    return this;
                };
                Modal.prototype.unblock = function (callback) {
                    var _this = this;
                    this.jquery.find('.modal-footer button, .modal-header button').removeAttr('disabled');
                    WizFx.wg(this.jquery.find('.modal-container').first()).unblock(function () {
                        invoke(callback, _this);
                    });
                    return this;
                };
                Modal.prototype.form = function (name) {
                    if (arguments.length > 0) {
                        return new UI.Html.Form(this.jquery.find('form[name="' + name + '"]'));
                    }
                    return new UI.Html.Form(this.jquery.find('form').first());
                };
                return Modal;
            }(UI.Element));
            Bootstrap.Modal = Modal;
            var ModalConfig = (function () {
                function ModalConfig(_instance, options) {
                    this._instance = _instance;
                    this.options = options;
                    this._instance.jquery.find('.modal-footer').empty();
                    this._instance.jquery.find('.modal-title').empty();
                    this._instance.jquery.find('.modal-body').empty();
                    this._instance.jquery.find('.modal-dialog').first().removeClass('modal-sm').removeClass('modal-md').removeClass('modal-lg');
                }
                ModalConfig.prototype.title = function (str) {
                    this._instance.jquery.find('.modal-title').first().text(str);
                    return this;
                };
                ModalConfig.prototype.width = function (size) {
                    if (size == 'lg') {
                        size = 'modal-lg';
                    }
                    else if (size == 'md') {
                        size = 'modal-md';
                    }
                    else if (size == 'sm') {
                        size = 'modal-sm';
                    }
                    this._instance.jquery.find('.modal-dialog').first().addClass(size);
                    return this;
                };
                ModalConfig.prototype.button = function (text, click, attributes) {
                    var _this = this;
                    if (!_.isFunction(click)) {
                        click = function () { return _this._instance.close(); };
                    }
                    this._instance.jquery.find('.modal-footer').first().append($('<button></button>').text(text).addClass(Button.primary).click(function () {
                        invoke(click, _this._instance);
                    }).attr(attributes || {}));
                    return this;
                };
                return ModalConfig;
            }());
            Bootstrap.ModalConfig = ModalConfig;
        })(Bootstrap = UI.Bootstrap || (UI.Bootstrap = {}));
    })(UI = WizFx.UI || (WizFx.UI = {}));
})(WizFx || (WizFx = {}));
var WizFx;
(function (WizFx) {
    var Helper;
    (function (Helper) {
        var Modal = (function () {
            function Modal() {
            }
            Modal.ResizeIframe = function (modal) {
                if (parseInt(modal.jquery.find('.modal-dialog').first().css('top')) + modal.jquery.find('.modal-content').first().outerHeight() > $('body').outerHeight()) {
                    WizFx.WG.iframe.resize(parseInt(modal.jquery.find('.modal-dialog').first().css('top')) + modal.jquery.find('.modal-content').first().outerHeight() + 100);
                }
            };
            Modal.CenterModal = function (modal) {
                var $top = WizFx.WG.window.scrollTop;
                if (WizFx.WG.window.browser == Browser.ie) {
                    WizFx.WG.scrollTop = $top;
                    modal.jquery.find('.modal-dialog').css('top', 30);
                    return;
                }
                if ($top < 30) {
                    $top += 30 - $top;
                }
                modal.jquery.find('.modal-dialog').css('top', $top);
                WizFx.WG.scrollTop = 0;
                WizFx.WG.iframe.resize();
            };
            return Modal;
        }());
        Helper.Modal = Modal;
        var Alert = (function () {
            function Alert() {
            }
            Alert.CenterModal = function (modal) {
                if ($('.modal[aria-hidden="false"]').length > 1) {
                    var $modal = WizFx.wg($('.modal[aria-hidden="false"]').first()).modal();
                    var $top = parseInt($modal.jquery.find('.modal-dialog').css('top'));
                    var m = $modal.jquery.find('.modal-content').height() / 2;
                    var c = modal.jquery.find('.modal-content').height() / 2;
                    modal.jquery.find('.modal-dialog').css('top', ($top + (m - c)) - m * 0.2);
                }
                else {
                    if (self != top) {
                        modal.jquery.find('.modal-dialog').css('top', WizFx.WG.window.scrollTop + 30);
                    }
                    else {
                        modal.jquery.find('.modal-dialog').css('top', WizFx.WG.window.scrollTop + 80);
                    }
                }
            };
            return Alert;
        }());
        Helper.Alert = Alert;
        var Confirm = (function () {
            function Confirm() {
            }
            Confirm.CenterModal = function (modal) {
                if ($('.modal[aria-hidden="false"]').length > 1) {
                    var $modal = WizFx.wg($('.modal[aria-hidden="false"]').first()).modal();
                    var $top = parseInt($modal.jquery.find('.modal-dialog').css('top'));
                    var m = $modal.jquery.find('.modal-content').height() / 2;
                    var c = modal.jquery.find('.modal-content').height() / 2;
                    modal.jquery.find('.modal-dialog').css('top', ($top + (m - c)) - m * 0.2);
                }
                else {
                    if (self != top) {
                        modal.jquery.find('.modal-dialog').css('top', WizFx.WG.window.scrollTop + 30);
                    }
                    else {
                        modal.jquery.find('.modal-dialog').css('top', WizFx.WG.window.scrollTop + 80);
                    }
                }
            };
            return Confirm;
        }());
        Helper.Confirm = Confirm;
    })(Helper = WizFx.Helper || (WizFx.Helper = {}));
})(WizFx || (WizFx = {}));
//# sourceMappingURL=modal.js.map