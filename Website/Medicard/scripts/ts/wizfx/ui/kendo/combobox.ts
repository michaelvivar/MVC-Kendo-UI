module WizFx.UI.Kendo {
    export class ComboBox extends Base implements Wizardsgroup.UI.Kendo.ComboBox {
        get kendo(): kendo.ui.ComboBox {
            if (this.jquery && this.jquery.wg('kendo') == WG.config.kendo.combobox) {
                return this.jquery.data(WG.config.kendo.combobox);
            }
            return null;
        }
        reset() {
            if (this.jquery && this.jquery.wg('kendo')) {
                this.kendo.select(-1);
            }
            return this;
        }
        error(bool: boolean) {
            if (this.jquery && this.jquery.wg('kendo')) {
                if (bool == false) {
                    (<JQuery>(<any>this.kendo)._inputWrapper).removeClass(WG.config.kendo.error.class);
                }
                else {
                    (<JQuery>(<any>this.kendo)._inputWrapper).addClass(WG.config.kendo.error.class);
                }
            }
            return this;
        }
    }

    export class ComboBoxConfig implements Wizardsgroup.UI.Kendo.ComboBox.Config {
        constructor(private jquery: JQuery, public options: Wizardsgroup.UI.Kendo.ComboBox.Options) {
        }
        dataSource(data?: any) {
            this.options.dataSource = data;
            return this;
        }
        cascadeFrom(id: string) {
            if (this.jquery) {
                this.jquery.data('cascadefrom', id);
            }
            return this;
        }
        maxLength(int?: number) {
            this.options.maxLength = int;
            return this;
        }
        autoBind(bool: boolean) {
            this.options.autoBind = bool;
            return this;
        }
        value(val: string) {
            if (_.isString(val)) {
                this.options.value = val;
            }
            return this;
        }
    }
}