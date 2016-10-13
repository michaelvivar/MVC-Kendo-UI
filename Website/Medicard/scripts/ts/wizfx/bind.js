var WizFx;
(function (WizFx) {
    var Bind = (function () {
        function Bind() {
        }
        Bind.prototype.form = function (name) {
            name = (_.isString(name) ? name.split(',') : name);
            return {
                submit: function (callback) {
                    if (_.isFunction(callback)) {
                        WizFx.Helper.Bind.Event(name, 'form', 'submit', callback);
                    }
                    else {
                        if (_.has(callback, 'success')) {
                            WizFx.Helper.Bind.Event(name, 'form', 'success', callback.success);
                        }
                        if (_.has(callback, 'failed')) {
                            WizFx.Helper.Bind.Event(name, 'form', 'failed', callback.failed);
                        }
                    }
                }
            };
        };
        Bind.prototype.grid = function (name) {
            name = (_.isString(name) ? name.split(',') : name);
            return {
                refresh: function (callback) {
                    WizFx.Helper.Bind.Event(name, 'grid', 'refresh', callback);
                },
                databound: function (callback) {
                    WizFx.Helper.Bind.Event(name, 'grid', 'databound', callback);
                }
            };
        };
        Bind.prototype.modal = function (name) {
            if (name) {
                name = (_.isString(name) ? name.split(',') : name);
            }
            else {
                name = ['bootstrap'];
            }
            return {
                open: function (callback) {
                    WizFx.Helper.Bind.Event(name, 'modal', 'open', callback);
                },
                close: function (callback) {
                    WizFx.Helper.Bind.Event(name, 'modal', 'close', callback);
                },
                ready: function (callback) {
                    WizFx.Helper.Bind.Event(name, 'modal', 'ready', callback);
                }
            };
        };
        return Bind;
    }());
    WizFx.Bind = Bind;
})(WizFx || (WizFx = {}));
var WizFx;
(function (WizFx) {
    var Helper;
    (function (Helper) {
        var Bind = (function () {
            function Bind() {
            }
            Bind.Event = function (nameArray, element, event, callback) {
                if ((!nameArray) || nameArray.length == 0) {
                    $(document).bind((element + '-' + event).trimEventName(), function (e, o) {
                        invoke(callback, o);
                    });
                }
                else {
                    $.each(nameArray, function (index, value) {
                        $(document).bind((element + '-' + value + '-' + event).trimEventName(), function (e, o) {
                            invoke(callback, o);
                        });
                    });
                }
            };
            return Bind;
        }());
        Helper.Bind = Bind;
    })(Helper = WizFx.Helper || (WizFx.Helper = {}));
})(WizFx || (WizFx = {}));
//# sourceMappingURL=bind.js.map