module WizFx.UI {
    export module Kendo {
        export abstract class Base extends Element {
            kendo: any;
            get label() {
                if (this.jquery) {
                    return new Html.Label((<JQuery>this.container).find('label[for="' + this.jquery.attr('name') + '"]'));
                }
                return null;
            }
            show() {
                if (this.jquery) {
                    if (this.kendo) {
                        this.jquery.parents('.k-widget').first().removeClass('hide');
                    }
                    else {
                        this.jquery.removeClass('hide');
                    }
                }
                return <any>this;
            }
            hide() {
                if (this.jquery) {
                    if (this.kendo) {
                        this.jquery.parents('.k-widget').first().addClass('hide');
                    }
                    else {
                        this.jquery.addClass('hide');
                    }
                }
                return <any>this;
            }
            read() {
                if (this.jquery && this.jquery.wg('kendo')) {
                    this.kendo.dataSource.read();
                    this.kendo.refresh();
                }
                return <any>this;
            }
            get data() {
                if (this.jquery && this.jquery.wg('kendo') && _.has(this.kendo, 'dataSource')) {
                    return this.kendo.dataSource.data();
                }
            }
            set data(obj: any) {
                if (this.jquery && this.jquery.wg('kendo') && _.has(this.kendo, 'dataSource')) {
                    this.kendo.setDataSource(obj);
                }
            }
            get value() {
                if (this.jquery) {
                    let $value;
                    if (this.kendo) {
                        $value = this.kendo.value();
                    }
                    else {
                        $value = this.jquery.val();
                    }
                    if (!_.isNull($value) && ($value != Guid.empty())) {
                        if (_.isArray($value)) {
                            let $clean = [];
                            _.each($value, (i, k) => {
                                if (!_.isEmpty(i)) {
                                    $clean.push(i);
                                }
                            });
                            return $clean;
                        }
                        return $value;
                    }
                }
            }
            set value(val: any) {
                if (this.jquery) {
                    if (this.jquery.wg('kendo')) {
                        this.kendo.value(val);
                    }
                    else {
                        this.jquery.val(val);
                    }
                    this.jquery.trigger('cascade');
                }
            }
            get text() {
                if (this.jquery) {
                    if (this.jquery.wg('kendo')) {
                        return this.kendo.text();
                    }
                    else {
                        return this.jquery.text();
                    }
                }
            }
            set text(str: string) {
                if (this.jquery) {
                    if (this.jquery.wg('kendo')) {
                        this.kendo.text(str);
                    }
                    else {
                        this.jquery.text(str);
                    }
                }
            }
            error(bool: boolean) {
                if (this.jquery) {
                    if (bool == false) {
                        this.jquery.parents('.k-widget').first().removeClass(WG.config.kendo.error.class);
                    }
                    else {
                        this.jquery.parents('.k-widget').first().addClass(WG.config.kendo.error.class);
                    }
                }
                return <any>this;
            }
            readonly(bool?: boolean) {
                if (this.jquery) {
                    bool = _.isUndefined(bool) ? true : bool;
                    if (this.jquery.wg('kendo')) {
                        this.kendo.enable(!bool);
                        this.jquery.wg('readonly', bool);
                    }
                }
                return <any>this;
            }
            get cascadefrom() {
                return new CascadeFrom(<any>this);
            }
            get bind() {
                return {
                    change: (callback) => {
                        if (this.jquery) {
                            this.jquery.bind('cascade', () => {
                                invoke(callback, this);
                            });
                        }
                        return <any>this;
                    }
                }
            }
            get container() {
                return this.jquery.wg('container') || $('body');
            }
            set container(object: any) {
                if (this.jquery) {
                    if (!(object instanceof jQuery)) {
                        object = $(object);
                    }
                    this.jquery.wg('container', object);
                }
            }
        }
    }
}