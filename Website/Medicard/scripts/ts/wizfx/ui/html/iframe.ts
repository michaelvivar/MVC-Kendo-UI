module WizFx.UI.Html {
    export class Iframe implements Wizardsgroup.UI.Html.Iframe {
        resize(int?: number) {
            var jquery: JQuery = $(WG.config.tab.id).find('.k-state-active iframe').first();
            if (parseInt(<any>int) < WG.config.tab.height) {
                int = WG.config.tab.height;
            }
            if (WG.config.tab.animation) {
                jquery.animate({ height: int }, 500);
            }
            else {
                jquery.height(int);
            }
        }
    }
}

module WizFx.Helper {
    export class IFrame {
        static getHeight() {
            var height = $('body').outerHeight();
            return (height > WG.config.tab.height) ? height + 50 : WG.config.tab.height;
        }
    }
}