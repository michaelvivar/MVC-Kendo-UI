var WizFx;
(function (WizFx) {
    var UI;
    (function (UI) {
        var CascadeFrom = (function () {
            function CascadeFrom(_element) {
                this._element = _element;
            }
            Object.defineProperty(CascadeFrom.prototype, "value", {
                get: function () {
                    if (this._element.jquery) {
                        var $cascadefrom = this._element.jquery.data('cascadefrom');
                        if ($cascadefrom && _.isString($cascadefrom)) {
                            if (/^#/.test($cascadefrom)) {
                                $cascadefrom = $($cascadefrom).first();
                            }
                            else {
                                $cascadefrom = $('#' + $cascadefrom).first();
                            }
                            if ($cascadefrom.length > 0) {
                                var $kendo = ($cascadefrom.wg('kendo') ? $cascadefrom.data($cascadefrom.wg('kendo')) : null);
                                var $value = void 0;
                                if ($kendo) {
                                    $value = $kendo.value();
                                }
                                else {
                                    $value = $cascadefrom.val();
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
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CascadeFrom.prototype, "bind", {
                get: function () {
                    var _this = this;
                    return {
                        change: function (fn) {
                            var $cascadefrom = _this._element.jquery.data('cascadefrom');
                            if ($cascadefrom && _.isString($cascadefrom)) {
                                if (/^#/.test($cascadefrom)) {
                                    $cascadefrom = $($cascadefrom).first();
                                }
                                else {
                                    $cascadefrom = $('#' + $cascadefrom).first();
                                }
                                if ($cascadefrom.length > 0) {
                                    $cascadefrom.bind('cascade', function () {
                                        invoke(fn, _this._element);
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
            return CascadeFrom;
        }());
        UI.CascadeFrom = CascadeFrom;
    })(UI = WizFx.UI || (WizFx.UI = {}));
})(WizFx || (WizFx = {}));
//# sourceMappingURL=cascadefrom.js.map