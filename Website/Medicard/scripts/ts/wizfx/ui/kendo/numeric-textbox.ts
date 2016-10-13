module WizFx.UI.Kendo {
    export class NumericTextBox extends Base implements Wizardsgroup.UI.Kendo.NumericTextBox {
        get kendo(): kendo.ui.NumericTextBox {
            if (this.jquery && this.jquery.wg('kendo') == WG.config.kendo.numerictextbox) {
                return this.jquery.data(WG.config.kendo.numerictextbox);
            }
            return null;
        }
        min(value: number) {
            if (this.kendo) {
                this.kendo.min(value);
            }
            return this;
        }
        max(value: number) {
            if (this.kendo) {
                this.kendo.max(value);
            }
            return this;
        }
    }
    export class NumericTextBoxConfig implements Wizardsgroup.UI.Kendo.NumericTextBox.Config {
        constructor(private jquery: JQuery, public options: Wizardsgroup.UI.Kendo.NumericTextBox.Options) {

        }
        spinner(bool: boolean) {
            this.options.spinners = bool;
            return this;
        }
        max(value: number) {
            this.options.max = value;
            return this;
        }
        min(value: number) {
            this.options.min = value;
            return this;
        }
        format(str: string) {
            this.options.format = str;
            return this;
        }
        decimals(int: number) {
            this.options.decimals = int;
            return this;
        }
        value(val: number) {
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
}