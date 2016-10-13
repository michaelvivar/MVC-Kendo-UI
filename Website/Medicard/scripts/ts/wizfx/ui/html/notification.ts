module WizFx.UI.Html {
    export class Notification extends Element implements Wizardsgroup.UI.Html.Notification {
        constructor(id: any) {
            super(id);
            this.jquery.click(function () {
                clearTimeout(Helper.Notification.time);
                $(this).slideUp();
            });
        }
        success(msg: string) {
            Helper.Notification.displayMessage(this, WG.config.notification.type.success, msg);
        }
        info(msg: string) {
            Helper.Notification.displayMessage(this, WG.config.notification.type.info, msg);
        }
        warning(msg: string) {
            Helper.Notification.displayMessage(this, WG.config.notification.type.warning, msg);
        }
        error(msg: string) {
            Helper.Notification.displayMessage(this, WG.config.notification.type.error, msg);
        }
        display(result: Wizardsgroup.Ajax.Request.Result) {
            Helper.Notification.displayMessage(this, result.status, result.message);
        }
    }
}

module WizFx.Helper {
    export class Notification {
        static time: any;
        static displayMessage(notification: UI.Html.Notification, type: string, msg: string) {
            clearTimeout(Notification.time);
            var $color: Color;
            notification.jquery.slideUp(() => {
                setTimeout(() => {
                    notification.jquery.css({ 'padding-left': 10 });
                    switch (type.toLowerCase()) {
                        case WG.config.notification.type.success.toLowerCase():
                            $color = Color.green;
                            break;
                        case WG.config.notification.type.info.toLowerCase():
                            $color = Color.blue;
                            break;
                        case WG.config.notification.type.warning.toLowerCase():
                            $color = Color.orange;
                            break;
                        case WG.config.notification.type.error.toLowerCase():
                            $color = Color.red;
                            break;
                    }
                    notification.jquery.css({
                        'background-color': $color
                    }).text(msg).slideDown();
                }, 300);
            });

            Notification.time = setTimeout(() => {
                notification.jquery.slideUp(() => {
                    notification.jquery.text('');
                });
            }, WG.config.notification.timeOut);
        }
    }
}