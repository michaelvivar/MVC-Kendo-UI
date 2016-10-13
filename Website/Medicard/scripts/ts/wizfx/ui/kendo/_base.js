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
            var Base = (function (_super) {
                __extends(Base, _super);
                function Base() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(Base.prototype, "label", {
                    get: function () {
                        if (this.jquery) {
                            return new UI.Html.Label(this.container.find('label[for="' + this.jquery.attr('name') + '"]'));
                        }
                        return null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Base.prototype.show = function () {
                    if (this.jquery) {
                        if (this.kendo) {
                            this.jquery.parents('.k-widget').first().removeClass('hide');
                        }
                        else {
                            this.jquery.removeClass('hide');
                        }
                    }
                    return this;
                };
                Base.prototype.hide = function () {
                    if (this.jquery) {
                        if (this.kendo) {
                            this.jquery.parents('.k-widget').first().addClass('hide');
                        }
                        else {
                            this.jquery.addClass('hide');
                        }
                    }
                    return this;
                };
                Base.prototype.read = function () {
                    if (this.jquery && this.jquery.wg('kendo')) {
                        this.kendo.dataSource.read();
                        this.kendo.refresh();
                    }
                    return this;
                };
                Object.defineProperty(Base.prototype, "data", {
                    get: function () {
                        if (this.jquery && this.jquery.wg('kendo') && _.has(this.kendo, 'dataSource')) {
                            return this.kendo.dataSource.data();
                        }
                    },
                    set: function (obj) {
                        if (this.jquery && this.jquery.wg('kendo') && _.has(this.kendo, 'dataSource')) {
                            this.kendo.setDataSource(obj);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Base.prototype, "value", {
                    get: function () {
                        if (this.jquery) {
                            var $value = void 0;
                            if (this.kendo) {
                                $value = this.kendo.value();
                            }
                            else {
                                $value = this.jquery.val();
                            }
                            if (!_.isNull($value) && ($value != Guid.empty())) {
                                if (_.isArray($value)) {
                                    var $clean_1 = [];
                                    _.each($value, function (i, k) {
                                        if (!_.isEmpty(i)) {
                                            $clean_1.push(i);
                                        }
                                    });
                                    return $clean_1;
                                }
                                return $value;
                            }
                        }
                    },
                    set: function (val) {
                        if (this.jquery) {
                            if (this.jquery.wg('kendo')) {
                                this.kendo.value(val);
                            }
                            else {
                                this.jquery.val(val);
                            }
                            this.jquery.trigger('cascade');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Base.prototype, "text", {
                    get: function () {
                        if (this.jquery) {
                            if (this.jquery.wg('kendo')) {
                                return this.kendo.text();
                            }
                            else {
                                return this.jquery.text();
                            }
                        }
                    },
                    set: function (str) {
                        if (this.jquery) {
                            if (this.jquery.wg('kendo')) {
                                this.kendo.text(str);
                            }
                            else {
                                this.jquery.text(str);
                            }
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Base.prototype.error = function (bool) {
                    if (this.jquery) {
                        if (bool == false) {
                            this.jquery.parents('.k-widget').first().removeClass(WizFx.WG.config.kendo.error.class);
                        }
                        else {
                            this.jquery.parents('.k-widget').first().addClass(WizFx.WG.config.kendo.error.class);
                        }
                    }
                    return this;
                };
                Base.prototype.readonly = function (bool) {
                    if (this.jquery) {
                        bool = _.isUndefined(bool) ? true : bool;
                        if (this.jquery.wg('kendo')) {
                            this.kendo.enable(!bool);
                            this.jquery.wg('readonly', bool);
                        }
                    }
                    return this;
                };
                Object.defineProperty(Base.prototype, "cascadefrom", {
                    get: function () {
                        return new UI.CascadeFrom(this);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Base.prototype, "bind", {
                    get: function () {
                        var _this = this;
                        return {
                            change: function (callback) {
                                if (_this.jquery) {
                                    _this.jquery.bind('cascade', function () {
                                        invoke(callback, _this);
                                    });
                                }
                                return _this;
                            }
                        };
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Base.prototype, "container", {
                    get: function () {
                        return this.jquery.wg('container') || $('body');
                    },
                    set: function (object) {
                        if (this.jquery) {
                            if (!(object instanceof jQuery)) {
                                object = $(object);
                            }
                            this.jquery.wg('container', object);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return Base;
            }(UI.Element));
            Kendo.Base = Base;
        })(Kendo = UI.Kendo || (UI.Kendo = {}));
    })(UI = WizFx.UI || (WizFx.UI = {}));
})(WizFx || (WizFx = {}));
//# sourceMappingURL=_base.js.map