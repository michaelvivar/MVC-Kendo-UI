var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var WizFx;
(function (WizFx) {
    //Status
    Object.defineProperty(window, 'Status', {
        get: function () {
            return {
                success: 'Success',
                failed: 'Failed',
                warning: 'Warning',
                serverException: 'ServerException'
            };
        }
    });
    //Color
    Object.defineProperty(window, 'Color', {
        get: function () {
            return {
                green: '#4cae4c',
                blue: '#5bc0de',
                orange: '#eea236',
                red: '#d9534f',
                violet: 'violet'
            };
        }
    });
    //Browser
    Object.defineProperty(window, 'Browser', {
        get: function () {
            return {
                ie: 'ie',
                firefox: 'firefox',
                chrome: 'webkit'
            };
        }
    });
    //Bootstrap Buttons
    Object.defineProperty(window, 'Button', {
        get: function () {
            return {
                default: 'btn btn-default',
                primary: 'btn btn-primary',
                success: 'btn btn-success',
                info: 'btn btn-info',
                warning: 'btn btn-warning',
                danger: 'btn btn-danger',
            };
        }
    });
    function wg(arg) {
        return Main.getInstance(arg);
    }
    WizFx.wg = wg;
    function configure(jquery, config, defaults, func, options) {
        if (_.isFunction(func)) {
            options = $.extend(defaults, options);
            config = new config(jquery, options);
            invoke(func, config);
            return config.options;
        }
        else {
            return $.extend(defaults, options, func);
        }
    }
    var __config;
    var __window;
    var __iframe;
    var __http;
    var __bind;
    var __tab;
    var __notification;
    var __modal;
    var Main = (function () {
        function Main(context) {
            this.context = context;
            if (!(this instanceof Main)) {
                return;
            }
            if (Main._instance) {
                throw new Error("Use WG.getInstance()");
            }
            Main._instance = this;
        }
        Main.getInstance = function (arg) {
            Main._instance.context = arg;
            return Main._instance;
        };
        Main.prototype.initUI = function (callback, options) {
            var jquery = (this.context instanceof jQuery) ? this.context : $(this.context);
            var $options = $.extend({
                container: this.context
            }, options);
            _.each(jquery.find('input[data-wg-ui], select[data-wg-ui], div[data-wg-ui="' + WG.config.kendo.grid + '"], ul[data-wg-ui="' + WG.config.kendo.accordion + '"], ul[data-wg-ui="' + WG.config.kendo.contextmenu + '"]'), function (element) {
                if (parseBoolean($(element).data('init-ui')) == true) {
                    switch ($(element).wg('ui')) {
                        case WG.config.kendo.textbox:
                            wg(element).textbox($options);
                            break;
                        case WG.config.kendo.combobox:
                            wg(element).combobox($options);
                            break;
                        case WG.config.kendo.multiselect:
                            wg(element).multiselect($options);
                            break;
                        case WG.config.kendo.datepicker:
                            wg(element).datepicker($options);
                            break;
                        case WG.config.kendo.datetimepicker:
                            wg(element).datetimepicker($options);
                            break;
                        case WG.config.kendo.timepicker:
                            wg(element).timepicker($options);
                            break;
                        case WG.config.kendo.numerictextbox:
                            wg(element).numerictextbox($options);
                            break;
                        case WG.config.kendo.maskedtextbox:
                            wg(element).maskedtextbox($options);
                            break;
                        case WG.config.kendo.contextmenu:
                            wg(element).contextmenu($options);
                            break;
                        case WG.config.kendo.upload:
                            wg(element).fileupload($options);
                            break;
                        case WG.config.kendo.accordion:
                            wg(element).accordion($options);
                            break;
                        case WG.config.kendo.tabstrip:
                            wg(element).tabstrip($options);
                            break;
                        case WG.config.kendo.grid:
                            wg(element).grid($options);
                            break;
                        case WG.config.bootstrap.duallistbox:
                            wg(element).duallistbox($options);
                            break;
                    }
                }
            });
            invoke(callback);
        };
        Main.prototype.textbox = function (func, options) {
            var $textbox = new WizFx.UI.Kendo.Textbox(this.context);
            if ($textbox.jquery) {
                if ($textbox.jquery.wg('kendo')) {
                    return $textbox;
                }
                var $filter_1 = {};
                var $default = {
                    minLength: 255,
                    maxLength: 255,
                    container: $('body'),
                    filter: 'contains',
                    serverFiltering: false,
                    suggest: false
                };
                options = $.extend({
                    maxLength: $textbox.jquery.data('maxlength') || $textbox.jquery.attr('maxlength'),
                    container: $textbox.jquery.parents('[data-container]').first(),
                    serverFiltering: $textbox.jquery.data('serverfiltering'),
                    dataSource: $textbox.jquery.url()
                }, options);
                var $options_1 = configure($textbox.jquery, WizFx.UI.Kendo.TextBoxConfig, $default, func, options);
                $textbox.container = $options_1.container;
                $options_1.change = function (e) {
                    $textbox.error(false);
                    $textbox.jquery.trigger('cascade');
                };
                if (_.isString($options_1.dataSource)) {
                    $options_1.dataSource = {
                        type: 'aspnetmvc-ajax',
                        transport: {
                            read: {
                                url: $options_1.dataSource,
                                type: "POST",
                                dataType: "json",
                                data: function () {
                                    return $filter_1;
                                }
                            }
                        }
                    };
                }
                else {
                    $options_1.serverFiltering = false;
                }
                if (parseBoolean($options_1.serverFiltering)) {
                    $options_1.filtering = function (e) {
                        $filter_1 = e.filter;
                    };
                }
                if ($options_1.dataSource) {
                    $options_1.minLength = 1;
                }
                $textbox.jquery.kendoAutoComplete($options_1);
                $textbox.jquery.wg('kendo', WG.config.kendo.textbox);
                $textbox.jquery.attr('data-wg-ui', WG.config.kendo.textbox);
                $textbox.kendo.element.attr('maxlength', $options_1.maxLength);
                if (parseBoolean($textbox.jquery.data('readonly'))) {
                    $textbox.readonly();
                }
                if (parseBoolean($options_1.serverFiltering)) {
                    $textbox.kendo.bind('filtering', _.debounce(function () {
                        if ($textbox.value.length > ($options_1.minLength - 1)) {
                            $textbox.read();
                        }
                    }, 600));
                }
            }
            return $textbox;
        };
        Main.prototype.combobox = function (func, options) {
            var $combobox = new WizFx.UI.Kendo.ComboBox(this.context);
            if ($combobox.jquery) {
                if ($combobox.jquery.wg('kendo')) {
                    return $combobox;
                }
                var $default = {
                    index: -1,
                    dataTextField: 'Text',
                    dataValueField: 'Value',
                    dataSource: [],
                    autoBind: false,
                    filter: 'contains',
                    maxLength: 255,
                    container: $('body'),
                    placeholder: 'Select a Record'
                };
                options = $.extend({
                    autoBind: parseBoolean($combobox.jquery.data('autobind')),
                    dataSource: $combobox.jquery.url(),
                    maxLength: $combobox.jquery.data('maxlength') || $combobox.jquery.attr('maxlength'),
                    container: $combobox.jquery.parents('[data-container]').first(),
                    value: $combobox.jquery.val()
                }, options);
                var $options = configure($combobox.jquery, WizFx.UI.Kendo.ComboBoxConfig, $default, func, options);
                $combobox.container = $options.container;
                if ($options.value == Guid.empty()) {
                    $combobox.value = '';
                    $options.value = undefined;
                }
                if (parseBoolean($options.autoBind) == false) {
                    if (!_.isEmpty($options.value)) {
                        $options.autoBind = true;
                    }
                }
                if (_.isString($options.dataSource)) {
                    $options.dataSource = {
                        type: 'aspnetmvc-ajax',
                        transport: {
                            read: {
                                url: $options.dataSource,
                                type: "POST",
                                dataType: "json",
                                data: function () {
                                    var param = {};
                                    $combobox.container.find('[data-param]').each(function () {
                                        param[$(this).data('param')] = $(this).data('val') || $(this).val();
                                    });
                                    return {
                                        args: param
                                    };
                                }
                            },
                            parameterMap: function (options) {
                                return {
                                    cascadeFromValue: $combobox.cascadefrom.value,
                                    args: options.args
                                };
                            }
                        }
                    };
                }
                $options.change = function (e) {
                    var $text = $combobox.text;
                    var $list = _.filter($combobox.data, function (item) {
                        return item.Text == $text;
                    });
                    if (!($list.length > 0)) {
                        $combobox.reset();
                    }
                    $combobox.error(false);
                    $combobox.jquery.trigger('cascade');
                };
                $combobox.jquery.kendoComboBox($options);
                $combobox.jquery.wg('kendo', WG.config.kendo.combobox);
                $combobox.jquery.attr('data-wg-ui', WG.config.kendo.combobox);
                $combobox.kendo.input.attr('maxlength', $options.maxLength);
                if (parseBoolean($combobox.jquery.data('readonly'))) {
                    $combobox.readonly();
                }
                _.delay(function () {
                    $combobox.cascadefrom.bind.change(function () {
                        $combobox.reset().read();
                    });
                }, 1000);
            }
            return $combobox;
        };
        Main.prototype.multiselect = function (func, options) {
            var $multiselect = new WizFx.UI.Kendo.MultiSelect(this.context);
            if ($multiselect.jquery) {
                if ($multiselect.jquery.wg('kendo')) {
                    return $multiselect;
                }
                var $default = {
                    dataTextField: 'Text',
                    dataValueField: 'Value',
                    autoBind: false,
                    maxLength: 255,
                    serverFiltering: false,
                    container: $('body')
                };
                options = $.extend({
                    maxLength: $multiselect.jquery.data('maxlength') || $multiselect.jquery.attr('maxlength'),
                    serverFiltering: parseBoolean($multiselect.jquery.data('serverfiltering')),
                    container: $multiselect.jquery.parents('[data="container"]').first(),
                    value: $multiselect.jquery.val(),
                    dataSource: $multiselect.jquery.url(),
                    autoBind: parseBoolean($multiselect.jquery.data('autobind'))
                }, options);
                var $options = configure($multiselect.jquery, WizFx.UI.Kendo.MultiSelectConfig, $default, func, options);
                $multiselect.container = $options.container;
                if ($options.value == Guid.empty()) {
                    $multiselect.value = '';
                    $options.value = undefined;
                }
                if (parseBoolean($options.autoBind) == false) {
                    if (!_.isEmpty($options.value)) {
                        $options.autoBind = true;
                    }
                }
                if (_.isString($options.dataSource)) {
                    $options.dataSource = {
                        type: 'aspnetmvc-ajax',
                        transport: {
                            read: {
                                url: $options.dataSource,
                                type: "POST",
                                dataType: "json",
                                data: function () {
                                    var param = {};
                                    $multiselect.container.find('[data-param]').each(function () {
                                        param[$(this).data('param')] = $(this).data('val') || $(this).val();
                                    });
                                    return {
                                        args: param
                                    };
                                }
                            },
                            parameterMap: function (options) {
                                return {
                                    cascadeFromValue: $multiselect.cascadefrom.value,
                                    args: options.args
                                };
                            }
                        }
                    };
                }
                $options.change = function (e) {
                    $multiselect.error(false);
                    $multiselect.jquery.trigger('cascade');
                };
                $multiselect.jquery.kendoMultiSelect($options);
                $multiselect.jquery.wg('kendo', WG.config.kendo.multiselect);
                $multiselect.jquery.attr('data-wg-ui', WG.config.kendo.multiselect);
                $multiselect.kendo.input.attr('maxlength', $options.maxLength);
                if (parseBoolean($multiselect.jquery.data('readonly'))) {
                    $multiselect.readonly();
                }
                _.delay(function () {
                    $multiselect.cascadefrom.bind.change(function () {
                        $multiselect.reset().read();
                    });
                }, 1000);
            }
            return $multiselect;
        };
        Main.prototype.datepicker = function (func, options) {
            var $datepicker = new WizFx.UI.Kendo.DatePicker(this.context);
            if ($datepicker.jquery) {
                if ($datepicker.jquery.wg('kendo')) {
                    return $datepicker;
                }
                var $default = {
                    animation: false,
                    maxLength: 255,
                    container: $('body'),
                    format: 'MM/dd/yyyy',
                    parseFormats: ['MM/dd/yy']
                };
                options = $.extend({
                    format: $datepicker.jquery.data('format'),
                    parseFormats: $datepicker.jquery.data('parseformats'),
                    maxLength: $datepicker.jquery.data('maxlength'),
                    container: $datepicker.jquery.parents('[data-container]').first()
                }, options);
                var $options = configure($datepicker.jquery, WizFx.UI.Kendo.DatePickerConfig, $default, func, options);
                $datepicker.container = $options.container;
                $options.change = function (e) {
                    $datepicker.error(false);
                    $datepicker.jquery.trigger('cascade');
                };
                $datepicker.jquery.kendoDatePicker($options);
                $datepicker.jquery.wg('kendo', WG.config.kendo.datepicker);
                $datepicker.jquery.attr('data-wg-ui', WG.config.kendo.datepicker);
                if (parseBoolean($datepicker.jquery.data('readonly'))) {
                    $datepicker.readonly();
                }
                $datepicker.jquery.on('blur', function (e) {
                    if (_.isNull($datepicker.value)) {
                        $datepicker.value = '';
                        $('[data-cascadefrom="' + $datepicker.jquery.attr('id') + '"]').each(function () {
                            if ($(this).wg('kendo')) {
                                wg(this).datepicker().min(new Date(1900, 1, 1)).value = '';
                            }
                        });
                    }
                });
                _.delay(function () {
                    $datepicker.cascadefrom.bind.change(function () {
                        var $value = $datepicker.cascadefrom.value;
                        if (_.isDate($value)) {
                            $datepicker.min(new Date(($value.getFullYear()), $value.getMonth(), $value.getDate() + 1));
                            if ($value >= $datepicker.value) {
                                $datepicker.value = '';
                            }
                        }
                    });
                    if ($datepicker.cascadefrom.value && _.isDate($datepicker.cascadefrom.value)) {
                        $datepicker.min($datepicker.cascadefrom.value);
                    }
                }, 1000);
            }
            return $datepicker;
        };
        Main.prototype.datetimepicker = function (func, options) {
            var $datetimepicker = new WizFx.UI.Kendo.DateTimePicker(this.context);
            if ($datetimepicker.jquery) {
                if ($datetimepicker.jquery.wg('kendo')) {
                    return $datetimepicker;
                }
                var $default = {
                    animation: false,
                    maxLength: 255,
                    format: 'MM/dd/yyyy HH:mm',
                    parseFormats: ['MM/dd/yy HH:mm'],
                    container: $('body')
                };
                options = $.extend({
                    format: $datetimepicker.jquery.data('format'),
                    parseFormats: $datetimepicker.jquery.data('parseformats'),
                    maxLength: $datetimepicker.jquery.data('maxlength'),
                    container: $datetimepicker.jquery.parents('[data-container]').first()
                }, options);
                var $options = configure($datetimepicker.jquery, WizFx.UI.Kendo.DateTimePickerConfig, $default, func, options);
                $datetimepicker.container = $options.container;
                $options.change = function (e) {
                    $datetimepicker.error(false);
                    $datetimepicker.jquery.trigger('cascade');
                };
                $datetimepicker.jquery.kendoDateTimePicker($options);
                $datetimepicker.jquery.wg('kendo', WG.config.kendo.datetimepicker);
                $datetimepicker.jquery.attr('data-wg-ui', WG.config.kendo.datetimepicker);
                if (parseBoolean($datetimepicker.jquery.data('readonly'))) {
                    $datetimepicker.readonly();
                }
                $datetimepicker.jquery.on('blur', function (e) {
                    if (_.isNull($datetimepicker.value)) {
                        $datetimepicker.value = '';
                        $('input[data-cascadefrom="' + $datetimepicker.jquery.attr('id') + '"]').each(function () {
                            wg(this).datetimepicker().min(new Date(1900, 1, 1)).value = '';
                        });
                    }
                });
                _.delay(function () {
                    $datetimepicker.cascadefrom.bind.change(function () {
                        var $value = $datetimepicker.cascadefrom.value;
                        if (_.isDate($value)) {
                            $datetimepicker.min(new Date($value.getFullYear(), $value.getMonth(), $value.getDate() + 1));
                            if ($value >= $datetimepicker.value) {
                                $datetimepicker.value = '';
                            }
                        }
                    });
                    if ($datetimepicker.cascadefrom.value && _.isDate($datetimepicker.cascadefrom.value)) {
                        $datetimepicker.min($datetimepicker.cascadefrom.value);
                    }
                }, 1000);
            }
            return $datetimepicker;
        };
        Main.prototype.timepicker = function (func, options) {
            var $timepicker = new WizFx.UI.Kendo.TimePicker(this.context);
            if ($timepicker.jquery) {
                if ($timepicker.jquery.wg('kendo')) {
                    return $timepicker;
                }
                var $default = {
                    animation: false,
                    format: 'hh:mm tt',
                    interval: 60,
                    maxLength: 255,
                    container: $('body')
                };
                options = $.extend({
                    maxLength: $timepicker.jquery.data('maxlength'),
                    interval: $timepicker.jquery.data('interval'),
                    format: $timepicker.jquery.data('format'),
                    container: $timepicker.jquery.parents('[data-container]').first()
                }, options);
                var $options_2 = configure($timepicker.jquery, WizFx.UI.Kendo.TimePickerConfig, $default, func, options);
                $timepicker.container = $options_2.container;
                $options_2.change = function (e) {
                    $timepicker.error(false);
                    $timepicker.jquery.trigger('cascade');
                };
                $timepicker.jquery.kendoTimePicker($options_2);
                $timepicker.jquery.wg('kendo', WG.config.kendo.timepicker);
                $timepicker.jquery.attr('data-wg-ui', WG.config.kendo.timepicker);
                if (parseBoolean($timepicker.jquery.data('readonly'))) {
                    $timepicker.readonly();
                }
                $timepicker.jquery.on('blur', function (e) {
                    if (_.isNull($timepicker.value)) {
                        $timepicker.value = '';
                        $('input[data-cascadefrom="' + $timepicker.jquery.attr('id') + '"]').each(function () {
                            wg(this).timepicker().min(new Date(2000, 0, 1, 0, 0, 0)).value = '';
                        });
                    }
                });
                _.delay(function () {
                    $timepicker.cascadefrom.bind.change(function () {
                        var $value = $timepicker.cascadefrom.value;
                        if (_.isDate($value)) {
                            var $fromDate = new Date($value);
                            if (!_.isNull($fromDate)) {
                                var $toDate = new Date($timepicker.value);
                                if ($options_2.interval > 59) {
                                    $value.setHours($value.getHours() + 1);
                                }
                                else {
                                    $value.setMinutes($value.getMinutes() + $options_2.interval);
                                }
                                $timepicker.min($value);
                                if (parseInt(($fromDate.getHours() * 60 + $fromDate.getMinutes())) >= $toDate.getHours() * 60 + $toDate.getMinutes()) {
                                    $timepicker.value = '';
                                }
                            }
                        }
                    });
                    if ($timepicker.cascadefrom.value && _.isDate($timepicker.cascadefrom.value)) {
                        $timepicker.min($timepicker.cascadefrom.value);
                    }
                }, 1000);
            }
            return $timepicker;
        };
        Main.prototype.numerictextbox = function (func, options) {
            var $numerictextbox = new WizFx.UI.Kendo.NumericTextBox(this.context);
            if ($numerictextbox.jquery) {
                if ($numerictextbox.jquery.wg('kendo')) {
                    return $numerictextbox;
                }
                var $default = {
                    format: '#,###',
                    spinners: true,
                    min: 0,
                    decimals: 2,
                    container: $('body')
                };
                options = $.extend({
                    format: $numerictextbox.jquery.data('format'),
                    spinners: parseBoolean($numerictextbox.jquery.data('spinner')),
                    min: $numerictextbox.jquery.data('min'),
                    max: $numerictextbox.jquery.data('max'),
                    decimals: $numerictextbox.jquery.data('decimals'),
                    container: $numerictextbox.jquery.parents('[data-container]').first()
                }, options);
                var $options_3 = configure($numerictextbox.jquery, WizFx.UI.Kendo.NumericTextBoxConfig, $default, func, options);
                $numerictextbox.container = $options_3.container;
                if ($options_3.decimals > 0) {
                    $options_3.format = $options_3.format + '.';
                    _.times($options_3.decimals, function () {
                        $options_3.format = $options_3.format + '0';
                    });
                }
                $options_3.change = function (e) {
                    $numerictextbox.error(false);
                    $numerictextbox.jquery.trigger('cascade');
                };
                $numerictextbox.jquery.kendoNumericTextBox($options_3);
                $numerictextbox.jquery.wg('kendo', WG.config.kendo.numerictextbox);
                $numerictextbox.jquery.attr('data-wg-ui', WG.config.kendo.numerictextbox);
                if (parseBoolean($numerictextbox.jquery.data('readonly'))) {
                    $numerictextbox.readonly();
                }
                _.delay(function () {
                    $numerictextbox.cascadefrom.bind.change(function () {
                        if ($numerictextbox.cascadefrom.value) {
                            $numerictextbox.min($numerictextbox.cascadefrom.value + 1);
                            if ($numerictextbox.value <= $numerictextbox.cascadefrom.value) {
                                $numerictextbox.value = '';
                            }
                        }
                    });
                    if ($numerictextbox.cascadefrom.value) {
                        $numerictextbox.min($numerictextbox.cascadefrom.value + 1);
                    }
                }, 1000);
            }
            return $numerictextbox;
        };
        Main.prototype.maskedtextbox = function (func, options) {
            var $maskedtextbox = new WizFx.UI.Kendo.MaskedTextBox(this.context);
            if ($maskedtextbox.jquery) {
                if ($maskedtextbox.jquery.wg('kendo')) {
                    return $maskedtextbox;
                }
                var $default = {
                    container: $('body'),
                    promptChar: ' '
                };
                options = $.extend({
                    mask: $maskedtextbox.jquery.data('mask'),
                    container: $maskedtextbox.jquery.parents('[data-container]').first()
                }, options);
                var $options = configure($maskedtextbox.jquery, WizFx.UI.Kendo.MaskedTextBoxConfig, $default, func, options);
                $maskedtextbox.container = $options.container;
                $options.change = function (e) {
                    $maskedtextbox.error(false);
                    $maskedtextbox.jquery.trigger('cascade');
                };
                $maskedtextbox.jquery.kendoMaskedTextBox($options);
                $maskedtextbox.jquery.wg('kendo', WG.config.kendo.maskedtextbox);
                $maskedtextbox.jquery.attr('data-wg-ui', WG.config.kendo.maskedtextbox);
                if (parseBoolean($maskedtextbox.jquery.data('readonly'))) {
                    $maskedtextbox.readonly();
                }
            }
            return $maskedtextbox;
        };
        Main.prototype.contextmenu = function (func, options) {
            var $contextmenu = new WizFx.UI.Kendo.ContextMenu(this.context);
            if ($contextmenu.jquery) {
                if ($contextmenu.jquery.wg('kendo')) {
                    return $contextmenu;
                }
                var $default = {
                    showOn: 'null',
                    animation: false,
                    target: 'body'
                };
                options = $.extend({
                    target: $contextmenu.jquery.data('target'),
                    animation: parseBoolean($contextmenu.jquery.data('animation')),
                    showOn: $contextmenu.jquery.data('showon')
                }, options);
                var $options = configure($contextmenu.jquery, WizFx.UI.Kendo.ContextMenuConfig, $default, func, options);
                $contextmenu.jquery.kendoContextMenu($options);
                $contextmenu.jquery.wg('kendo', WG.config.kendo.contextmenu);
                $contextmenu.jquery.attr('data-wg-ui', WG.config.kendo.contextmenu);
            }
            return $contextmenu;
        };
        Main.prototype.fileupload = function (func, options) {
            var $upload = new WizFx.UI.Kendo.Upload(this.context);
            if ($upload.jquery) {
                if ($upload.jquery.wg('kendo')) {
                    return $upload;
                }
                var $default = {
                    async: {}
                };
                options = options || {};
                options.async || options.async || $default.async;
                options.async = $.extend({
                    batch: parseBoolean($upload.jquery.data('batchupload')) || false,
                    autoUpload: parseBoolean($upload.jquery.data('autoupload')) || true,
                    saveUrl: $upload.jquery.data('saveurl') || WG.config.file.url.upload,
                    removeUrl: $upload.jquery.data('removeurl') || WG.config.file.url.remove
                }, options.async);
                var $options = configure($upload.jquery, WizFx.UI.Kendo.UploadConfig, $default, func, options);
                $options.success = function (e) {
                    //$upload.jquery.trigger('success', e.files);
                };
                $options.remove = function (e) {
                    //$upload.jquery.trigger('remove', e.files);
                    WG.iframe.resize();
                };
                $options.upload = function (e) {
                    //$upload.jquery.trigger('upload', e.files);
                };
                $options.select = function (e) {
                    e.sender.element.attr('value', e.files[0].name);
                    //$upload.jquery.trigger('select', e.files);
                    $upload.error(false);
                    WG.iframe.resize();
                };
                $options.complete = function (e) {
                };
                $options.error = function (e) {
                    //$upload.jquery.trigger('select', e.files);
                };
                $upload.jquery.kendoUpload($options);
                $upload.jquery.wg('kendo', WG.config.kendo.upload);
                $upload.jquery.attr('data-wg-ui', WG.config.kendo.upload);
                $upload.jquery.attr('data-wg-type', 'file');
            }
            return $upload;
        };
        Main.prototype.accordion = function (func, options) {
            var $accordion = new WizFx.UI.Kendo.Accordion(this.context);
            if ($accordion.jquery) {
                if ($accordion.jquery.wg('kendo')) {
                    return $accordion;
                }
                var $default = {
                    animation: false,
                    expandMode: 'multiple'
                };
                options = $.extend({
                    animation: parseBoolean($accordion.jquery.data('animation')),
                    expandMode: $accordion.jquery.data('expandmode')
                }, options);
                var $options_4 = configure($accordion.jquery, WizFx.UI.Kendo.AccordionConfig, $default, func, options);
                if ($options_4.items && $options_4.items.length > 0) {
                    $options_4.dataSource = $options_4.items;
                }
                if (!$options_4.dataSource) {
                    $options_4.dataSource = [];
                    $accordion.jquery.find('li').each(function () {
                        $options_4.dataSource.push({
                            text: $(this).data('title') || $(this).text(),
                            expanded: parseBoolean($(this).data('expanded')),
                            contentUrl: $(this).url()
                        });
                    });
                }
                $options_4.collapse = function (e) {
                    _.delay(function () {
                        WG.iframe.resize();
                        $accordion.jquery.trigger(($(e.item).find('.k-header').first().text() + '-collapse').trimEventName(), e.item);
                    }, 500);
                };
                $options_4.expand = function (e) {
                    _.delay(function () {
                        WG.iframe.resize();
                        $accordion.jquery.trigger(($(e.item).find('.k-header').first().text() + '-expand').trimEventName(), e.item);
                    }, 500);
                };
                $options_4.contentLoad = function (e) {
                    wg(e.item).initUI(function () {
                        WG.iframe.resize();
                        $accordion.jquery.trigger(($(e.item).find('.k-header').first().text() + '-load').trimEventName(), e.item);
                    });
                };
                $accordion.jquery.kendoPanelBar($options_4);
                $accordion.jquery.wg('kendo', WG.config.kendo.accordion);
                $accordion.jquery.attr('data-wg-ui', WG.config.kendo.accordion);
                $accordion.kendo.expand($accordion.jquery.find('li[data-expanded="true"]'), false);
            }
            return $accordion;
        };
        Main.prototype.tabstrip = function (func, options) {
            var $tabstrip = new WizFx.UI.Kendo.TabStrip(this.context);
            if ($tabstrip.jquery) {
                if ($tabstrip.jquery.wg('kendo')) {
                    return $tabstrip;
                }
                var $default = {
                    animation: false,
                    tabPosition: 'top'
                };
                options = $.extend({
                    animation: parseBoolean($tabstrip.jquery.data('animation')),
                    tabPosition: $tabstrip.jquery.data('position')
                }, options);
                var $options = configure($tabstrip.jquery, WizFx.UI.Kendo.TabStripConfig, $default, func, options);
                $options.contentLoad = WizFx.Helper.TabStrip.ContentLoad($tabstrip);
                $options.activate = function (e) {
                    $(e.item).data('tabindex', WizFx.Helper.TabStrip.index).attr('data-tabindex', WizFx.Helper.TabStrip.index++);
                    WG.iframe.resize();
                };
                $tabstrip.jquery.kendoTabStrip($options);
                $tabstrip.jquery.wg('kendo', WG.config.kendo.tabstrip);
                $tabstrip.jquery.attr('data-wg-ui', WG.config.kendo.tabstrip);
                $tabstrip.jquery.on('click', '.ui-icon-close', function (e) {
                    WizFx.Helper.TabStrip.OnClose($tabstrip, $(this));
                });
            }
            return $tabstrip;
        };
        Main.prototype.grid = function (func, options) {
            var $grid = new WizFx.UI.Kendo.Grid(this.context);
            if ($grid.jquery) {
                if ($grid.jquery.wg('kendo')) {
                    return $grid;
                }
                var $default = {
                    height: 272,
                    filterable: true,
                    reorderable: true,
                    resizable: true,
                    groupable: true,
                    columnMenu: true,
                    selectable: true,
                    sortable: {
                        mode: 'single',
                        allowUnsort: false
                    },
                    resize: true,
                    serverFiltering: true,
                    container: $('body')
                };
                options = $.extend({
                    pageable: {
                        pageSize: $grid.jquery.data('pagesize') || 10,
                        pageSizes: [10, 20, 30, 40, 50],
                        refresh: true
                    },
                    height: $grid.jquery.data('height'),
                    dataSource: $grid.jquery.url(),
                    name: $grid.jquery.data('grid')
                }, options);
                var $options_5 = configure($grid.jquery, WizFx.UI.Kendo.GridConfig, $default, func, options);
                $grid.container = $options_5.container;
                if (_.isString($options_5.dataSource)) {
                    var $url = $options_5.dataSource;
                    $options_5.dataSource = $.extend({
                        type: 'aspnetmvc-ajax',
                        schema: { data: "Data", total: "Total", title: "Title" },
                        serverPaging: true,
                        serverSorting: true,
                        serverFiltering: true,
                        pageSize: 10,
                        parameterMap: function (options) {
                            return JSON.stringify(options);
                        },
                        transport: {
                            read: {
                                url: $url
                            }
                        }
                    }, {
                        serverPaging: parseBoolean($grid.jquery.data('serverpaging')),
                        serverSorting: parseBoolean($grid.jquery.data('serverpaging')),
                        serverFiltering: parseBoolean($grid.jquery.data('serverpaging')),
                        pageSize: $grid.jquery.data('pagesize'),
                        transport: {
                            read: {
                                url: $url,
                                type: "POST",
                                dataType: "json",
                                data: function () {
                                    var param = {};
                                    $grid.jquery.parent('div[data-container="grid"]').find('[data-param]').each(function () {
                                        param[$(this).data('param')] = $(this).data('val') || $(this).val();
                                    });
                                    if (!_.isUndefined($grid.jquery.data('parent'))) {
                                        param['Parent'] = $grid.jquery.data('parent');
                                    }
                                    return {
                                        args: param
                                    };
                                }
                            }
                        }
                    });
                }
                if (!$options_5.name) {
                    $options_5.name = $grid.jquery.attr('id');
                }
                $grid.jquery.data('grid', $options_5.name).wg('kendo', WG.config.kendo.grid);
                $grid.jquery.attr('data-wg-ui', WG.config.kendo.grid);
                if (!$options_5.columns) {
                    $grid.jquery.next('div[data-container="buttons"]').first().addClass('hide');
                    if ($grid.name && _.isString($grid.name)) {
                        if (WG.config.kendo.gridcolumnsetting == 'DB') {
                            // Grid Setting from DB
                            WG.http.get('', {
                                gridname: $grid.name
                            }).then(function (data) {
                                $options_5.columns = data;
                                $options_5.dataBound = WizFx.Helper.Grid.OnDataBound($grid);
                                $options_5.dataSource.requestEnd = WizFx.Helper.Grid.RequestEnd($grid);
                                $grid.jquery.kendoGrid($options_5);
                                $grid.jquery.next('div[data-container="buttons"]').first().removeClass('hide');
                            });
                        }
                        else {
                            // Grid Setting from JSON File
                            var $gridsetting = WG.config.kendo.folder.gridsetting + '/' + $grid.name.toLowerCase() + '.setting.json';
                            WG.http.json(WG.url($gridsetting))
                                .then(function (result) {
                                $options_5.columns = [];
                                $.each(result, function (i, column) {
                                    if (column.locked && _.isNaN(parseInt(column.width))) {
                                        column.width = 200;
                                    }
                                    $options_5.columns.push($.extend({
                                        locked: false,
                                        lockable: false,
                                        sortable: true,
                                        filterable: true,
                                        groupable: true,
                                        menu: true
                                    }, column));
                                });
                                $options_5.columns = WizFx.Helper.Grid.Columns($options_5.columns);
                                $options_5.dataBound = WizFx.Helper.Grid.OnDataBound($grid);
                                $options_5.dataSource.requestEnd = WizFx.Helper.Grid.RequestEnd($grid);
                                $grid.jquery.kendoGrid($options_5);
                                $grid.jquery.next('div[data-container="buttons"]').first().removeClass('hide');
                            });
                        }
                    }
                }
                else {
                    $options_5.dataBound = WizFx.Helper.Grid.OnDataBound($grid);
                    $options_5.dataSource.requestEnd = WizFx.Helper.Grid.RequestEnd($grid);
                    $grid.jquery.kendoGrid($options_5);
                }
            }
            return $grid;
        };
        Main.prototype.duallistbox = function (func, options) {
            var _this = this;
            var $duallistbox = new WizFx.UI.Bootstrap.DualListBox(this.context);
            if ($duallistbox.jquery) {
                if ($duallistbox.jquery.wg('bootstrap')) {
                    return $duallistbox;
                }
                var $default = {
                    height: 200,
                    timeout: 100,
                    container: $('body'),
                    dataSource: null,
                    filterable: true,
                    left: {
                        title: 'Record(s) to be assigned'
                    },
                    right: {
                        title: 'Assigned record(s)'
                    }
                };
                var $filter = { value: '' };
                options = $.extend({
                    id: $duallistbox.jquery.attr('id') || $duallistbox.jquery.attr('name'),
                    dataSource: $duallistbox.jquery.url(),
                    height: $duallistbox.jquery.data('height'),
                    container: $duallistbox.jquery.parents('[data-container]').first()
                }, options);
                var $options_6 = configure($duallistbox.jquery, WizFx.UI.Bootstrap.DualListBoxConfig, $default, func, options);
                $duallistbox.container = $options_6.container;
                var $left = $('<select></select>');
                var $right = $duallistbox.jquery;
                var $container = $('<div></div>', {
                    'data-wg': 'dualListBox',
                    'class': 'row'
                });
                $left.addClass('left-box').css({
                    'height': $options_6.height + 'px',
                    'width': '100%'
                }).attr({ 'multiple': '' });
                $right.addClass('right-box').css({
                    'height': $options_6.height + 'px',
                    'width': '100%'
                }).attr({ 'multiple': '', 'id': $options_6.id, 'name': $options_6.id });
                WizFx.Helper.DualListBox.RenderHtml($container, $left, $right, $options_6);
                if (!$options_6.dataSource) {
                    $options_6.dataSource = $right.url();
                }
                if (_.isString($options_6.dataSource)) {
                    $options_6.dataSource = {
                        type: 'aspnetmvc-ajax',
                        transport: {
                            read: {
                                url: $options_6.dataSource,
                                type: 'POST',
                                dataType: 'json'
                            },
                            parameterMap: function () {
                                var values = [];
                                $right.find('option').each(function () {
                                    values.push($(this).attr('value'));
                                });
                                return {
                                    selected: values,
                                    cascadeFromValue: $duallistbox.cascadefrom.value
                                };
                            }
                        }
                    };
                }
                $options_6.dataSource = WG.dataSource($options_6.dataSource);
                if (!_.isNull($options_6.dataSource)) {
                    $options_6.dataSource.fetch(function () {
                        WizFx.Helper.DualListBox.BindData($options_6.dataSource.data(), $container, $left, $right);
                    });
                    $duallistbox.jquery.data('source', $options_6.dataSource);
                }
                $container.find('button[data-action]').click(function (e) {
                    e.preventDefault();
                    $duallistbox.move($(this).data('action'));
                    // TODO: Error Field $duallistbox.error(false);
                });
                $container.on('change', 'select', function () {
                    if ($(this).hasClass('right-box')) {
                        $container.find('button[data-action="3"]').prop('disabled', false);
                    }
                    else {
                        $container.find('button[data-action="2"]').prop('disabled', false);
                    }
                });
                $right.filterByText($container.find('.filter-selected').first(), $options_6.timeout).scrollTop(0).sortOptions();
                $left.filterByText($container.find('.filter-unselected').first(), $options_6.timeout).scrollTop(0).sortOptions();
                $container.find('.clear-filter').click(function () {
                    $(_this).parents('.input-group').find('input').first().val('').trigger('change');
                });
                $duallistbox.jquery.wg('bootstrap', true);
                $duallistbox.jquery.attr('data-wg-ui', WG.config.bootstrap.duallistbox);
                $duallistbox.bind.move(function (box) {
                    WizFx.Helper.DualListBox.ToggleButtons($container, $left, $right);
                    if ($duallistbox.jquery.find('option').length > 0) {
                        $duallistbox.error(false);
                    }
                });
                WizFx.Helper.DualListBox.ToggleButtons($container, $left, $right);
                _.delay(function () {
                    $duallistbox.cascadefrom.bind.change(function () {
                        $options_6.dataSource.read().then(function () {
                            WizFx.Helper.DualListBox.BindData($options_6.dataSource.data(), $container, $left, $right);
                        });
                    });
                }, 2000);
            }
            return $duallistbox;
        };
        Main.prototype.modal = function (func, options) {
            var _this = this;
            var $modal = new WizFx.UI.Bootstrap.Modal(this.context);
            if ($modal.jquery) {
                var $default = {
                    backdrop: 'static',
                    keyboard: false,
                    type: 'modal'
                };
                var $options = configure($modal, WizFx.UI.Bootstrap.ModalConfig, $default, func, options);
                if (!$modal.jquery.wg('bootstrap') && $options.type == 'modal') {
                    $($modal.jquery)
                        .on('show.bs.modal', function () {
                        WizFx.Helper.Modal.CenterModal($modal);
                        $('.modal-backdrop').unbind('click');
                    })
                        .on('shown.bs.modal', function () {
                        trigger('modal-bootstrap-open', _this, 'wg.bind.modal().open(function(modal) { })');
                        trigger('modal-' + $modal.jquery.find('.modal-title').first().text() + '-open', _this, 'wg.bind.modal(\'' + $modal.jquery.find('.modal-title').text() + '\').open(function(modal) { })');
                    })
                        .on('hidden.bs.modal', function () {
                        if (WG.window.browser == Browser.ie && WG.scrollTop > 0) {
                            WG.window.scroll.top(WG.scrollTop);
                        }
                        WG.iframe.resize();
                        trigger('modal-bootstrap-close', _this, 'wg.bind.modal().close(function(modal) { })');
                        trigger('modal-' + $modal.jquery.find('.modal-title').first().text() + '-close', _this, 'wg.bind.modal(\'' + $modal.jquery.find('.modal-title').text() + '\').close(function(modal) { })');
                    });
                    $modal.jquery.wg('bootstrap', true);
                }
            }
            return $modal;
        };
        Main.prototype.form = function (name) {
            if (_.isString(name)) {
                this.context = $(this.context).find('form[name="' + name + '"]').first();
            }
            else {
                this.context = $(this.context);
            }
            return new WizFx.UI.Html.Form(this.context);
        };
        Main.prototype.block = function (options, callback) {
            $(this.context).first().css({ 'position': 'relative' }).block(options);
            invoke(callback);
        };
        Main.prototype.unblock = function (callback) {
            $(this.context).first().unblock();
            invoke(callback);
        };
        Main.prototype.html = function (content, callback) {
            var jquery = (this.context instanceof jQuery) ? this.context : $(this.context);
            jquery.empty();
            var $guid = Guid.new();
            var $wrapper = $('<div></div>', { id: $guid, 'data-container': 'wrapper', 'style': 'visibility: hidden' });
            $wrapper.html(content).find('script').remove();
            jquery.html($wrapper);
            wg($wrapper).initUI(function () {
                $wrapper.removeAttr('style');
                WG.iframe.resize();
                invoke(callback);
            }, { context: jquery });
        };
        Main.prototype.append = function (content, callback) {
            var jquery = (this.context instanceof jQuery) ? this.context : $(this.context);
            var $guid = Guid.new();
            var $wrapper = $('<div></div>', { id: $guid, 'data-container': 'wrapper', 'style': 'visibility: hidden' });
            $wrapper.html(content).find('script').remove();
            jquery.append($wrapper);
            wg($wrapper).initUI(function () {
                $wrapper.removeAttr('style');
                WG.iframe.resize();
                invoke(callback);
            }, { context: jquery });
        };
        Main.prototype.after = function (content, callback) {
            var jquery = (this.context instanceof jQuery) ? this.context : $(this.context);
            var $guid = Guid.new();
            var $wrapper = $('<div></div>', { id: $guid, 'data-container': 'wrapper', 'style': 'visibility: hidden' });
            $wrapper.html(content).find('script').remove();
            jquery.after($wrapper);
            wg($wrapper).initUI(function () {
                $wrapper.removeAttr('style');
                WG.iframe.resize();
                invoke(callback);
            }, { context: jquery });
        };
        Main._instance = new Main(null);
        return Main;
    }());
    var WG = (function (_super) {
        __extends(WG, _super);
        function WG(arg) {
            _super.call(this, arg);
            if (!(this instanceof WG)) {
                return Main.getInstance(arg);
            }
        }
        WG.parentID = function (id) {
            // TODO: Parent ID - Not Working
            $.ajaxSetup({
                data: {
                    parentId: id
                }
            });
        };
        Object.defineProperty(WG, "config", {
            get: function () {
                return __config;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WG, "window", {
            get: function () {
                return __window;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WG, "iframe", {
            get: function () {
                return __iframe;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WG, "http", {
            get: function () {
                return __http;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WG, "bind", {
            get: function () {
                return __bind;
            },
            enumerable: true,
            configurable: true
        });
        WG.modal = function (func, options) {
            if (arguments.length > 0) {
                return wg(WG.config.modal.id).modal(func, options);
            }
            return __modal;
        };
        Object.defineProperty(WG, "tab", {
            get: function () {
                return __tab;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WG, "notification", {
            get: function () {
                return __notification;
            },
            enumerable: true,
            configurable: true
        });
        WG.url = function (path) {
            return WG.config.url.host + (path || '').replace(/\/+/g, '/').replace(/^\//, '');
        };
        WG.download = function (url) {
        };
        WG.alert = function (msg, callback, title) {
            wg(WG.config.alert.id).modal(function (c) { return c.title(title || 'Alert').width('modal-sm')
                .button('Ok', function (m) { return m.close(); }); }, { backdrop: 'static', keyboard: false, type: 'alert' }).open(function (d) {
                d.jquery.find('.modal-body').first().text(msg);
                WizFx.Helper.Alert.CenterModal(d);
            });
        };
        WG.confirm = function (msg, callback, title) {
            wg(WG.config.confirm.id).modal(function (c) { return c.title(title || 'Confirm').width('modal-sm')
                .button('Yes', function (m) { invoke(callback, true); m.close(); })
                .button('No', function (m) { invoke(callback, false); m.close(); }); }, { backdrop: 'static', keyboard: false, type: 'confirm' }).open(function (d) {
                d.jquery.find('.modal-body').first().text(msg);
                WizFx.Helper.Confirm.CenterModal(d);
            });
        };
        WG.dataSource = function (data, params) {
            if (_.isString(data)) {
                return new kendo.data.DataSource({
                    type: 'aspnetmvc-ajax',
                    transport: {
                        read: {
                            type: "POST",
                            dataType: "json",
                            url: data,
                            data: params
                        }
                    }
                });
            }
            else if (_.isArray(data)) {
                return new kendo.data.DataSource({
                    data: data
                });
            }
            else {
                return new kendo.data.DataSource(data);
            }
        };
        WG.scrollTop = 0;
        return WG;
    }(Main));
    WizFx.WG = WG;
    if (self != top) {
        __config = parent.window.__config;
        __window = parent.window.__window;
        __notification = parent.window.__notification;
        __tab = parent.window.__tab;
        ;
        __iframe = {
            resize: _.debounce(function (int) {
                int = int || WizFx.Helper.IFrame.getHeight();
                parent.window.__iframe.resize(int);
                //_.delay(() => {
                //    parent.window.__iframe.resize(int);        
                //}, 1000);
            }, 300)
        };
    }
    else {
        window.__config = __config = new WizFx.Config();
        window.__window = __window = new WizFx.Window();
        window.__iframe = __iframe = new WizFx.UI.Html.Iframe();
        window.__notification = __notification = new WizFx.UI.Html.Notification(WG.config.notification.id);
        wg(WG.config.tab.id).tabstrip();
        window.__tab = __tab = new WizFx.UI.Kendo.Tab(WG.config.tab.id);
    }
    __http = new WizFx.Ajax.Http();
    __bind = new WizFx.Bind();
    __modal = wg(WG.config.modal.id).modal();
    var __app = false;
    Object.defineProperty(window, 'application', {
        get: function () {
            return function (fn) {
                if (!__app) {
                    $(document).ready(function () {
                        fn(WG);
                    });
                    __app = true;
                }
            };
        }
    });
    Object.defineProperty(window, 'wizardsgroup', {
        get: function () {
            return function (fn) {
                $(document).bind('wizardsgroup', function () {
                    fn(WG);
                });
            };
        }
    });
})(WizFx || (WizFx = {}));
//# sourceMappingURL=wg.js.map