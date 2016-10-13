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
            var TabStrip = (function (_super) {
                __extends(TabStrip, _super);
                function TabStrip() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(TabStrip.prototype, "kendo", {
                    get: function () {
                        if (this.jquery && this.jquery.wg('kendo') == WizFx.WG.config.kendo.tabstrip) {
                            return this.jquery.data(WizFx.WG.config.kendo.tabstrip);
                        }
                        return null;
                    },
                    enumerable: true,
                    configurable: true
                });
                TabStrip.prototype.add = function (title, url, key, x) {
                    if (this.kendo) {
                        if (this.jquery.find('.k-tabstrip-items li.k-item[data-key="' + key + '"]').length > 0) {
                            this.activate(key);
                            return this;
                        }
                        this.kendo.append([{
                                text: title + ((x === false) ? '' : '<span class="ui-icon-close glyphicon glyphicon-remove"></span>'),
                                encoded: false,
                                contentUrl: url
                            }], this.kendo.tabGroup.children().eq(0));
                        var index = parseInt((this.jquery.find('li.k-item').length - 1));
                        this.kendo.select(index);
                        this.jquery.find('.k-tabstrip-items li:last-child').attr({ 'data-key': key }).find('.k-link span').attr('data-key', key);
                    }
                    return this;
                };
                TabStrip.prototype.activate = function (key) {
                    if (this.kendo) {
                        var $index = 0;
                        this.jquery.find('li.k-item').each(function (i) {
                            if ($(this).data('key') == key) {
                                $index = i;
                            }
                        });
                        this.kendo.select($index);
                        //this.jquery.find('.k-tabstrip-items .k-state-active').attr('data-tabindex', TabStrip.index++);
                        WizFx.WG.iframe.resize();
                    }
                    return this;
                };
                TabStrip.prototype.remove = function (key) {
                    var _this = this;
                    if (this.jquery) {
                        this.jquery.find('li.k-item').each(function () {
                            if ($(_this).data('key') == key) {
                                _this.kendo.remove($(_this));
                            }
                        });
                        var index = 0;
                        this.jquery.find('li.k-item').each(function () {
                            if (index < parseInt($(this).attr('data-tabindex'))) {
                                index = parseInt($(this).attr('data-tabindex'));
                            }
                        });
                        this.activate(this.jquery.find('li[data-tabindex="' + index + '"]').data('key'));
                    }
                    return this;
                };
                Object.defineProperty(TabStrip.prototype, "bind", {
                    get: function () {
                        var _this = this;
                        return {
                            load: function (item, callback) {
                                if (_this.jquery) {
                                    var arrayName = [];
                                    if (_.isString(item)) {
                                        arrayName = item.split(',');
                                    }
                                    else if (_.isArray(item)) {
                                        arrayName = item;
                                    }
                                    if (_.isFunction(callback)) {
                                        _.each(arrayName, function (name, i) {
                                            _this.jquery.bind((name + '-load').trimEventName(), function (e, data) {
                                                invoke(callback, _this, data.content, data.element);
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
                return TabStrip;
            }(Kendo.Base));
            Kendo.TabStrip = TabStrip;
            var TabStripConfig = (function () {
                function TabStripConfig(jquery, options) {
                    this.jquery = jquery;
                    this.options = options;
                }
                return TabStripConfig;
            }());
            Kendo.TabStripConfig = TabStripConfig;
            var Tab = (function (_super) {
                __extends(Tab, _super);
                function Tab() {
                    _super.apply(this, arguments);
                }
                Tab.prototype.add = function (title, url, key, x) {
                    if (this.kendo) {
                        if (this.jquery.find('.k-tabstrip-items li.k-item[data-key="' + key + '"]').length > 0) {
                            this.activate(key);
                            return this;
                        }
                        this.kendo.append([{
                                text: title + ((x === false) ? '' : WizFx.WG.config.tab.button.close),
                                encoded: false,
                                content: $('<div></div>').append($('<iframe></iframe>')
                                    .attr($.extend(WizFx.WG.config.tab.iframe, { name: title, src: url }))).html()
                            }], this.kendo.tabGroup.children().eq(0));
                        var index = parseInt((this.jquery.find('li.k-item').length - 1));
                        this.kendo.select(index);
                        this.jquery.find('.k-tabstrip-items .k-state-active').attr({ 'data-key': key }).find('.k-link span').attr('data-key', key);
                    }
                    WizFx.WG.window.scroll.top();
                    return this;
                };
                return Tab;
            }(TabStrip));
            Kendo.Tab = Tab;
        })(Kendo = UI.Kendo || (UI.Kendo = {}));
    })(UI = WizFx.UI || (WizFx.UI = {}));
})(WizFx || (WizFx = {}));
var WizFx;
(function (WizFx) {
    var Helper;
    (function (Helper) {
        var TabStrip = (function () {
            function TabStrip() {
            }
            TabStrip.ContentLoad = function (tabstrip) {
                return function (e) {
                    if (tabstrip.jquery) {
                        var $html = $(e.contentElement).html();
                        var $tab = $('<div></div>', { 'data-container': 'tab' });
                        $tab.html($html);
                        WizFx.wg(e.contentElement).html($tab, function () {
                            tabstrip.jquery.trigger(($(e.item).text() + '-load').trimEventName(), { content: $(e.contentElement), element: $(e.item) });
                        });
                    }
                };
            };
            TabStrip.OnClose = function (tabstrip, jq) {
                if (tabstrip.jquery) {
                    var key = jq.parents('li[role="tab"]').data('key');
                    //wg($tabstrip.jquery).trigger('tabstrip-removed', key);
                    trigger('tabstrip-removed', key);
                    tabstrip.kendo.remove(jq.parents('li[role="tab"]'));
                    var index = 0;
                    tabstrip.jquery.find('li.k-item').each(function () {
                        if (index < parseInt($(this).attr('data-tabindex'))) {
                            index = parseInt($(this).attr('data-tabindex'));
                        }
                    });
                    tabstrip.activate(tabstrip.jquery.find('li[data-tabindex="' + index + '"]').data('key'));
                }
            };
            TabStrip.index = 0;
            return TabStrip;
        }());
        Helper.TabStrip = TabStrip;
    })(Helper = WizFx.Helper || (WizFx.Helper = {}));
})(WizFx || (WizFx = {}));
//# sourceMappingURL=tabstrip.js.map