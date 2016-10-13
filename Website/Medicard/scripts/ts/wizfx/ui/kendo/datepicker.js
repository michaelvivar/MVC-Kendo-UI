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
            var Picker = (function (_super) {
                __extends(Picker, _super);
                function Picker() {
                    _super.apply(this, arguments);
                }
                Picker.prototype.max = function (value) {
                    if (this.jquery && this.jquery.wg('kendo')) {
                        this.kendo.max(value);
                    }
                    return this;
                };
                Picker.prototype.min = function (value) {
                    if (this.jquery && this.jquery.wg('kendo')) {
                        this.kendo.min(value);
                    }
                    return this;
                };
                Picker.prototype.error = function (bool) {
                    if (this.jquery) {
                        if (bool == false) {
                            this.jquery.parents('.k-picker-wrap').first().removeClass(WizFx.WG.config.kendo.error.class);
                        }
                        else {
                            this.jquery.parents('.k-picker-wrap').first().addClass(WizFx.WG.config.kendo.error.class);
                        }
                    }
                    return this;
                };
                return Picker;
            }(Kendo.Base));
            var DatePicker = (function (_super) {
                __extends(DatePicker, _super);
                function DatePicker() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(DatePicker.prototype, "kendo", {
                    get: function () {
                        if (this.jquery && this.jquery.wg('kendo') == WizFx.WG.config.kendo.datepicker) {
                            return this.jquery.data(WizFx.WG.config.kendo.datepicker);
                        }
                        return null;
                    },
                    enumerable: true,
                    configurable: true
                });
                return DatePicker;
            }(Picker));
            Kendo.DatePicker = DatePicker;
            var DatePickerConfig = (function () {
                function DatePickerConfig(jquery, options) {
                    this.jquery = jquery;
                    this.options = options;
                }
                DatePickerConfig.prototype.max = function (date) {
                    this.options.max = date;
                    return this;
                };
                DatePickerConfig.prototype.min = function (date) {
                    this.options.min = date;
                    return this;
                };
                DatePickerConfig.prototype.format = function (str) {
                    this.options.format = str;
                    return this;
                };
                DatePickerConfig.prototype.value = function (val) {
                    this.options.value = val;
                    return this;
                };
                DatePickerConfig.prototype.cascadeFrom = function (id) {
                    if (this.jquery) {
                        this.jquery.data('cascadefrom', id);
                    }
                    return this;
                };
                return DatePickerConfig;
            }());
            Kendo.DatePickerConfig = DatePickerConfig;
            var DateTimePicker = (function (_super) {
                __extends(DateTimePicker, _super);
                function DateTimePicker() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(DateTimePicker.prototype, "kendo", {
                    get: function () {
                        if (this.jquery && this.jquery.wg('kendo') == WizFx.WG.config.kendo.datetimepicker) {
                            return this.jquery.data(WizFx.WG.config.kendo.datetimepicker);
                        }
                        return null;
                    },
                    enumerable: true,
                    configurable: true
                });
                return DateTimePicker;
            }(Picker));
            Kendo.DateTimePicker = DateTimePicker;
            var DateTimePickerConfig = (function () {
                function DateTimePickerConfig(jquery, options) {
                    this.jquery = jquery;
                    this.options = options;
                }
                DateTimePickerConfig.prototype.max = function (date) {
                    this.options.max = date;
                    return this;
                };
                DateTimePickerConfig.prototype.min = function (date) {
                    this.options.min = date;
                    return this;
                };
                DateTimePickerConfig.prototype.format = function (str) {
                    this.options.format = str;
                    return this;
                };
                DateTimePickerConfig.prototype.value = function (val) {
                    this.options.value = val;
                    return this;
                };
                DateTimePickerConfig.prototype.cascadeFrom = function (id) {
                    if (this.jquery) {
                        this.jquery.data('cascadefrom', id);
                    }
                    return this;
                };
                return DateTimePickerConfig;
            }());
            Kendo.DateTimePickerConfig = DateTimePickerConfig;
            var TimePicker = (function (_super) {
                __extends(TimePicker, _super);
                function TimePicker() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(TimePicker.prototype, "kendo", {
                    get: function () {
                        if (this.jquery && this.jquery.wg('kendo') == WizFx.WG.config.kendo.timepicker) {
                            return this.jquery.data(WizFx.WG.config.kendo.timepicker);
                        }
                        return null;
                    },
                    enumerable: true,
                    configurable: true
                });
                return TimePicker;
            }(Picker));
            Kendo.TimePicker = TimePicker;
            var TimePickerConfig = (function () {
                function TimePickerConfig(jquery, options) {
                    this.jquery = jquery;
                    this.options = options;
                }
                TimePickerConfig.prototype.max = function (date) {
                    this.options.max = date;
                    return this;
                };
                TimePickerConfig.prototype.min = function (date) {
                    this.options.min = date;
                    return this;
                };
                TimePickerConfig.prototype.format = function (str) {
                    this.options.format = str;
                    return this;
                };
                TimePickerConfig.prototype.value = function (val) {
                    this.options.value = val;
                    return this;
                };
                TimePickerConfig.prototype.interval = function (minutes) {
                    this.options.interval = minutes;
                    return this;
                };
                TimePickerConfig.prototype.cascadeFrom = function (id) {
                    if (this.jquery) {
                        this.jquery.data('cascadefrom', id);
                    }
                    return this;
                };
                return TimePickerConfig;
            }());
            Kendo.TimePickerConfig = TimePickerConfig;
        })(Kendo = UI.Kendo || (UI.Kendo = {}));
    })(UI = WizFx.UI || (WizFx.UI = {}));
})(WizFx || (WizFx = {}));
//# sourceMappingURL=datepicker.js.map