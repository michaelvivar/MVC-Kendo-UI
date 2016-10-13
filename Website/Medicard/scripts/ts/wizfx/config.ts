module WizFx {
    export class Config implements Wizardsgroup.Config {
        get url() {
            return {
                host: __baseurl,
                homepage: __baseurl
            }
        }
        get menu() {
            return {
                id: '#wgMenu'
            }
        }
        get tab() {
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
            }
        }
        get modal() {
            return {
                id: '#wgModal',
                gridname: 'ModalGrid'
            }
        }
        get confirm() {
            return {
                id: '#wgConfirm'
            }
        }
        get alert() {
            return {
                id: '#wgAlert'
            }
        }
        get notification() {
            return {
                id: '#wgNotification',
                type: {
                    success: 'Success',
                    info: 'Info',
                    warning: 'Warning',
                    error: 'Error'
                },
                timeOut: 10000
            }
        }
        get kendo() {
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
            }
        }
        get bootstrap() {
            return {
                duallistbox: 'dualListBox'
            }
        }
        get file() {
            return {
                url: {
                    upload: WG.url('FileUpload/Upload'),
                    remove: WG.url('FileUpload/Remove')
                }
            }
        }
    }
}