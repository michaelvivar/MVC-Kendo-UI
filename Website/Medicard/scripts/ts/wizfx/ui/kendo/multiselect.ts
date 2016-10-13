module WizFx.UI.Kendo {
    export class MultiSelect extends Base implements Wizardsgroup.UI.Kendo.MultiSelect {
        get kendo(): kendo.ui.MultiSelect {
            if (this.jquery && this.jquery.wg('kendo') == WG.config.kendo.multiselect) {
                return this.jquery.data(WG.config.kendo.multiselect);
            }
            return null;
        }
        reset() {
            this.value = [];
            return this;
        }
    }
    export class MultiSelectConfig implements Wizardsgroup.UI.Kendo.MultiSelect.Config {
        constructor(private jquery: JQuery, public options: Wizardsgroup.UI.Kendo.MultiSelect.Options) {

        }
        dataSource(data?: any) {
            this.options.dataSource = data;
            return this;
        }
        serverFiltering(bool: boolean) {
            this.options.serverFiltering = bool;
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
        value(val: any) {
            if (_.isString(val)) {
                val = [val];
            }
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