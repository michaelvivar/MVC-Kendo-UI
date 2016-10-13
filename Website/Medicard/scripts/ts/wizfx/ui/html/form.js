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
            var Form = (function (_super) {
                __extends(Form, _super);
                function Form(id) {
                    _super.call(this, id);
                }
                Form.prototype.submit = function () {
                    var _this = this;
                    var req = {
                        success: function () {
                            return this;
                        },
                        then: function () {
                        },
                        failed: function () {
                            return this;
                        }
                    };
                    if (this.jquery) {
                        if (_.isFunction(this.jquery.wg('onsubmit')) && this.jquery.wg('onsubmit')(this) == false) {
                            return req;
                        }
                        this.jquery.find('filter-selected').val('');
                        var a = this.jquery.find('select.right-box option').prop('selected', true);
                        var b = this.jquery.find('input[data-wg-type="file"]').attr('type', 'text');
                        var c = this.jquery.find('[data-wg-readonly="true"]').removeAttr('disabled');
                        var data = this.jquery.serialize();
                        a.prop('selected', false);
                        b.attr('type', 'file');
                        c.attr('disabled', 'disabled');
                        var request = WizFx.WG.http.post(this.jquery.url(), data);
                        request.then(function (data) {
                            if (_this.jquery.attr('name')) {
                                trigger('form-' + _this.jquery.attr('name') + '-submit', data, 'wg.bind.form(\'' + _this.jquery.attr('name') + '\').submit(function(data) { } )');
                                if (_.has(data, 'ActionStatus')) {
                                    if (data.ActionStatus == Status.success) {
                                        trigger('form-' + _this.jquery.attr('name') + '-success', data, 'wg.bind.form(\'' + _this.jquery.attr('name') + '\').submit({ success: function(data) { } })');
                                    }
                                    else if (data.ActionStatus == Status.failed || data.ActionStatus == Status.warning) {
                                        trigger('form-' + _this.jquery.attr('name') + '-failed', data, 'wg.bind.form(\'' + _this.jquery.attr('name') + '\').submit({ failed: function(data) { } })');
                                    }
                                }
                            }
                            if (_.has(data, 'ErrorMessages') && data.ErrorMessages.length > 0) {
                                _this.jquery.find('.' + WizFx.WG.config.kendo.error.class).removeClass(WizFx.WG.config.kendo.error.class);
                                var errorMsg_1 = '<ul>';
                                _.each(data.ErrorMessages, function (item, i) {
                                    errorMsg_1 += '<li>' + item.Message + '</li>';
                                    _.each(item.FieldNames, function (name, i) {
                                        var j = _this.jquery.find('[name="' + name + '"]');
                                        switch (j.wg('kendo')) {
                                            case WizFx.WG.config.kendo.combobox:
                                                WizFx.wg(j).combobox().error();
                                                break;
                                            case WizFx.WG.config.kendo.datepicker:
                                                WizFx.wg(j).datepicker().error();
                                                break;
                                            case WizFx.WG.config.kendo.datetimepicker:
                                                WizFx.wg(j).datetimepicker().error();
                                                break;
                                            case WizFx.WG.config.kendo.maskedtextbox:
                                                WizFx.wg(j).maskedtextbox().error();
                                                break;
                                            case WizFx.WG.config.kendo.multiselect:
                                                WizFx.wg(j).multiselect().error();
                                                break;
                                            case WizFx.WG.config.kendo.numerictextbox:
                                                WizFx.wg(j).numerictextbox().error();
                                                break;
                                            case WizFx.WG.config.kendo.textbox:
                                                WizFx.wg(j).textbox().error();
                                                break;
                                            case WizFx.WG.config.kendo.timepicker:
                                                WizFx.wg(j).timepicker().error();
                                                break;
                                            case WizFx.WG.config.kendo.upload:
                                                WizFx.wg(j).fileupload().error();
                                                break;
                                        }
                                    });
                                    errorMsg_1 += '</ul>';
                                    $("#errorContainer").find('fieldset').append(errorMsg_1);
                                });
                            }
                        });
                        return request;
                    }
                    return req;
                };
                Object.defineProperty(Form.prototype, "bind", {
                    get: function () {
                        var _this = this;
                        return {
                            onsubmit: function (fn) {
                                if (_this.jquery && _.isFunction(fn)) {
                                    _this.jquery.wg('onsubmit', fn);
                                }
                                return _this;
                            }
                        };
                    },
                    enumerable: true,
                    configurable: true
                });
                return Form;
            }(UI.Element));
            Html.Form = Form;
        })(Html = UI.Html || (UI.Html = {}));
    })(UI = WizFx.UI || (WizFx.UI = {}));
})(WizFx || (WizFx = {}));
//# sourceMappingURL=form.js.map