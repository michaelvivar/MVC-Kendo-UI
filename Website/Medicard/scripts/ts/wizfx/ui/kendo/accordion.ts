module WizFx.UI.Kendo {
    export class Accordion extends Base implements Wizardsgroup.UI.Kendo.Accordion {
        get kendo(): kendo.ui.PanelBar {
            if (this.jquery && this.jquery.wg('kendo') == WG.config.kendo.accordion) {
                return this.jquery.data(WG.config.kendo.accordion);
            }
            return null;
        }
        get bind() {
            return <any>{
                expand: (item, callback) => {
                    if (this.jquery) {
                        let arrayName: string[] = [];
                        if (_.isString(item)) {
                            arrayName = (<string>item).split(',');
                        }
                        else if (_.isArray(item)) {
                            arrayName = item;
                        }
                        if (_.isFunction(item)) {
                            this.jquery.find('li.k-item .k-header').each(function () {
                                arrayName.push($(this).text());
                            });
                            callback = item;
                        }
                        if (_.isFunction(callback)) {
                            _.each(arrayName, (name, i) => {
                                this.jquery.bind((name + '-expand').trimEventName(), (e, i) => {
                                    invoke(callback, this, i);
                                });
                            });
                        }
                    }
                    return <any>this;
                },
                collapse: (item, callback) => {
                    if (this.jquery) {
                        let arrayName: string[] = [];
                        if (_.isString(item)) {
                            arrayName = (<string>item).split(',');
                        }
                        else if (_.isArray(item)) {
                            arrayName = item;
                        }
                        if (_.isFunction(item)) {
                            this.jquery.find('li.k-item .k-header').each(function () {
                                arrayName.push($(this).text());
                            });
                            callback = item;
                        }
                        if (_.isFunction(callback)) {
                            _.each(arrayName, (name, i) => {
                                this.jquery.bind((name + '-collapse').trimEventName(), (e, i) => {
                                    invoke(callback, this, i);
                                });
                            });
                        }
                    }
                    return <any>this;
                },
                load: (item, callback) => {
                    if (this.jquery) {
                        let arrayName: string[] = [];
                        if (_.isString(item)) {
                            arrayName = (<string>item).split(',');
                        }
                        else if (_.isArray(item)) {
                            arrayName = item;
                        }
                        if (_.isFunction(item)) {
                            this.jquery.find('li.k-item .k-header').each(function () {
                                arrayName.push($(this).text());
                            });
                            callback = item;
                        }
                        if (_.isFunction(callback)) {
                            _.each(arrayName, (name, i) => {
                                this.jquery.bind((name + '-load').trimEventName(), (e, i) => {
                                    invoke(callback, this, i);
                                });
                            });
                        }
                    }
                    return <any>this;
                }
            }
        }
    }
    export class AccordionConfig implements Wizardsgroup.UI.Kendo.Accordion.Config {
        constructor(private jquery: JQuery, public options: Wizardsgroup.UI.Kendo.Accordion.Options) {
            this.options.items = [];
        }
        expandMode(mode: string) {
            this.options.expandMode = mode;
            return this;
        }
        addItem(title?: string, content?: any, expanded?: boolean) {
            if (this.jquery) {
                this.jquery.empty();
            }
            this.options.items.push({
                text: title,
                contentUrl: _.isUrl(content) ? content : undefined,
                content: _.isUrl(content) ? undefined : content,
                expanded: expanded || false
            });
            return this;
        }
    }
}