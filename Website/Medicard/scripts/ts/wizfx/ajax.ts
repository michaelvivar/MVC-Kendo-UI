module WizFx.Ajax {
    export class Http implements Wizardsgroup.Ajax.Http {
        get(url: any, data?: any) {
            return new Request($.ajax(<Wizardsgroup.Ajax.Options>{
                url: url,
                data: data,
                dataType: 'html',
                type: 'GET'
            }));
        }
        post(url: any, data?: any) {
            return new Request($.ajax(<Wizardsgroup.Ajax.Options>{
                url: url,
                data: data,
                dataType: 'json',
                type: 'POST'
            }));
        }
        json(url: any, data?: any) {
            return new Request($.ajax(<Wizardsgroup.Ajax.Options>{
                url: url,
                data: data,
                dataType: 'json',
                type: 'GET'
            }));
        }
    }
    class Request {
        constructor(private _request: JQueryXHR) {

        }
        then(callback: (data: any, status: string, xhr: JQueryXHR) => void) {
            this._request.then(callback);
        }
        success(callback: Function) {
            this._request.then((result: Wizardsgroup.Ajax.Request.ActionResult, status, xhr) => {
                if (_.has(result, 'ActionStatus') && result.ActionStatus == Status.success) {
                    invoke(callback, { data: result.DataResult, message: result.Messages, status: result.ActionStatus });
                }
                else {
                    invoke(callback, result);
                }
            });
            return this;
        }
        failed(callback: Function) {
            this._request.then((result: Wizardsgroup.Ajax.Request.ActionResult, status, xhr) => {
                if (_.has(result, 'ActionStatus') && result.ActionStatus != Status.success) {
                    invoke(callback, result);
                }
            });
            return this;
        }
    }
}