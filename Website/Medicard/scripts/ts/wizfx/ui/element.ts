module WizFx {
    export module UI {
        export abstract class Element implements IElement {
            jquery: JQuery;
            constructor(id) {
                if (id instanceof jQuery) {
                    this.jquery = id;
                }
                else {
                    this.jquery = $(id);
                }
                this.jquery = (this.jquery.length > 0) ? this.jquery.first() : null;
            }
        }
    }
}