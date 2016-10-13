module WizFx {

    //Status
    Object.defineProperty(window, 'Status', {
        get: function () {
            return {
                success: 'Success',
                failed: 'Failed',
                warning: 'Warning',
                serverException: 'ServerException'
            }
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
            }
        }
    });

    //Browser
    Object.defineProperty(window, 'Browser', {
        get: function () {
            return {
                ie: 'ie',
                firefox: 'firefox',
                chrome: 'webkit'
            }
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
            }
        }
    });

    export function wg(arg: any): Wizardsgroup.UI {
        return Main.getInstance(arg);
    }

    function configure<T>(jquery: JQuery | any, config: any, defaults: T, func: any, options: any): T {
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

    var __config: Wizardsgroup.Config;
    var __window: Wizardsgroup.Window;
    var __iframe: Wizardsgroup.UI.Html.Iframe;
    var __http: Wizardsgroup.Ajax.Http;
    var __bind: Wizardsgroup.Bind;
    var __tab: Wizardsgroup.UI.Kendo.TabStrip;
    var __notification: Wizardsgroup.UI.Html.Notification;
    var __modal: Wizardsgroup.UI.Bootstrap.Modal;

    class Main implements Wizardsgroup.UI {
        private static _instance: Main = new Main(null);
        constructor(private context: any) {
            if (!(this instanceof <any>Main)) {
                return;
            }
            if (Main._instance) {
                throw new Error("Use WG.getInstance()");
            }
            Main._instance = this;
        }
        static getInstance(arg: any) {
            Main._instance.context = arg;
            return Main._instance;
        }

        initUI(callback?: Function, options?: any) {
            let jquery: JQuery = (this.context instanceof jQuery) ? this.context : $(this.context);
            let $options: any = $.extend({
                container: this.context
            }, options);
            _.each(jquery.find('input[data-wg-ui], select[data-wg-ui], div[data-wg-ui="' + WG.config.kendo.grid + '"], ul[data-wg-ui="' + WG.config.kendo.accordion + '"], ul[data-wg-ui="' + WG.config.kendo.contextmenu + '"]'), (element) => {
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
        }
        textbox(func?: any, options?: any) {
            var $textbox = new UI.Kendo.Textbox(this.context);
            if ($textbox.jquery) {
                if ($textbox.jquery.wg('kendo')) {
                    return $textbox;
                }
                let $filter = {};
                var $default: Wizardsgroup.UI.Kendo.TextBox.Options = {
                    minLength: 255,
                    maxLength: 255,
                    container: $('body'),
                    filter: 'contains',
                    serverFiltering: false,
                    suggest: false
                };
                options = $.extend(
                    <Wizardsgroup.UI.Kendo.TextBox.Options>{
                        maxLength: $textbox.jquery.data('maxlength') || $textbox.jquery.attr('maxlength'),
                        container: $textbox.jquery.parents('[data-container]').first(),
                        serverFiltering: $textbox.jquery.data('serverfiltering'),
                        dataSource: $textbox.jquery.url()
                    }, options);
                let $options = configure($textbox.jquery, UI.Kendo.TextBoxConfig, $default, func, options);
                $textbox.container = $options.container;
                $options.change = (e) => {
                    $textbox.error(false);
                    $textbox.jquery.trigger('cascade');
                }
                if (_.isString($options.dataSource)) {
                    $options.dataSource = <kendo.data.DataSourceOptions>{
                        type: 'aspnetmvc-ajax',
                        transport: {
                            read: {
                                url: $options.dataSource,
                                type: "POST",
                                dataType: "json",
                                data: function () {
                                    return $filter;
                                }
                            }
                        }
                    }
                }
                else {
                    $options.serverFiltering = false;
                }
                if (parseBoolean($options.serverFiltering)) {
                    $options.filtering = (e) => {
                        $filter = e.filter;
                    }
                }
                if ($options.dataSource) {
                    $options.minLength = 1;
                }
                $textbox.jquery.kendoAutoComplete($options);
                $textbox.jquery.wg('kendo', WG.config.kendo.textbox);
                $textbox.jquery.attr('data-wg-ui', WG.config.kendo.textbox);
                $textbox.kendo.element.attr('maxlength', $options.maxLength);
                if (parseBoolean($textbox.jquery.data('readonly'))) {
                    $textbox.readonly();
                }
                if (parseBoolean($options.serverFiltering)) {
                    $textbox.kendo.bind('filtering', _.debounce(() => {
                        if ((<string>$textbox.value).length > ($options.minLength - 1)) {
                            $textbox.read();
                        }
                    }, 600));
                }
            }
            return $textbox;
        }
        combobox(func?: any, options?: any) {
            var $combobox = new UI.Kendo.ComboBox(this.context);
            if ($combobox.jquery) {
                if ($combobox.jquery.wg('kendo')) {
                    return $combobox;
                }

                var $default: Wizardsgroup.UI.Kendo.ComboBox.Options = {
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
                options = $.extend(
                    <Wizardsgroup.UI.Kendo.ComboBox.Options>{
                        autoBind: parseBoolean($combobox.jquery.data('autobind')),
                        dataSource: $combobox.jquery.url(),
                        maxLength: $combobox.jquery.data('maxlength') || $combobox.jquery.attr('maxlength'),
                        container: $combobox.jquery.parents('[data-container]').first(),
                        value: $combobox.jquery.val()
                    }, options);

                let $options = configure($combobox.jquery, UI.Kendo.ComboBoxConfig, $default, func, options);
                $combobox.container = $options.container;
                if ($options.value == Guid.empty()) {
                    (<Wizardsgroup.UI.Kendo.ComboBox>$combobox).value = '';
                    $options.value = undefined;
                }
                if (parseBoolean($options.autoBind) == false) {
                    if (!_.isEmpty($options.value)) {
                        $options.autoBind = true;
                    }
                }
                if (_.isString($options.dataSource)) {
                    $options.dataSource = <kendo.data.DataSourceOptions>{
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
                            parameterMap: function (options: any) {
                                return {
                                    cascadeFromValue: $combobox.cascadefrom.value,
                                    args: options.args
                                };
                            }
                        }
                    };
                }
                $options.change = (e) => {
                    var $text = $combobox.text;
                    var $list = _.filter($combobox.data, function (item: any) {
                        return item.Text == $text;
                    });
                    if (!($list.length > 0)) {
                        $combobox.reset();
                    }
                    $combobox.error(false);
                    $combobox.jquery.trigger('cascade');
                }
                $combobox.jquery.kendoComboBox($options);
                $combobox.jquery.wg('kendo', WG.config.kendo.combobox);
                $combobox.jquery.attr('data-wg-ui', WG.config.kendo.combobox);
                $combobox.kendo.input.attr('maxlength', $options.maxLength);
                if (parseBoolean($combobox.jquery.data('readonly'))) {
                    $combobox.readonly();
                }
                _.delay(() => {
                    (<Wizardsgroup.UI.Kendo.ComboBox>$combobox).cascadefrom.bind.change(() => {
                        $combobox.reset().read();
                    });
                }, 1000);
            }
            return $combobox;
        }
        multiselect(func?: any, options?: any) {
            var $multiselect = new UI.Kendo.MultiSelect(this.context);
            if ($multiselect.jquery) {
                if ($multiselect.jquery.wg('kendo')) {
                    return $multiselect;
                }
                var $default: Wizardsgroup.UI.Kendo.MultiSelect.Options = {
                    dataTextField: 'Text',
                    dataValueField: 'Value',
                    autoBind: false,
                    maxLength: 255,
                    serverFiltering: false,
                    container: $('body')
                };
                options = $.extend(
                    <Wizardsgroup.UI.Kendo.MultiSelect.Options>{
                        maxLength: $multiselect.jquery.data('maxlength') || $multiselect.jquery.attr('maxlength'),
                        serverFiltering: parseBoolean($multiselect.jquery.data('serverfiltering')),
                        container: $multiselect.jquery.parents('[data="container"]').first(),
                        value: $multiselect.jquery.val(),
                        dataSource: $multiselect.jquery.url(),
                        autoBind: parseBoolean($multiselect.jquery.data('autobind'))
                    }, options);
                let $options = configure($multiselect.jquery, UI.Kendo.MultiSelectConfig, $default, func, options);
                $multiselect.container = $options.container;
                if ($options.value == Guid.empty()) {
                    (<Wizardsgroup.UI.Kendo.MultiSelect>$multiselect).value = '';
                    $options.value = undefined;
                }
                if (parseBoolean($options.autoBind) == false) {
                    if (!_.isEmpty($options.value)) {
                        $options.autoBind = true;
                    }
                }
                if (_.isString($options.dataSource)) {
                    $options.dataSource = <kendo.data.DataSourceOptions>{
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
                            parameterMap: function (options: any) {
                                return {
                                    cascadeFromValue: $multiselect.cascadefrom.value,
                                    args: options.args
                                };
                            }
                        }
                    };
                }
                $options.change = (e) => {
                    $multiselect.error(false);
                    $multiselect.jquery.trigger('cascade');
                }
                $multiselect.jquery.kendoMultiSelect($options);
                $multiselect.jquery.wg('kendo', WG.config.kendo.multiselect);
                $multiselect.jquery.attr('data-wg-ui', WG.config.kendo.multiselect);
                $multiselect.kendo.input.attr('maxlength', $options.maxLength);
                if (parseBoolean($multiselect.jquery.data('readonly'))) {
                    $multiselect.readonly();
                }
                _.delay(() => {
                    (<Wizardsgroup.UI.Kendo.MultiSelect>$multiselect).cascadefrom.bind.change(() => {
                        $multiselect.reset().read();
                    });
                }, 1000);
            }
            return $multiselect;
        }
        datepicker(func?: any, options?: any) {
            var $datepicker = new UI.Kendo.DatePicker(this.context);
            if ($datepicker.jquery) {
                if ($datepicker.jquery.wg('kendo')) {
                    return $datepicker;
                }
                var $default: Wizardsgroup.UI.Kendo.DatePicker.Options = {
                    animation: false,
                    maxLength: 255,
                    container: $('body'),
                    format: 'MM/dd/yyyy',
                    parseFormats: ['MM/dd/yy']
                };
                options = $.extend(
                    <Wizardsgroup.UI.Kendo.DatePicker.Options>{
                        format: $datepicker.jquery.data('format'),
                        parseFormats: $datepicker.jquery.data('parseformats'),
                        maxLength: $datepicker.jquery.data('maxlength'),
                        container: $datepicker.jquery.parents('[data-container]').first()
                    }, options);
                let $options = configure($datepicker.jquery, UI.Kendo.DatePickerConfig, $default, func, options);
                $datepicker.container = $options.container;

                $options.change = (e) => {
                    $datepicker.error(false);
                    $datepicker.jquery.trigger('cascade');
                }
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

                _.delay(() => {
                    $datepicker.cascadefrom.bind.change(() => {
                        var $value: Date = $datepicker.cascadefrom.value;
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
        }
        datetimepicker(func?: any, options?: any) {
            var $datetimepicker = new UI.Kendo.DateTimePicker(this.context);
            if ($datetimepicker.jquery) {
                if ($datetimepicker.jquery.wg('kendo')) {
                    return $datetimepicker;
                }
                var $default: Wizardsgroup.UI.Kendo.DateTimePicker.Options = {
                    animation: false,
                    maxLength: 255,
                    format: 'MM/dd/yyyy HH:mm',
                    parseFormats: ['MM/dd/yy HH:mm'],
                    container: $('body')
                };
                options = $.extend(
                    <Wizardsgroup.UI.Kendo.DateTimePicker.Options>{
                        format: $datetimepicker.jquery.data('format'),
                        parseFormats: $datetimepicker.jquery.data('parseformats'),
                        maxLength: $datetimepicker.jquery.data('maxlength'),
                        container: $datetimepicker.jquery.parents('[data-container]').first()
                    }, options);
                let $options = configure($datetimepicker.jquery, UI.Kendo.DateTimePickerConfig, $default, func, options);
                $datetimepicker.container = $options.container;
                $options.change = (e) => {
                    $datetimepicker.error(false);
                    $datetimepicker.jquery.trigger('cascade');
                }
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

                _.delay(() => {
                    $datetimepicker.cascadefrom.bind.change(() => {
                        var $value: Date = $datetimepicker.cascadefrom.value;
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
        }
        timepicker(func?: any, options?: any) {
            var $timepicker = new UI.Kendo.TimePicker(this.context);
            if ($timepicker.jquery) {
                if ($timepicker.jquery.wg('kendo')) {
                    return $timepicker;
                }
                var $default: Wizardsgroup.UI.Kendo.TimePicker.Options = {
                    animation: false,
                    format: 'hh:mm tt',
                    interval: 60,
                    maxLength: 255,
                    container: $('body')
                };
                options = $.extend(
                    <Wizardsgroup.UI.Kendo.TimePicker.Options>{
                        maxLength: $timepicker.jquery.data('maxlength'),
                        interval: $timepicker.jquery.data('interval'),
                        format: $timepicker.jquery.data('format'),
                        container: $timepicker.jquery.parents('[data-container]').first()
                    }, options);
                let $options = configure($timepicker.jquery, UI.Kendo.TimePickerConfig, $default, func, options);
                $timepicker.container = $options.container;
                $options.change = (e) => {
                    $timepicker.error(false);
                    $timepicker.jquery.trigger('cascade');
                }
                $timepicker.jquery.kendoTimePicker($options);
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

                _.delay(() => {
                    $timepicker.cascadefrom.bind.change(function () {
                        var $value: Date = $timepicker.cascadefrom.value;
                        if (_.isDate($value)) {
                            var $fromDate: Date = new Date(<any>$value);
                            if (!_.isNull($fromDate)) {
                                var $toDate: Date = new Date($timepicker.value);
                                if ($options.interval > 59) {
                                    $value.setHours($value.getHours() + 1);
                                }
                                else {
                                    $value.setMinutes($value.getMinutes() + $options.interval);
                                }
                                $timepicker.min($value);
                                if (parseInt(<any>($fromDate.getHours() * 60 + $fromDate.getMinutes())) >= $toDate.getHours() * 60 + $toDate.getMinutes()) {
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
        }
        numerictextbox(func?: any, options?: any) {
            var $numerictextbox = new UI.Kendo.NumericTextBox(this.context);
            if ($numerictextbox.jquery) {
                if ($numerictextbox.jquery.wg('kendo')) {
                    return $numerictextbox;
                }
                var $default: Wizardsgroup.UI.Kendo.NumericTextBox.Options = {
                    format: '#,###',
                    spinners: true,
                    min: 0,
                    decimals: 2,
                    container: $('body')
                };
                options = $.extend(
                    <Wizardsgroup.UI.Kendo.NumericTextBox.Options>{
                        format: $numerictextbox.jquery.data('format'),
                        spinners: parseBoolean($numerictextbox.jquery.data('spinner')),
                        min: $numerictextbox.jquery.data('min'),
                        max: $numerictextbox.jquery.data('max'),
                        decimals: $numerictextbox.jquery.data('decimals'),
                        container: $numerictextbox.jquery.parents('[data-container]').first()
                    }, options);
                let $options = configure($numerictextbox.jquery, UI.Kendo.NumericTextBoxConfig, $default, func, options);
                $numerictextbox.container = $options.container;
                if ($options.decimals > 0) {
                    $options.format = $options.format + '.';
                    _.times($options.decimals, () => {
                        $options.format = $options.format + '0';
                    });
                }
                $options.change = (e) => {
                    $numerictextbox.error(false);
                    $numerictextbox.jquery.trigger('cascade');
                };
                $numerictextbox.jquery.kendoNumericTextBox($options);
                $numerictextbox.jquery.wg('kendo', WG.config.kendo.numerictextbox);
                $numerictextbox.jquery.attr('data-wg-ui', WG.config.kendo.numerictextbox);
                if (parseBoolean($numerictextbox.jquery.data('readonly'))) {
                    $numerictextbox.readonly();
                }
                _.delay(() => {
                    (<Wizardsgroup.UI.Kendo.NumericTextBox>$numerictextbox).cascadefrom.bind.change(() => {
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
        }
        maskedtextbox(func?: any, options?: any) {
            var $maskedtextbox = new UI.Kendo.MaskedTextBox(this.context);
            if ($maskedtextbox.jquery) {
                if ($maskedtextbox.jquery.wg('kendo')) {
                    return $maskedtextbox;
                }
                var $default: Wizardsgroup.UI.Kendo.MaskedTextBox.Options = {
                    container: $('body'),
                    promptChar: ' '
                };
                options = $.extend(
                    <Wizardsgroup.UI.Kendo.MaskedTextBox.Options>{
                        mask: $maskedtextbox.jquery.data('mask'),
                        container: $maskedtextbox.jquery.parents('[data-container]').first()
                    }, options);
                let $options = configure($maskedtextbox.jquery, UI.Kendo.MaskedTextBoxConfig, $default, func, options);
                $maskedtextbox.container = $options.container;
                $options.change = (e) => {
                    $maskedtextbox.error(false);
                    $maskedtextbox.jquery.trigger('cascade');
                }
                $maskedtextbox.jquery.kendoMaskedTextBox($options);
                $maskedtextbox.jquery.wg('kendo', WG.config.kendo.maskedtextbox);
                $maskedtextbox.jquery.attr('data-wg-ui', WG.config.kendo.maskedtextbox);
                if (parseBoolean($maskedtextbox.jquery.data('readonly'))) {
                    $maskedtextbox.readonly();
                }
            }
            return $maskedtextbox;
        }
        contextmenu(func?: any, options?: any) {
            var $contextmenu = new UI.Kendo.ContextMenu(this.context);
            if ($contextmenu.jquery) {
                if ($contextmenu.jquery.wg('kendo')) {
                    return $contextmenu;
                }
                var $default: Wizardsgroup.UI.Kendo.ContextMenu.Options = {
                    showOn: 'null',
                    animation: false,
                    target: 'body'
                };
                options = $.extend(
                    <Wizardsgroup.UI.Kendo.ContextMenu.Options>{
                        target: $contextmenu.jquery.data('target'),
                        animation: parseBoolean($contextmenu.jquery.data('animation')),
                        showOn: $contextmenu.jquery.data('showon')
                    }, options);
                let $options = configure($contextmenu.jquery, UI.Kendo.ContextMenuConfig, $default, func, options);
                $contextmenu.jquery.kendoContextMenu($options);
                $contextmenu.jquery.wg('kendo', WG.config.kendo.contextmenu);
                $contextmenu.jquery.attr('data-wg-ui', WG.config.kendo.contextmenu);
            }
            return $contextmenu;
        }
        fileupload(func?: any, options?: any) {
            var $upload = new UI.Kendo.Upload(this.context);
            if ($upload.jquery) {
                if ($upload.jquery.wg('kendo')) {
                    return $upload;
                }
                var $default: Wizardsgroup.UI.Kendo.Upload.Options = {
                    async: {}
                };
                options = options || {};
                options.async || options.async || $default.async;
                (<Wizardsgroup.UI.Kendo.Upload.Options>options).async = $.extend(
                    <kendo.ui.UploadAsync>{
                        batch: parseBoolean($upload.jquery.data('batchupload')) || false,
                        autoUpload: parseBoolean($upload.jquery.data('autoupload')) || true,
                        saveUrl: $upload.jquery.data('saveurl') || WG.config.file.url.upload,
                        removeUrl: $upload.jquery.data('removeurl') || WG.config.file.url.remove
                    }, (<Wizardsgroup.UI.Kendo.Upload.Options>options).async);
                let $options = configure($upload.jquery, UI.Kendo.UploadConfig, $default, func, options);
                $options.success = (e) => {
                    //$upload.jquery.trigger('success', e.files);
                }
                $options.remove = (e) => {
                    //$upload.jquery.trigger('remove', e.files);
                    WG.iframe.resize();
                }
                $options.upload = (e) => {
                    //$upload.jquery.trigger('upload', e.files);
                }
                $options.select = (e) => {
                    e.sender.element.attr('value', e.files[0].name);
                    //$upload.jquery.trigger('select', e.files);
                    $upload.error(false);
                    WG.iframe.resize();
                }
                $options.complete = (e) => {

                }
                $options.error = (e) => {
                    //$upload.jquery.trigger('select', e.files);
                }

                $upload.jquery.kendoUpload($options);
                $upload.jquery.wg('kendo', WG.config.kendo.upload);
                $upload.jquery.attr('data-wg-ui', WG.config.kendo.upload);
                $upload.jquery.attr('data-wg-type', 'file');
            }
            return $upload;
        }
        accordion(func?: any, options?: any) {
            var $accordion = new UI.Kendo.Accordion(this.context);
            if ($accordion.jquery) {
                if ($accordion.jquery.wg('kendo')) {
                    return $accordion;
                }
                var $default: Wizardsgroup.UI.Kendo.Accordion.Options = {
                    animation: false,
                    expandMode: 'multiple'
                };
                options = $.extend(
                    <kendo.ui.PanelBarOptions>{
                        animation: parseBoolean($accordion.jquery.data('animation')),
                        expandMode: $accordion.jquery.data('expandmode')
                    }, options);

                let $options = configure($accordion.jquery, UI.Kendo.AccordionConfig, $default, func, options);

                if ($options.items && $options.items.length > 0) {
                    $options.dataSource = $options.items;
                }
                if (!$options.dataSource) {
                    $options.dataSource = [];
                    $accordion.jquery.find('li').each(function () {
                        (<{ contentUrl: url, expanded: boolean, text: string }[]>$options.dataSource).push({
                            text: $(this).data('title') || $(this).text(),
                            expanded: parseBoolean($(this).data('expanded')),
                            contentUrl: $(this).url()
                        });
                    });
                }

                $options.collapse = (e) => {
                    _.delay(() => {
                        WG.iframe.resize();
                        $accordion.jquery.trigger(($(e.item).find('.k-header').first().text() + '-collapse').trimEventName(), e.item);
                    }, 500);
                }
                $options.expand = (e) => {
                    _.delay(() => {
                        WG.iframe.resize();
                        $accordion.jquery.trigger(($(e.item).find('.k-header').first().text() + '-expand').trimEventName(), e.item);
                    }, 500);
                }
                $options.contentLoad = (e) => {
                    wg(e.item).initUI(() => {
                        WG.iframe.resize();
                        $accordion.jquery.trigger(($(e.item).find('.k-header').first().text() + '-load').trimEventName(), e.item);
                    });
                }

                $accordion.jquery.kendoPanelBar($options);
                $accordion.jquery.wg('kendo', WG.config.kendo.accordion);
                $accordion.jquery.attr('data-wg-ui', WG.config.kendo.accordion);
                (<kendo.ui.PanelBar>$accordion.kendo).expand($accordion.jquery.find('li[data-expanded="true"]'), false);
            }
            return $accordion;
        }
        tabstrip(func?: any, options?: any) {
            var $tabstrip = new UI.Kendo.TabStrip(this.context);
            if ($tabstrip.jquery) {
                if ($tabstrip.jquery.wg('kendo')) {
                    return $tabstrip;
                }
                var $default: Wizardsgroup.UI.Kendo.TabStrip.Options = {
                    animation: false,
                    tabPosition: 'top'
                };
                options = $.extend(
                    <Wizardsgroup.UI.Kendo.TabStrip.Options>{
                        animation: parseBoolean($tabstrip.jquery.data('animation')),
                        tabPosition: $tabstrip.jquery.data('position')
                    }, options);
                let $options = configure($tabstrip.jquery, UI.Kendo.TabStripConfig, $default, func, options);

                $options.contentLoad = Helper.TabStrip.ContentLoad($tabstrip);
                $options.activate = function (e) {
                    $(e.item).data('tabindex', Helper.TabStrip.index).attr('data-tabindex', Helper.TabStrip.index++);
                    WG.iframe.resize();
                }
                $tabstrip.jquery.kendoTabStrip($options);
                $tabstrip.jquery.wg('kendo', WG.config.kendo.tabstrip);
                $tabstrip.jquery.attr('data-wg-ui', WG.config.kendo.tabstrip);

                $tabstrip.jquery.on('click', '.ui-icon-close', function (e) {
                    Helper.TabStrip.OnClose($tabstrip, $(this));
                });
            }
            return $tabstrip;
        }
        grid(func?: any, options?: any) {
            var $grid = new UI.Kendo.Grid(this.context);
            if ($grid.jquery) {
                if ($grid.jquery.wg('kendo')) {
                    return $grid;
                }
                var $default: Wizardsgroup.UI.Kendo.Grid.Options = {
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
                options = $.extend(
                    <kendo.ui.GridOptions>{
                        pageable: {
                            pageSize: $grid.jquery.data('pagesize') || 10,
                            pageSizes: [10, 20, 30, 40, 50],
                            refresh: true
                        },
                        height: $grid.jquery.data('height'),
                        dataSource: $grid.jquery.url(),
                        name: $grid.jquery.data('grid')
                    }, options);
                let $options = configure($grid.jquery, UI.Kendo.GridConfig, $default, func, options);
                $grid.container = $options.container;
                if (_.isString($options.dataSource)) {
                    var $url = $options.dataSource;
                    $options.dataSource = $.extend(
                        <kendo.data.DataSourceOptions>{
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
                        },
                        <kendo.data.DataSourceOptions>{
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
                        }
                    );
                }

                if (!$options.name) {
                    $options.name = $grid.jquery.attr('id');
                }
                $grid.jquery.data('grid', $options.name).wg('kendo', WG.config.kendo.grid);
                $grid.jquery.attr('data-wg-ui', WG.config.kendo.grid);
                if (!$options.columns) {
                    $grid.jquery.next('div[data-container="buttons"]').first().addClass('hide');
                    if ($grid.name && _.isString($grid.name)) {
                        if (WG.config.kendo.gridcolumnsetting == 'DB') {
                            // Grid Setting from DB
                            WG.http.get('', {
                                gridname: $grid.name
                            }).then((data) => {
                                $options.columns = data;
                                $options.dataBound = Helper.Grid.OnDataBound($grid);
                                (<kendo.data.DataSourceOptions>$options.dataSource).requestEnd = Helper.Grid.RequestEnd($grid);
                                $grid.jquery.kendoGrid($options);
                                $grid.jquery.next('div[data-container="buttons"]').first().removeClass('hide');
                            });
                        } else {
                            // Grid Setting from JSON File
                            let $gridsetting = WG.config.kendo.folder.gridsetting + '/' + (<string>$grid.name).toLowerCase() + '.setting.json';
                            WG.http.json(WG.url($gridsetting))
                                .then((result) => {
                                    $options.columns = [];
                                    $.each(result, function (i, column: kendo.ui.GridColumn) {
                                        if (column.locked && _.isNaN(parseInt(<any>column.width))) {
                                            column.width = 200;
                                        }
                                        $options.columns.push($.extend(<kendo.ui.GridColumn>{
                                            locked: false,
                                            lockable: false,
                                            sortable: true,
                                            filterable: true,
                                            groupable: true,
                                            menu: true
                                        }, column))
                                    });
                                    $options.columns = Helper.Grid.Columns($options.columns);
                                    $options.dataBound = Helper.Grid.OnDataBound($grid);
                                    (<kendo.data.DataSourceOptions>$options.dataSource).requestEnd = Helper.Grid.RequestEnd($grid);
                                    $grid.jquery.kendoGrid($options);
                                    $grid.jquery.next('div[data-container="buttons"]').first().removeClass('hide');
                                });
                        }
                    }
                }
                else {
                    $options.dataBound = Helper.Grid.OnDataBound($grid);
                    (<kendo.data.DataSourceOptions>$options.dataSource).requestEnd = Helper.Grid.RequestEnd($grid);
                    $grid.jquery.kendoGrid($options);
                }
            }
            return $grid;
        }
        duallistbox(func?: any, options?: any) {
            var $duallistbox = new UI.Bootstrap.DualListBox(this.context);
            if ($duallistbox.jquery) {
                if ($duallistbox.jquery.wg('bootstrap')) {
                    return $duallistbox;
                }
                var $default: Wizardsgroup.UI.Bootstrap.DualListBox.Options = {
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
                }
                var $filter = { value: '' };
                options = $.extend(
                    <Wizardsgroup.UI.Bootstrap.DualListBox.Options>{
                        id: $duallistbox.jquery.attr('id') || $duallistbox.jquery.attr('name'),
                        dataSource: $duallistbox.jquery.url(),
                        height: $duallistbox.jquery.data('height'),
                        container: $duallistbox.jquery.parents('[data-container]').first()
                    }, options);
                let $options = configure($duallistbox.jquery, UI.Bootstrap.DualListBoxConfig, $default, func, options);
                $duallistbox.container = $options.container;
                var $left = $('<select></select>');
                var $right = $duallistbox.jquery;
                var $container = $('<div></div>', {
                    'data-wg': 'dualListBox',
                    'class': 'row'
                });
                $left.addClass('left-box').css({
                    'height': $options.height + 'px',
                    'width': '100%'
                }).attr({ 'multiple': '' });
                $right.addClass('right-box').css({
                    'height': $options.height + 'px',
                    'width': '100%'
                }).attr({ 'multiple': '', 'id': $options.id, 'name': $options.id });
                Helper.DualListBox.RenderHtml($container, $left, $right, $options);
                if (!$options.dataSource) {
                    $options.dataSource = $right.url();
                }
                if (_.isString($options.dataSource)) {
                    $options.dataSource = <kendo.data.DataSourceOptions>{
                        type: 'aspnetmvc-ajax',
                        transport: {
                            read: {
                                url: $options.dataSource,
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
                                }
                            }
                        }
                    };
                }
                $options.dataSource = WG.dataSource($options.dataSource);
                if (!_.isNull($options.dataSource)) {
                    (<kendo.data.DataSource>$options.dataSource).fetch(() => {
                        Helper.DualListBox.BindData((<kendo.data.DataSource>$options.dataSource).data(), $container, $left, $right);
                    });
                    $duallistbox.jquery.data('source', $options.dataSource);
                }
                $container.find('button[data-action]').click(function (e) {
                    e.preventDefault();
                    (<Wizardsgroup.UI.Bootstrap.DualListBox>$duallistbox).move($(this).data('action'));
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
                $right.filterByText($container.find('.filter-selected').first(), $options.timeout).scrollTop(0).sortOptions();
                $left.filterByText($container.find('.filter-unselected').first(), $options.timeout).scrollTop(0).sortOptions();
                $container.find('.clear-filter').click(() => {
                    $(this).parents('.input-group').find('input').first().val('').trigger('change');
                });
                $duallistbox.jquery.wg('bootstrap', true);
                $duallistbox.jquery.attr('data-wg-ui', WG.config.bootstrap.duallistbox);
                (<Wizardsgroup.UI.Bootstrap.DualListBox>$duallistbox).bind.move((box) => {
                    Helper.DualListBox.ToggleButtons($container, $left, $right);
                    if ($duallistbox.jquery.find('option').length > 0) {
                        $duallistbox.error(false);
                    }
                });

                Helper.DualListBox.ToggleButtons($container, $left, $right);
                _.delay(() => {
                    (<Wizardsgroup.UI.Bootstrap.DualListBox>$duallistbox).cascadefrom.bind.change(() => {
                        (<kendo.data.DataSource>$options.dataSource).read().then(function () {
                            Helper.DualListBox.BindData((<kendo.data.DataSource>$options.dataSource).data(), $container, $left, $right);
                        });
                    });
                }, 2000);
            }
            return $duallistbox;
        }
        modal(func?: any, options?: any) {
            var $modal = new UI.Bootstrap.Modal(this.context);
            if ($modal.jquery) {
                var $default: Wizardsgroup.UI.Bootstrap.Modal.Options = {
                    backdrop: 'static',
                    keyboard: false,
                    type: 'modal'
                };
                let $options = configure($modal, UI.Bootstrap.ModalConfig, $default, func, options);
                if (!$modal.jquery.wg('bootstrap') && $options.type == 'modal') {
                    $($modal.jquery)
                        .on('show.bs.modal', () => {
                            Helper.Modal.CenterModal($modal);
                            $('.modal-backdrop').unbind('click');
                        })
                        .on('shown.bs.modal', () => {
                            trigger('modal-bootstrap-open', this, 'wg.bind.modal().open(function(modal) { })');
                            trigger('modal-' + $modal.jquery.find('.modal-title').first().text() + '-open', this, 'wg.bind.modal(\'' + $modal.jquery.find('.modal-title').text() + '\').open(function(modal) { })');
                        })
                        .on('hidden.bs.modal', () => {
                            if (WG.window.browser == Browser.ie && WG.scrollTop > 0) {
                                WG.window.scroll.top(WG.scrollTop);
                            }
                            WG.iframe.resize();
                            trigger('modal-bootstrap-close', this, 'wg.bind.modal().close(function(modal) { })');
                            trigger('modal-' + $modal.jquery.find('.modal-title').first().text() + '-close', this, 'wg.bind.modal(\'' + $modal.jquery.find('.modal-title').text() + '\').close(function(modal) { })');
                        });
                    $modal.jquery.wg('bootstrap', true);
                }
            }
            return $modal;
        }
        form(name?: any) {
            if (_.isString(name)) {
                this.context = $(this.context).find('form[name="' + name + '"]').first();
            }
            else {
                this.context = $(this.context);
            }
            return new UI.Html.Form(this.context);
        }
        block(options?: any, callback?: any) {
            $(this.context).first().css({ 'position': 'relative' }).block(options);
            invoke(callback);
        }
        unblock(callback?: any) {
            $(this.context).first().unblock();
            invoke(callback);
        }
        html(content?: any, callback?: Function) {
            var jquery: JQuery = (this.context instanceof jQuery) ? this.context : $(this.context);
            jquery.empty();
            var $guid = Guid.new();
            var $wrapper = $('<div></div>', { id: $guid, 'data-container': 'wrapper', 'style': 'visibility: hidden' });
            $wrapper.html(content).find('script').remove();
            jquery.html($wrapper);
            wg($wrapper).initUI(() => {
                $wrapper.removeAttr('style');
                WG.iframe.resize();
                invoke(callback);
            }, { context: jquery });
        }
        append(content?: any, callback?: Function) {
            var jquery: JQuery = (this.context instanceof jQuery) ? this.context : $(this.context);
            var $guid = Guid.new();
            var $wrapper = $('<div></div>', { id: $guid, 'data-container': 'wrapper', 'style': 'visibility: hidden' });
            $wrapper.html(content).find('script').remove();
            jquery.append($wrapper);
            wg($wrapper).initUI(() => {
                $wrapper.removeAttr('style');
                WG.iframe.resize();
                invoke(callback);
            }, { context: jquery });
        }
        after(content?: any, callback?: Function) {
            var jquery: JQuery = (this.context instanceof jQuery) ? this.context : $(this.context);
            var $guid = Guid.new();
            var $wrapper = $('<div></div>', { id: $guid, 'data-container': 'wrapper', 'style': 'visibility: hidden' });
            $wrapper.html(content).find('script').remove();
            jquery.after($wrapper);
            wg($wrapper).initUI(() => {
                $wrapper.removeAttr('style');
                WG.iframe.resize();
                invoke(callback);
            }, { context: jquery });
        }
    }

    export class WG extends Main {
        constructor(arg: any) {
            super(arg);
            if (!(this instanceof <any>WG)) {
                return Main.getInstance(arg);
            }
        }

        static parentID(id: string) {
            // TODO: Parent ID - Not Working
            $.ajaxSetup({
                data: {
                    parentId: id
                }
            });
        }
        static get config() {
            return __config;
        }
        static get window() {
            return __window;
        }
        static get iframe() {
            return __iframe;
        }
        static get http() {
            return __http;
        }
        static get bind() {
            return __bind;
        }
        static modal(func?: any, options?: any) {
            if (arguments.length > 0) {
                return wg(WG.config.modal.id).modal(func, options);
            }
            return __modal;
        }
        static get tab() {
            return __tab;
        }
        static get notification() {
            return __notification;
        }
        static url(path: string): url {
            return (<any>WG.config.url.host) + (path || '').replace(/\/+/g, '/').replace(/^\//, '');
        }
        static download(url: url) {

        }
        static alert(msg: string, callback: Function, title?: string) {
            wg(WG.config.alert.id).modal(c => c.title(title || 'Alert').width('modal-sm')
                .button('Ok', m => m.close()), { backdrop: 'static', keyboard: false, type: 'alert' }).open((d) => {
                    (<UI.Bootstrap.Modal>d).jquery.find('.modal-body').first().text(msg);
                    Helper.Alert.CenterModal(<UI.Bootstrap.Modal>d);
                });
        }
        static confirm(msg: string, callback: Function, title?: string) {
            wg(WG.config.confirm.id).modal(c => c.title(title || 'Confirm').width('modal-sm')
                .button('Yes', (m) => { invoke(callback, true); m.close(); })
                .button('No', (m) => { invoke(callback, false); m.close(); }), { backdrop: 'static', keyboard: false, type: 'confirm' }).open((d) => {
                    (<UI.Bootstrap.Modal>d).jquery.find('.modal-body').first().text(msg);
                    Helper.Confirm.CenterModal(<UI.Bootstrap.Modal>d);
                });
        }
        static dataSource(data: any, params?: any) {
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
        }
        static scrollTop = 0;
    }

    if (self != top) {
        __config = parent.window.__config;
        __window = parent.window.__window;
        __notification = parent.window.__notification;
        __tab = parent.window.__tab;;
        __iframe = {
            resize: _.debounce((int?: number) => {
                int = int || Helper.IFrame.getHeight()
                parent.window.__iframe.resize(int);
                //_.delay(() => {
                //    parent.window.__iframe.resize(int);        
                //}, 1000);
            }, 300)
        };
    }
    else {
        window.__config = __config = new Config();
        window.__window = __window = new Window();
        window.__iframe = __iframe = new UI.Html.Iframe();
        window.__notification = __notification = new UI.Html.Notification(WG.config.notification.id);
        wg(WG.config.tab.id).tabstrip();
        window.__tab = __tab = new UI.Kendo.Tab(WG.config.tab.id);
    }

    __http = new Ajax.Http();
    __bind = new Bind();
    __modal = wg(WG.config.modal.id).modal();

    var __app = false;
    Object.defineProperty(window, 'application', {
        get: function () {
            return (fn) => {
                if (!__app) {
                    $(document).ready(() => {
                        fn(WG);
                    });
                    __app = true;
                }
            }
        }
    });

    Object.defineProperty(window, 'wizardsgroup', {
        get: function () {
            return (fn) => {
                $(document).bind('wizardsgroup', () => {
                    fn(WG);
                });
            }
        }
    });
}