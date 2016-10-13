module WizFx.UI.Kendo {
    export class Textbox extends Base implements Wizardsgroup.UI.Kendo.TextBox {
        get kendo(): kendo.ui.AutoComplete {
            if (this.jquery && this.jquery.wg('kendo') == WG.config.kendo.textbox) {
                return this.jquery.data('kendoAutoComplete');
            }
            return null;
        }
    }

    export class TextBoxConfig implements Wizardsgroup.UI.Kendo.TextBox.Config {
        constructor(private jquery: JQuery, public options: Wizardsgroup.UI.Kendo.TextBox.Options) {

        }
        value(val: any) {
            this.jquery.val(val);
            return this;
        }
        serverFiltering(bool: boolean) {
            this.options.serverFiltering = bool;
            return this;
        }
        dataSource(data?: any) {
            this.options.dataSource = data;
            return this;
        }
    }
}