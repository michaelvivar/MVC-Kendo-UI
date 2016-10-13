var WizFx;
(function (WizFx) {
    var Ajax;
    (function (Ajax) {
        var Http = (function () {
            function Http() {
            }
            Http.prototype.get = function (url, data) {
                return new Request($.ajax({
                    url: url,
                    data: data,
                    dataType: 'html',
                    type: 'GET'
                }));
            };
            Http.prototype.post = function (url, data) {
                return new Request($.ajax({
                    url: url,
                    data: data,
                    dataType: 'json',
                    type: 'POST'
                }));
            };
            Http.prototype.json = function (url, data) {
                return new Request($.ajax({
                    url: url,
                    data: data,
                    dataType: 'json',
                    type: 'GET'
                }));
            };
            return Http;
        }());
        Ajax.Http = Http;
        var Request = (function () {
            function Request(_request) {
                this._request = _request;
            }
            Request.prototype.then = function (callback) {
                this._request.then(callback);
            };
            Request.prototype.success = function (callback) {
                this._request.then(function (result, status, xhr) {
                    if (_.has(result, 'ActionStatus') && result.ActionStatus == Status.success) {
                        invoke(callback, { data: result.DataResult, message: result.Messages, status: result.ActionStatus });
                    }
                    else {
                        invoke(callback, result);
                    }
                });
                return this;
            };
            Request.prototype.failed = function (callback) {
                this._request.then(function (result, status, xhr) {
                    if (_.has(result, 'ActionStatus') && result.ActionStatus != Status.success) {
                        invoke(callback, result);
                    }
                });
                return this;
            };
            return Request;
        }());
    })(Ajax = WizFx.Ajax || (WizFx.Ajax = {}));
})(WizFx || (WizFx = {}));
//# sourceMappingURL=ajax.js.map