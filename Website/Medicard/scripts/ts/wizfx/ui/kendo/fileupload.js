var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var WizFx;
(function (WizFx) {
    var UI;
    (function (UI) {
        var Kendo;
        (function (Kendo) {
            var Upload = (function (_super) {
                __extends(Upload, _super);
                function Upload() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(Upload.prototype, "kendo", {
                    get: function () {
                        if (this.jquery && this.jquery.wg('kendo') == WizFx.WG.config.kendo.upload) {
                            return this.jquery.data(WizFx.WG.config.kendo.upload);
                        }
                        return null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Upload.prototype.error = function (bool) {
                    if (this.kendo) {
                        if (bool == false) {
                            this.jquery.parent('.k-upload-button').removeClass(WizFx.WG.config.kendo.error.class);
                        }
                        else {
                            this.jquery.parent('.k-upload-button').addClass(WizFx.WG.config.kendo.error.class);
                        }
                    }
                    return this;
                };
                Object.defineProperty(Upload.prototype, "bind", {
                    get: function () {
                        var _this = this;
                        return {
                            success: function (callback) {
                                if (_.isFunction(callback) && _this.kendo) {
                                    _this.kendo.bind('success', function (e) {
                                        invoke(callback, _this, e.files[0]);
                                    });
                                }
                                return _this;
                            },
                            remove: function (callback) {
                                if (_.isFunction(callback) && _this.jquery) {
                                    _this.kendo.bind('remove', function (e) {
                                        invoke(callback, _this, e.files[0]);
                                    });
                                }
                                return _this;
                            },
                            upload: function (callback) {
                                if (_.isFunction(callback) && _this.jquery) {
                                    _this.kendo.bind('upload', function (e) {
                                        invoke(callback, _this, e.files[0]);
                                    });
                                }
                                return _this;
                            },
                            select: function (callback) {
                                if (_.isFunction(callback) && _this.jquery) {
                                    _this.kendo.bind('select', function (e) {
                                        invoke(callback, _this, e.files[0]);
                                    });
                                }
                                return _this;
                            },
                            error: function (callback) {
                                if (_.isFunction(callback) && _this.jquery) {
                                    _this.kendo.bind('error', function (e) {
                                        invoke(callback, _this, e.files[0]);
                                    });
                                }
                                return _this;
                            }
                        };
                    },
                    enumerable: true,
                    configurable: true
                });
                return Upload;
            }(Kendo.Base));
            Kendo.Upload = Upload;
            var UploadConfig = (function () {
                function UploadConfig(jquery, options) {
                    this.jquery = jquery;
                    this.options = options;
                }
                UploadConfig.prototype.autoUpload = function (bool) {
                    this.options.async.autoUpload = parseBoolean(bool);
                    return this;
                };
                UploadConfig.prototype.batchUpload = function (bool) {
                    this.options.async.batch = parseBoolean(bool);
                    return this;
                };
                UploadConfig.prototype.saveUrl = function (url) {
                    this.options.async.saveUrl = url;
                    return this;
                };
                UploadConfig.prototype.removeUrl = function (url) {
                    this.options.async.removeUrl = url;
                    return this;
                };
                return UploadConfig;
            }());
            Kendo.UploadConfig = UploadConfig;
        })(Kendo = UI.Kendo || (UI.Kendo = {}));
    })(UI = WizFx.UI || (WizFx.UI = {}));
})(WizFx || (WizFx = {}));
//# sourceMappingURL=fileupload.js.map