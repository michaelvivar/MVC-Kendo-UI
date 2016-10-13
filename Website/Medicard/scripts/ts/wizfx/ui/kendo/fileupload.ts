module WizFx.UI.Kendo {
    export class Upload extends Base implements Wizardsgroup.UI.Kendo.Upload {
        get kendo(): kendo.ui.Upload {
            if (this.jquery && this.jquery.wg('kendo') == WG.config.kendo.upload) {
                return this.jquery.data(WG.config.kendo.upload);
            }
            return null;
        }
        error(bool: boolean) {
            if (this.kendo) {
                if (bool == false) {
                    this.jquery.parent('.k-upload-button').removeClass(WG.config.kendo.error.class);
                }
                else {
                    this.jquery.parent('.k-upload-button').addClass(WG.config.kendo.error.class);
                }
            }
            return this;
        }
        get bind() {
            return <any>{
                success: (callback) => {
                    if (_.isFunction(callback) && this.kendo) {
                        this.kendo.bind('success', (e) => {
                            invoke(callback, this, e.files[0]);
                        });
                    }
                    return this;
                },
                remove: (callback) => {
                    if (_.isFunction(callback) && this.jquery) {
                        this.kendo.bind('remove', (e) => {
                            invoke(callback, this, e.files[0]);
                        });
                    }
                    return this;
                },
                upload: (callback) => {
                    if (_.isFunction(callback) && this.jquery) {
                        this.kendo.bind('upload', (e) => {
                            invoke(callback, this, e.files[0]);
                        });
                    }
                    return this;
                },
                select: (callback) => {
                    if (_.isFunction(callback) && this.jquery) {
                        this.kendo.bind('select', (e) => {
                            invoke(callback, this, e.files[0]);
                        });
                    }
                    return this;
                },
                error: (callback) => {
                    if (_.isFunction(callback) && this.jquery) {
                        this.kendo.bind('error', (e) => {
                            invoke(callback, this, e.files[0]);
                        });
                    }
                    return this;
                }
            };
        }
    }
    export class UploadConfig implements Wizardsgroup.UI.Kendo.Upload.Config {
        constructor(private jquery: JQuery, public options: Wizardsgroup.UI.Kendo.Upload.Options) {

        }
        autoUpload(bool: boolean) {
            this.options.async.autoUpload = parseBoolean(bool);
            return this;
        }
        batchUpload(bool: boolean) {
            this.options.async.batch = parseBoolean(bool);
            return this;
        }
        saveUrl(url: url) {
            this.options.async.saveUrl = <string>url;
            return this;
        }
        removeUrl(url: url) {
            this.options.async.removeUrl = <string>url;
            return this;
        }
    }
}