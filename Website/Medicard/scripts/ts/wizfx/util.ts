(($: JQueryStatic) => {
    $.fn.wg = function (key?: string, data?: any) {
        if (arguments.length > 1) {
            $(this).data('wg-' + key, data);
            return this;
        }
        else {
            return $(this).data('wg-' + key);
        }
    };
    $.fn.url = function (data: any) {
        var $url = $(this).data('url') || $(this).data('view') || $(this).attr('action') || undefined;
        if ($url) {
            if (data) {
                $url = $url + '/?';
                let $data = [];
                let $keys = _.keys(data);
                _.each($keys, (k, i) => {
                    $data.push(k + '=' + data[k]);
                });
                $url = $url + $data.join('&');
            }
            return __baseurl + $url.replace(/\/+/g, '/').replace(/^\//, '');
        }
    }
    $.fn.filterByText = function (textBox, timeout) {
        return this.each(function () {
            var select = this;
            $(textBox).bind('change keyup blur input', function () {
                var options = [];
                options = $(select).data('options');

                if (!options || !(options.length > 0)) {
                    return;
                }

                _.delay(function () {
                    var search = $.trim($(textBox).val());
                    var regex = new RegExp(search, 'gi');

                    $.each(options, function (i) {
                        if (options[i].Text.match(regex) === null) {
                            $(select).find($('option[value="' + options[i].Value + '"]')).remove();
                        } else {
                            if ($(select).find($('option[value="' + options[i].Value + '"]')).length == 0) {
                                $(select).prepend($('<option></option>', { value: options[i].Value, text: options[i].Text }));
                            }
                        }
                    });

                    $(select).sortOptions();

                }, timeout);
            });
        });
    };

    $.fn.isVisible = function () {
        return !($(this).css('visibility') == 'hidden' || $(this).css('display') == 'none');
    };

    $.fn.sortOptions = function () {
        return this.each(function () {
            $(this).append($(this).find('option').remove().sort(function (a, b) {
                var at = $(a).text(), bt = $(b).text();
                return (at > bt) ? 1 : ((at < bt) ? -1 : 0);
            }));
        });
    };
    $.fn.center = function () {
        this.css("position", "absolute");
        this.css("top", (this.parent().height() - this.height()) / 2 + $(window).scrollTop() + "px");
        this.css("left", (this.parent().width() - this.width()) / 2 + $(window).scrollLeft() + "px");
        return this;
    };
    $.fn.hasChild = function (selector) {
        return $(this).find(selector).length > 0 ? true : false;
    };
    $.fn.attributes = function () {
        var attributes = {};

        if (this.length) {
            $.each(this[0].attributes, function (index, attr) {
                attributes[attr.name] = attr.value;
            });
        }

        return attributes;
    };
})(jQuery);

_.mixin({
    isGuid: (str: any) => {
        return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test($(this).val() || '');
    },
    isUrl: (str: any) => {
        return /^((http|https):\/\/)(www\.)?[a-z0-9\-\.]{3,}/.test(str || '');
    }
});

class Guid {
    static new(): string {
        var $guid = new Guid();
        return $guid.char4() + $guid.char4() + '-' + $guid.char4() + '-' + $guid.char4() + '-' + $guid.char4() + $guid.char4() + $guid.char4() + $guid.char4();
    }
    static empty(): string {
        return '00000000-0000-0000-0000-000000000000';
    }
    char4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
}

function parseBoolean(obj: any): boolean {
    if (obj === true || obj == 'true' || obj == 'True' || obj === 1 || obj == '1') {
        return true;
    }
    else if (obj === false || obj == 'false' || obj == 'False' || obj === 0 || obj == '0') {
        return false;
    }
}

function invoke(fn: Function, ...args: any[]) {
    if (_.isFunction(fn)) {
        fn(args[0], args[1], args[2]);
    }
}

function trigger(event: string, data?: any, log?: string) {
    if (_.isString(log)) {
        console.info(log);
    }
    $(document).trigger(event.trimEventName(), data);
}

String.prototype.trimEventName = function () {
    var event = this;
    event = event.toLowerCase().replace(/\s+/g, '');
    return event.replace(/[^\w\s\-]/gi, '');
}
String.prototype.toTitle = function () {
    var str = this;
    return (str || '').replace('_', ' ').replace(/[A-Z]/g, function (v, i) {
        return i === 0 ? v.toUpperCase() : ((str[i - 1] || '').match(/[a-z]/) ? ' ' : '') + v.toUpperCase();
    });
};