module WizFx {
    export class Bind implements Wizardsgroup.Bind {
        form(name?: any) {
            name = (_.isString(name) ? (<string>name).split(',') : name);
            return {
                submit: (callback: Function) => {
                    if (_.isFunction(callback)) {
                        Helper.Bind.Event(name, 'form', 'submit', callback);
                    }
                    else {
                        if (_.has(callback, 'success')) {
                            Helper.Bind.Event(name, 'form', 'success', (<any>callback).success);
                        }
                        if (_.has(callback, 'failed')) {
                            Helper.Bind.Event(name, 'form', 'failed', (<any>callback).failed);
                        }
                    }
                }
            }
        }
        grid(name?: any) {
            name = (_.isString(name) ? (<string>name).split(',') : name);
            return {
                refresh: (callback: Function) => {
                    Helper.Bind.Event(name, 'grid', 'refresh', callback);
                },
                databound: (callback: Function) => {
                    Helper.Bind.Event(name, 'grid', 'databound', callback);
                }
            }
        }
        modal(name?: any) {
            if (name) {
                name = (_.isString(name) ? (<string>name).split(',') : name);
            }
            else {
                name = ['bootstrap'];
            }
            return {
                open: (callback: Function) => {
                    Helper.Bind.Event(name, 'modal', 'open', callback);
                },
                close: (callback: Function) => {
                    Helper.Bind.Event(name, 'modal', 'close', callback);
                },
                ready: (callback: Function) => {
                    Helper.Bind.Event(name, 'modal', 'ready', callback);
                }
            }
        }
    }
}

module WizFx.Helper {
    export class Bind {
        static Event(nameArray: string[], element: string, event: string, callback: Function): void {
            if ((!nameArray) || nameArray.length == 0) {
                $(document).bind((element + '-' + event).trimEventName(), (e, o) => {
                    invoke(callback, o);
                });
            }
            else {
                $.each(nameArray, (index, value) => {
                    $(document).bind((<string>element + '-' + value + '-' + event).trimEventName(), (e, o) => {
                        invoke(callback, o);
                    });
                });
            }
        }
    }
}