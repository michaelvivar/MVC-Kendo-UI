module WizFx.UI.Html {
    export class Form extends Element implements Wizardsgroup.UI.Html.Form {
        constructor(id: any) {
            super(id);
        }
        submit() {
            let req = <Wizardsgroup.Ajax.Request.Success>{
                success: function () {
                    return this;
                },
                then: function () {
                },
                failed: function () {
                    return this;
                }
            }
            if (this.jquery) {
                if (_.isFunction(this.jquery.wg('onsubmit')) && this.jquery.wg('onsubmit')(this) == false) {
                    return req;
                }
                this.jquery.find('filter-selected').val('');
                var a = this.jquery.find('select.right-box option').prop('selected', true);
                var b = this.jquery.find('input[data-wg-type="file"]').attr('type', 'text');
                var c = this.jquery.find('[data-wg-readonly="true"]').removeAttr('disabled');
                var data = this.jquery.serialize();
                a.prop('selected', false);
                b.attr('type', 'file');
                c.attr('disabled', 'disabled');
                let request = WG.http.post(this.jquery.url(), data);
                request.then((data: Wizardsgroup.Ajax.Request.ActionResult) => {
                    if (this.jquery.attr('name')) {
                        trigger('form-' + this.jquery.attr('name') + '-submit', data,
                            'wg.bind.form(\'' + this.jquery.attr('name') + '\').submit(function(data) { } )');
                        if (_.has(data, 'ActionStatus')) {
                            if (data.ActionStatus == Status.success) {
                                trigger('form-' + this.jquery.attr('name') + '-success', data,
                                    'wg.bind.form(\'' + this.jquery.attr('name') + '\').submit({ success: function(data) { } })');
                            }
                            else if (data.ActionStatus == Status.failed || data.ActionStatus == Status.warning) {
                                trigger('form-' + this.jquery.attr('name') + '-failed', data,
                                    'wg.bind.form(\'' + this.jquery.attr('name') + '\').submit({ failed: function(data) { } })');
                            }
                        }
                    }
                    if (_.has(data, 'ErrorMessages') && data.ErrorMessages.length > 0) {
                        this.jquery.find('.' + WG.config.kendo.error.class).removeClass(WG.config.kendo.error.class);
                        let errorMsg = '<ul>';
                        _.each(data.ErrorMessages, (item, i) => {
                            errorMsg += '<li>' + item.Message + '</li>';
                            _.each(item.FieldNames, (name, i) => {
                                let j = this.jquery.find('[name="' + name + '"]');
                                switch (j.wg('kendo')) {
                                    case WG.config.kendo.combobox:
                                        wg(j).combobox().error();
                                        break;
                                    case WG.config.kendo.datepicker:
                                        wg(j).datepicker().error();
                                        break;
                                    case WG.config.kendo.datetimepicker:
                                        wg(j).datetimepicker().error();
                                        break;
                                    case WG.config.kendo.maskedtextbox:
                                        wg(j).maskedtextbox().error();
                                        break;
                                    case WG.config.kendo.multiselect:
                                        wg(j).multiselect().error();
                                        break;
                                    case WG.config.kendo.numerictextbox:
                                        wg(j).numerictextbox().error();
                                        break;
                                    case WG.config.kendo.textbox:
                                        wg(j).textbox().error();
                                        break;
                                    case WG.config.kendo.timepicker:
                                        wg(j).timepicker().error();
                                        break;
                                    case WG.config.kendo.upload:
                                        wg(j).fileupload().error();
                                        break;
                                }
                            });
                            errorMsg += '</ul>';
                            $("#errorContainer").find('fieldset').append(errorMsg);
                        });
                    }
                });
                return request;
            }
            return req;
        }
        get bind() {
            return {
                onsubmit: (fn) => {
                    if (this.jquery && _.isFunction(fn)) {
                        this.jquery.wg('onsubmit', fn);
                    }
                    return this;
                }
            }
        }
    }
}