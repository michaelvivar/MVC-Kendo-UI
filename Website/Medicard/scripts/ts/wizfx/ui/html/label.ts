module WizFx.UI.Html {
    export class Label extends Element implements Wizardsgroup.UI.Html.Label {
        constructor(jq: JQuery) {
            super(jq);
        }
        hide() {
            if (this.jquery) {
                this.jquery.addClass('hide');
            }
            return this;
        }
        show() {
            if (this.jquery) {
                this.jquery.removeClass('hide');
            }
            return this;
        }
        get text() {
            if (this.jquery) {
                return this.jquery.text();
            }
            return '';
        }
        set text(str: string) {
            if (this.jquery) {
                this.jquery.text(str);
            }
        }
    }
}