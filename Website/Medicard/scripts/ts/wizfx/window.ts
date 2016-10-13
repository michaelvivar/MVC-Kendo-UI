module WizFx {
    export class Window implements Wizardsgroup.Window {
        redirectTo(url: url) {
            window.location = <any>url;
        }
        get scroll() {
            return {
                top(int?: number) {
                    $('html, body').animate({
                        scrollTop: int || 0
                    },
                        1
                    );
                },
                bottom(int?: number) {
                    $('html, body').animate({
                        scrollTop: $(document).height() - $(window).height()
                    },
                        1
                    );
                }
            }
        }
        get scrollTop() {
            return parent.window.__scrollTop;
        }
        get browser() {
            if ($('html').hasClass('k-ff')) {
                return Browser.firefox;
            }
            else if ($('html').hasClass('k-webkit')) {
                return Browser.chrome;
            }
            else if ($('html').hasClass('k-ie')) {
                return Browser.ie;
            }
        }
    }
}