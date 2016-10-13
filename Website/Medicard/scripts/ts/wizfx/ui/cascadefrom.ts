module WizFx.UI {
    export class CascadeFrom {
        constructor(private _element: IElement) {

        }
        get value() {
            if (this._element.jquery) {
                let $cascadefrom: JQuery = this._element.jquery.data('cascadefrom');
                if ($cascadefrom && _.isString($cascadefrom)) {
                    if (/^#/.test(<any>$cascadefrom)) {
                        $cascadefrom = $($cascadefrom).first();
                    }
                    else {
                        $cascadefrom = $('#' + $cascadefrom).first();
                    }
                    if ($cascadefrom.length > 0) {
                        let $kendo = ($cascadefrom.wg('kendo') ? $cascadefrom.data($cascadefrom.wg('kendo')) : null);
                        let $value;
                        if ($kendo) {
                            $value = $kendo.value();
                        }
                        else {
                            $value = $cascadefrom.val();
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
            }
        }
        get bind() {
            return {
                change: (fn: Function) => {
                    let $cascadefrom: JQuery = this._element.jquery.data('cascadefrom');
                    if ($cascadefrom && _.isString($cascadefrom)) {
                        if (/^#/.test(<any>$cascadefrom)) {
                            $cascadefrom = $($cascadefrom).first();
                        }
                        else {
                            $cascadefrom = $('#' + $cascadefrom).first();
                        }
                        if ($cascadefrom.length > 0) {
                            $cascadefrom.bind('cascade', () => {
                                invoke(fn, this._element);
                            });
                        }
                    }
                    return this;
                }
            }
        }
    }
}