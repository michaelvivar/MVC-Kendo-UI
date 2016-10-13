module WizFx.UI.Kendo {
    abstract class Picker extends Base {
        max(value: any) {
            if (this.jquery && this.jquery.wg('kendo')) {
                this.kendo.max(value);
            }
            return <any>this;
        }
        min(value: any) {
            if (this.jquery && this.jquery.wg('kendo')) {
                this.kendo.min(value);
            }
            return <any>this;
        }
        error(bool: boolean) {
            if (this.jquery) {
                if (bool == false) {
                    this.jquery.parents('.k-picker-wrap').first().removeClass(WG.config.kendo.error.class);
                }
                else {
                    this.jquery.parents('.k-picker-wrap').first().addClass(WG.config.kendo.error.class);
                }
            }
            return <any>this;
        }
    }

    export class DatePicker extends Picker implements Wizardsgroup.UI.Kendo.DatePicker {
        get kendo(): kendo.ui.DatePicker {
            if (this.jquery && this.jquery.wg('kendo') == WG.config.kendo.datepicker) {
                return this.jquery.data(WG.config.kendo.datepicker);
            }
            return null;
        }
    }
    export class DatePickerConfig implements Wizardsgroup.UI.Kendo.DatePicker.Config {
        constructor(private jquery: JQuery, public options: Wizardsgroup.UI.Kendo.DatePicker.Options) {

        }
        max(date: Date) {
            this.options.max = date;
            return this;
        }
        min(date: Date) {
            this.options.min = date;
            return this;
        }
        format(str: string) {
            this.options.format = str;
            return this;
        }
        value(val: Date) {
            this.options.value = val;
            return this;
        }
        cascadeFrom(id: string) {
            if (this.jquery) {
                this.jquery.data('cascadefrom', id);
            }
            return this;
        }
    }

    export class DateTimePicker extends Picker implements Wizardsgroup.UI.Kendo.DateTimePicker {
        get kendo(): kendo.ui.DateTimePicker {
            if (this.jquery && this.jquery.wg('kendo') == WG.config.kendo.datetimepicker) {
                return this.jquery.data(WG.config.kendo.datetimepicker);
            }
            return null;
        }
    }
    export class DateTimePickerConfig implements Wizardsgroup.UI.Kendo.DateTimePicker.Config {
        constructor(private jquery: JQuery, public options: Wizardsgroup.UI.Kendo.DateTimePicker.Options) {

        }
        max(date: Date) {
            this.options.max = date;
            return this;
        }
        min(date: Date) {
            this.options.min = date;
            return this;
        }
        format(str: string) {
            this.options.format = str;
            return this;
        }
        value(val: Date) {
            this.options.value = val;
            return this;
        }
        cascadeFrom(id: string) {
            if (this.jquery) {
                this.jquery.data('cascadefrom', id);
            }
            return this;
        }
    }

    export class TimePicker extends Picker implements Wizardsgroup.UI.Kendo.TimePicker {
        get kendo(): kendo.ui.TimePicker {
            if (this.jquery && this.jquery.wg('kendo') == WG.config.kendo.timepicker) {
                return this.jquery.data(WG.config.kendo.timepicker);
            }
            return null;
        }
    }
    export class TimePickerConfig implements Wizardsgroup.UI.Kendo.TimePicker.Config {
        constructor(private jquery: JQuery, public options: Wizardsgroup.UI.Kendo.TimePicker.Options) {

        }
        max(date: Date) {
            this.options.max = date;
            return this;
        }
        min(date: Date) {
            this.options.min = date;
            return this;
        }
        format(str: string) {
            this.options.format = str;
            return this;
        }
        value(val: Date) {
            this.options.value = val;
            return this;
        }
        interval(minutes: number) {
            this.options.interval = minutes;
            return this;
        }
        cascadeFrom(id: string) {
            if (this.jquery) {
                this.jquery.data('cascadefrom', id);
            }
            return this;
        }
    }
}