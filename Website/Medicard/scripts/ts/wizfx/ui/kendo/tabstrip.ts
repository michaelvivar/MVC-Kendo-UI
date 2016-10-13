module WizFx.UI.Kendo {
    export class TabStrip extends Base implements Wizardsgroup.UI.Kendo.TabStrip {
        get kendo(): kendo.ui.TabStrip {
            if (this.jquery && this.jquery.wg('kendo') == WG.config.kendo.tabstrip) {
                return this.jquery.data(WG.config.kendo.tabstrip);
            }
            return null;
        }
        add(title?: string, url?: url, key?: string, x?: boolean) {
            if (this.kendo) {
                if (this.jquery.find('.k-tabstrip-items li.k-item[data-key="' + key + '"]').length > 0) {
                    this.activate(key);
                    return this;
                }
                (<any>this.kendo).append(
                    [{
                        text: title + ((x === false) ? '' : '<span class="ui-icon-close glyphicon glyphicon-remove"></span>'),
                        encoded: false,
                        contentUrl: url
                    }],
                    (<kendo.ui.TabStrip>this.kendo).tabGroup.children().eq(0)
                );

                var index = parseInt(<any>(this.jquery.find('li.k-item').length - 1));
                (<kendo.ui.TabStrip>this.kendo).select(index);
                this.jquery.find('.k-tabstrip-items li:last-child').attr({ 'data-key': key }).find('.k-link span').attr('data-key', key);
            }
            return this;
        }
        activate(key: string) {
            if (this.kendo) {
                var $index = 0;
                this.jquery.find('li.k-item').each(function (i) {
                    if ($(this).data('key') == key) {
                        $index = i;
                    }
                });
                (<kendo.ui.TabStrip>this.kendo).select($index);
                //this.jquery.find('.k-tabstrip-items .k-state-active').attr('data-tabindex', TabStrip.index++);
                WG.iframe.resize();
            }
            return this;
        }
        remove(key: string) {
            if (this.jquery) {
                this.jquery.find('li.k-item').each(() => {
                    if ($(this).data('key') == key) {
                        this.kendo.remove(<any>$(this))
                    }
                });
                var index = 0;
                this.jquery.find('li.k-item').each(function () {
                    if (index < parseInt($(this).attr('data-tabindex'))) {
                        index = parseInt($(this).attr('data-tabindex'));
                    }
                });
                this.activate(this.jquery.find('li[data-tabindex="' + index + '"]').data('key'));
            }
            return this;
        }
        get bind() {
            return <any>{
                load: (item, callback) => {
                    if (this.jquery) {
                        let arrayName: string[] = [];
                        if (_.isString(item)) {
                            arrayName = (<string>item).split(',');
                        }
                        else if (_.isArray(item)) {
                            arrayName = item;
                        }
                        if (_.isFunction(callback)) {
                            _.each(arrayName, (name, i) => {
                                this.jquery.bind((name + '-load').trimEventName(), (e, data: { content: JQuery, element: JQuery }) => {
                                    invoke(callback, this, data.content, data.element);
                                });
                            });
                        }
                    }
                    return <any>this;
                }
            }
        }
    }
    export class TabStripConfig implements Wizardsgroup.UI.Kendo.TabStrip.Config {
        options: Wizardsgroup.UI.Kendo.TabStrip.Options;
        constructor(private jquery: JQuery, options: Wizardsgroup.UI.Kendo.TabStrip.Options) {
            this.options = options;
        }
    }

    export class Tab extends TabStrip {
        add(title?: string, url?: url, key?: string, x?: boolean) {
            if (this.kendo) {
                if (this.jquery.find('.k-tabstrip-items li.k-item[data-key="' + key + '"]').length > 0) {
                    this.activate(key);
                    return this;
                }
                (<any>this.kendo).append(
                    [{
                        text: title + ((x === false) ? '' : WG.config.tab.button.close),
                        encoded: false,
                        content: $('<div></div>').append($('<iframe></iframe>')
                            .attr($.extend(WG.config.tab.iframe, { name: title, src: url }))
                        ).html()
                    }],
                    this.kendo.tabGroup.children().eq(0)
                );

                var index = parseInt(<any>(this.jquery.find('li.k-item').length - 1));
                this.kendo.select(index);

                this.jquery.find('.k-tabstrip-items .k-state-active').attr({ 'data-key': key }).find('.k-link span').attr('data-key', key);
            }
            WG.window.scroll.top();
            return this;
        }
    }
}

module WizFx.Helper {
    export class TabStrip {
        static index: number = 0;
        static ContentLoad(tabstrip: UI.Kendo.TabStrip) {
            return (e) => {
                if (tabstrip.jquery) {
                    var $html = $(e.contentElement).html();
                    var $tab = $('<div></div>', { 'data-container': 'tab' });
                    $tab.html($html);
                    wg(e.contentElement).html($tab, () => {
                        tabstrip.jquery.trigger(($(e.item).text() + '-load').trimEventName(), { content: $(e.contentElement), element: $(e.item) });
                    });
                }
            }
        }
        static OnClose(tabstrip: UI.Kendo.TabStrip, jq: JQuery) {
            if (tabstrip.jquery) {
                var key = jq.parents('li[role="tab"]').data('key');
                //wg($tabstrip.jquery).trigger('tabstrip-removed', key);
                trigger('tabstrip-removed', key);
                (<kendo.ui.TabStrip>tabstrip.kendo).remove(<any>jq.parents('li[role="tab"]'));
                var index = 0;
                tabstrip.jquery.find('li.k-item').each(function () {
                    if (index < parseInt($(this).attr('data-tabindex'))) {
                        index = parseInt($(this).attr('data-tabindex'));
                    }
                });
                tabstrip.activate(tabstrip.jquery.find('li[data-tabindex="' + index + '"]').data('key'));
            }
        }
    }
}