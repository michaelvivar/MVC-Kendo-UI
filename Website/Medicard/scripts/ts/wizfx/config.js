var WizFx;
(function (WizFx) {
    var Config = (function () {
        function Config() {
        }
        Object.defineProperty(Config.prototype, "url", {
            get: function () {
                return {
                    host: __baseurl,
                    homepage: __baseurl
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Config.prototype, "menu", {
            get: function () {
                return {
                    id: '#wgMenu'
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Config.prototype, "tab", {
            get: function () {
                return {
                    id: '#wgTab',
                    height: 500,
                    animation: false,
                    button: {
                        close: '<span class="ui-icon-close glyphicon glyphicon-remove"></span>'
                    },
                    iframe: {
                        name: 'Tab',
                        frameborder: 0,
                        scrolling: 'no',
                        width: '100%',
                        height: 500
                    }
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Config.prototype, "modal", {
            get: function () {
                return {
                    id: '#wgModal',
                    gridname: 'ModalGrid'
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Config.prototype, "confirm", {
            get: function () {
                return {
                    id: '#wgConfirm'
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Config.prototype, "alert", {
            get: function () {
                return {
                    id: '#wgAlert'
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Config.prototype, "notification", {
            get: function () {
                return {
                    id: '#wgNotification',
                    type: {
                        success: 'Success',
                        info: 'Info',
                        warning: 'Warning',
                        error: 'Error'
                    },
                    timeOut: 10000
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Config.prototype, "kendo", {
            get: function () {
                return {
                    textbox: 'kendoAutoComplete',
                    combobox: 'kendoComboBox',
                    multiselect: 'kendoMultiSelect',
                    maskedtextbox: 'kendoMaskedTextBox',
                    numerictextbox: 'kendoNumericTextBox',
                    datepicker: 'kendoDatePicker',
                    datetimepicker: 'kendoDateTimePicker',
                    timepicker: 'kendoTimePicker',
                    upload: 'kendoUpload',
                    tabstrip: 'kendoTabStrip',
                    accordion: 'kendoPanelBar',
                    contextmenu: 'kendoContextMenu',
                    grid: 'kendoGrid',
                    //gridcolumnsetting: 'DB',
                    gridcolumnsetting: 'JSON',
                    error: {
                        class: 'error-field',
                    },
                    folder: {
                        gridsetting: 'json'
                    }
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Config.prototype, "bootstrap", {
            get: function () {
                return {
                    duallistbox: 'dualListBox'
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Config.prototype, "file", {
            get: function () {
                return {
                    url: {
                        upload: WizFx.WG.url('FileUpload/Upload'),
                        remove: WizFx.WG.url('FileUpload/Remove')
                    }
                };
            },
            enumerable: true,
            configurable: true
        });
        return Config;
    }());
    WizFx.Config = Config;
})(WizFx || (WizFx = {}));
//# sourceMappingURL=config.js.map