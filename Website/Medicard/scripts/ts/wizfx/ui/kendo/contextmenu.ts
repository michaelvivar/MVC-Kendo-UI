module WizFx.UI.Kendo {
    export class ContextMenu extends Base implements Wizardsgroup.UI.Kendo.ContextMenu {
        get kendo(): kendo.ui.ContextMenu {
            if (this.jquery && this.jquery.wg('kendo') == WG.config.kendo.contextmenu) {
                return this.jquery.data(WG.config.kendo.contextmenu);
            }
            return null;
        }
        open(callback?: Function) {
            invoke(callback, this);
            return this;
        }
    }
    export class ContextMenuConfig implements Wizardsgroup.UI.Kendo.ContextMenu.Config {
        constructor(private jquery: JQuery, public options: Wizardsgroup.UI.Kendo.ContextMenu.Options) {

        }
        target(selector: string) {
            this.options.target = selector;
        }
    }
}