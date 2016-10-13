module WizFx.UI.Bootstrap {
    export class Modal extends Element implements Wizardsgroup.UI.Bootstrap.Modal {
        constructor(id: any) {
            super(id);
            this.options = {};
        }
        html(content?: any, callback?: Function) {
            wg(this.jquery.find('.modal-body').first()).html(content, () => {
                trigger('modal-bootstrap-ready', this, 'wg.bind.modal().ready(function(modal) { })');
                trigger('modal-' + this.jquery.find('.modal-title').first().text() + '-ready', this, 'wg.bind.modal(\'' + this.jquery.find('.modal-title').text() + '\').ready(function(modal) { })');
                invoke(callback, this);
                Helper.Modal.ResizeIframe(this);
            });
            return this;
        }
        open(callback?: Function) {
            this.jquery.modal('show');
            this.options.show = true;
            this.jquery.modal(this.options);
            _.delay(() => {
                invoke(callback, this);
            }, 150);
        }
        close(callback?: Function) {
            this.unblock(() => {
                this.jquery.modal('hide');
                invoke(callback, this);
            });
        }
        block(callback?: Function) {
            this.jquery.find('.modal-footer button, .modal-header button').attr('disabled', 'disabled');
            wg(this.jquery.find('.modal-container').first()).block(() => {
                invoke(callback, this);
            });
            return this;
        }
        unblock(callback?: Function) {
            this.jquery.find('.modal-footer button, .modal-header button').removeAttr('disabled');
            wg(this.jquery.find('.modal-container').first()).unblock(() => {
                invoke(callback, this);
            });
            return this;
        }
        form(name?: string) {
            if (arguments.length > 0) {
                return new Html.Form(this.jquery.find('form[name="' + name + '"]'));
            }
            return new Html.Form(this.jquery.find('form').first());
        }
        options: Wizardsgroup.UI.Bootstrap.Modal.Options;
    }
    export class ModalConfig implements Wizardsgroup.UI.Bootstrap.Modal.Config {
        constructor(private _instance: Modal, public options: Wizardsgroup.UI.Bootstrap.Modal.Options) {
            this._instance.jquery.find('.modal-footer').empty();
            this._instance.jquery.find('.modal-title').empty();
            this._instance.jquery.find('.modal-body').empty();
            this._instance.jquery.find('.modal-dialog').first().removeClass('modal-sm').removeClass('modal-md').removeClass('modal-lg')
        }
        title(str: string) {
            this._instance.jquery.find('.modal-title').first().text(str);
            return this;
        }
        width(size: string) {
            if (size == 'lg') {
                size = 'modal-lg';
            }
            else if (size == 'md') {
                size = 'modal-md';
            }
            else if (size == 'sm') {
                size = 'modal-sm';
            }
            this._instance.jquery.find('.modal-dialog').first().addClass(size);
            return this;
        }
        button(text?: string, click?: Function, attributes?: any) {
            if (!_.isFunction(click)) {
                click = () => this._instance.close();
            }
            this._instance.jquery.find('.modal-footer').first().append(
                $('<button></button>').text(text).addClass(<any>Button.primary).click(() => {
                    invoke(click, this._instance);
                }).attr(attributes || {})
            );
            return this;
        }
    }
}

module WizFx.Helper {
    export class Modal {
        static ResizeIframe(modal: UI.Bootstrap.Modal) {
            if (parseInt(modal.jquery.find('.modal-dialog').first().css('top')) + modal.jquery.find('.modal-content').first().outerHeight() > $('body').outerHeight()) {
                WG.iframe.resize(parseInt(modal.jquery.find('.modal-dialog').first().css('top')) + modal.jquery.find('.modal-content').first().outerHeight() + 100);
            }
        }
        static CenterModal(modal: UI.Bootstrap.Modal) {
            var $top = WG.window.scrollTop;
            if (WG.window.browser == Browser.ie) {
                WG.scrollTop = $top;
                modal.jquery.find('.modal-dialog').css('top', 30);
                return;
            }
            if ($top < 30) {
                $top += 30 - $top;
            }
            modal.jquery.find('.modal-dialog').css('top', $top);
            WG.scrollTop = 0;
            WG.iframe.resize();
        }
    }
    export class Alert {
        static CenterModal(modal: UI.Bootstrap.Modal) {
            if ($('.modal[aria-hidden="false"]').length > 1) {
                var $modal: UI.Bootstrap.Modal = <any>wg($('.modal[aria-hidden="false"]').first()).modal();
                var $top = parseInt($modal.jquery.find('.modal-dialog').css('top'));
                var m = $modal.jquery.find('.modal-content').height() / 2;
                var c = modal.jquery.find('.modal-content').height() / 2;
                modal.jquery.find('.modal-dialog').css('top', ($top + (m - c)) - m * 0.2);
            }
            else {
                if (self != top) {
                    modal.jquery.find('.modal-dialog').css('top', WG.window.scrollTop + 30);
                }
                else {
                    modal.jquery.find('.modal-dialog').css('top', WG.window.scrollTop + 80);
                }
            }
        }
    }
    export class Confirm {
        static CenterModal(modal: UI.Bootstrap.Modal) {
            if ($('.modal[aria-hidden="false"]').length > 1) {
                var $modal: UI.Bootstrap.Modal = <any>wg($('.modal[aria-hidden="false"]').first()).modal();
                var $top = parseInt($modal.jquery.find('.modal-dialog').css('top'));
                var m = $modal.jquery.find('.modal-content').height() / 2;
                var c = modal.jquery.find('.modal-content').height() / 2;
                modal.jquery.find('.modal-dialog').css('top', ($top + (m - c)) - m * 0.2);
            }
            else {
                if (self != top) {
                    modal.jquery.find('.modal-dialog').css('top', WG.window.scrollTop + 30);
                }
                else {
                    modal.jquery.find('.modal-dialog').css('top', WG.window.scrollTop + 80);
                }
            }
        }
    }
}