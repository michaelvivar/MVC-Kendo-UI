module WizFx.UI.Kendo {
    export class MaskedTextBox extends Base implements Wizardsgroup.UI.Kendo.MaskedTextBox {
        get kendo(): kendo.ui.MaskedTextBox {
            if (this.jquery && this.jquery.wg('kendo') == WG.config.kendo.maskedtextbox) {
                return this.jquery.data(WG.config.kendo.maskedtextbox);
            }
            return null;
        }
    }
    export class MaskedTextBoxConfig implements Wizardsgroup.UI.Kendo.MaskedTextBox.Config {
        constructor(private jquery: JQuery, public options: Wizardsgroup.UI.Kendo.MaskedTextBox.Options) {

        }
        mask(str: string) {
            this.options.mask = str;
            return this;
        }
        value(val: any) {
            this.options.value = val;
            return this;
        }
    }
}