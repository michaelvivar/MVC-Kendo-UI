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
            var Accordion = (function (_super) {
                __extends(Accordion, _super);
                function Accordion() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(Accordion.prototype, "kendo", {
                    get: function () {
                        if (this.jquery && this.jquery.wg('kendo') == WizFx.WG.config.kendo.accordion) {
                            return this.jquery.data(WizFx.WG.config.kendo.accordion);
                        }
                        return null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Accordion.prototype, "bind", {
                    get: function () {
                        var _this = this;
                        return {
                            expand: function (item, callback) {
                                if (_this.jquery) {
                                    var arrayName_1 = [];
                                    if (_.isString(item)) {
                                        arrayName_1 = item.split(',');
                                    }
                                    else if (_.isArray(item)) {
                                        arrayName_1 = item;
                                    }
                                    if (_.isFunction(item)) {
                                        _this.jquery.find('li.k-item .k-header').each(function () {
                                            arrayName_1.push($(this).text());
                                        });
                                        callback = item;
                                    }
                                    if (_.isFunction(callback)) {
                                        _.each(arrayName_1, function (name, i) {
                                            _this.jquery.bind((name + '-expand').trimEventName(), function (e, i) {
                                                invoke(callback, _this, i);
                                            });
                                        });
                                    }
                                }
                                return _this;
                            },
                            collapse: function (item, callback) {
                                if (_this.jquery) {
                                    var arrayName_2 = [];
                                    if (_.isString(item)) {
                                        arrayName_2 = item.split(',');
                                    }
                                    else if (_.isArray(item)) {
                                        arrayName_2 = item;
                                    }
                                    if (_.isFunction(item)) {
                                        _this.jquery.find('li.k-item .k-header').each(function () {
                                            arrayName_2.push($(this).text());
                                        });
                                        callback = item;
                                    }
                                    if (_.isFunction(callback)) {
                                        _.each(arrayName_2, function (name, i) {
                                            _this.jquery.bind((name + '-collapse').trimEventName(), function (e, i) {
                                                invoke(callback, _this, i);
                                            });
                                        });
                                    }
                                }
                                return _this;
                            },
                            load: function (item, callback) {
                                if (_this.jquery) {
                                    var arrayName_3 = [];
                                    if (_.isString(item)) {
                                        arrayName_3 = item.split(',');
                                    }
                                    else if (_.isArray(item)) {
                                        arrayName_3 = item;
                                    }
                                    if (_.isFunction(item)) {
                                        _this.jquery.find('li.k-item .k-header').each(function () {
                                            arrayName_3.push($(this).text());
                                        });
                                        callback = item;
                                    }
                                    if (_.isFunction(callback)) {
                                        _.each(arrayName_3, function (name, i) {
                                            _this.jquery.bind((name + '-load').trimEventName(), function (e, i) {
                                                invoke(callback, _this, i);
                                            });
                                        });
                                    }
                                }
                                return _this;
                            }
                        };
                    },
                    enumerable: true,
                    configurable: true
                });
                return Accordion;
            }(Kendo.Base));
            Kendo.Accordion = Accordion;
            var AccordionConfig = (function () {
                function AccordionConfig(jquery, options) {
                    this.jquery = jquery;
                    this.options = options;
                    this.options.items = [];
                }
                AccordionConfig.prototype.expandMode = function (mode) {
                    this.options.expandMode = mode;
                    return this;
                };
                AccordionConfig.prototype.addItem = function (title, content, expanded) {
                    if (this.jquery) {
                        this.jquery.empty();
                    }
                    this.options.items.push({
                        text: title,
                        contentUrl: _.isUrl(content) ? content : undefined,
                        content: _.isUrl(content) ? undefined : content,
                        expanded: expanded || false
                    });
                    return this;
                };
                return AccordionConfig;
            }());
            Kendo.AccordionConfig = AccordionConfig;
        })(Kendo = UI.Kendo || (UI.Kendo = {}));
    })(UI = WizFx.UI || (WizFx.UI = {}));
})(WizFx || (WizFx = {}));
//# sourceMappingURL=accordion.js.map