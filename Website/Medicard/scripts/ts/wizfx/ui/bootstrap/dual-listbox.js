var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var WizFx;
(function (WizFx) {
    var UI;
    (function (UI) {
        var Bootstrap;
        (function (Bootstrap) {
            var DualListBox = (function (_super) {
                __extends(DualListBox, _super);
                function DualListBox(id) {
                    _super.call(this, id);
                }
                Object.defineProperty(DualListBox.prototype, "left", {
                    get: function () {
                        return this.jquery.parents('[data-wg="dualListBox"]').find('.left-box').first();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DualListBox.prototype, "right", {
                    get: function () {
                        return this.jquery;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DualListBox.prototype, "cascadefrom", {
                    get: function () {
                        return new UI.CascadeFrom(this);
                    },
                    enumerable: true,
                    configurable: true
                });
                DualListBox.prototype.error = function (bool) {
                    if (bool) {
                        this.jquery.addClass(WizFx.WG.config.kendo.error.class);
                    }
                    else {
                        this.jquery.removeClass(WizFx.WG.config.kendo.error.class);
                    }
                    return this;
                };
                DualListBox.prototype.move = function (button) {
                    var _this = this;
                    var btn;
                    switch (button) {
                        case 'left':
                        case 4:
                            btn = 4;
                            break;
                        case 'left-all':
                        case 3:
                            btn = 3;
                            break;
                        case 'right':
                        case 1:
                            btn = 1;
                            break;
                        case 'right-all':
                        case 2:
                            btn = 2;
                            break;
                    }
                    var $container = this.jquery.parents('[data-wg="dualListBox"]').first();
                    var $left = $container.find('select.left-box');
                    var $right = this.jquery;
                    var $data = {
                        left: $left.data('options'),
                        right: $right.data('options')
                    };
                    var $moved = [];
                    if (btn == 4 || btn == 3) {
                        ((btn == 4) ? $right.find('option') : $right.find('option:selected')).each(function () {
                            $data.left.push({
                                Text: $(this).text(),
                                Value: $(this).attr('value')
                            });
                            $moved.push({
                                Text: $(this).text(),
                                Value: $(this).attr('value')
                            });
                            $(this).remove().appendTo($left);
                        });
                        var $list = [];
                        $.each($data.right, function (key, item) {
                            if (!_.find($moved, function (o) { return o.Value == item['Value']; })) {
                                $list.push(item);
                            }
                        });
                        $right.data('options', $list);
                        $left.data('options', $data.left);
                    }
                    else {
                        ((btn == 1) ? $left.find('option') : $left.find('option:selected')).each(function () {
                            $moved.push({
                                Text: $(this).text(),
                                Value: $(this).attr('value')
                            });
                            $data.right.push({
                                Text: $(this).text(),
                                Value: $(this).attr('value')
                            });
                            $(this).remove().appendTo($right);
                        });
                        var $list = [];
                        $.each($data.left, function (key, item) {
                            if (!_.find($moved, function (o) { return o.Value == item['Value']; })) {
                                $list.push(item);
                            }
                        });
                        $left.data('options', $list);
                        $right.data('options', $data.right);
                    }
                    if (!($left.find('option').length > 0)) {
                        $container.find('.filter-unselected').val('').trigger('change');
                    }
                    if (!($right.find('option').length > 0)) {
                        $container.find('.filter-selected').val('').trigger('change');
                    }
                    $left.sortOptions();
                    $right.sortOptions();
                    WizFx.Helper.DualListBox.ToggleButtons($container, $left, $right);
                    _.delay(function () {
                        _this.jquery.trigger('move', { button: btn, list: $moved });
                    }, 500);
                };
                Object.defineProperty(DualListBox.prototype, "bind", {
                    get: function () {
                        var _this = this;
                        return {
                            move: function (callback) {
                                _this.jquery.bind('move', function (e, data) {
                                    callback(_this, data.list, data.button);
                                });
                            }
                        };
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DualListBox.prototype, "container", {
                    get: function () {
                        return this.jquery.wg('container') || $('body');
                    },
                    set: function (object) {
                        if (!(object instanceof jQuery)) {
                            object = $(object);
                        }
                        this.jquery.wg('container', object);
                    },
                    enumerable: true,
                    configurable: true
                });
                DualListBox.prototype.readonly = function (bool) {
                    //bool = _.isUndefined(bool) ? bool : true;
                    console.log(bool);
                    this.left.prop('disabled', bool);
                    this.right.prop('disabled', bool);
                    this.container.find('input.filter').prop('disabled', bool);
                    this.container.find('button').each(function () {
                        $(this).prop('disabled', bool);
                    });
                    return this;
                };
                return DualListBox;
            }(UI.Element));
            Bootstrap.DualListBox = DualListBox;
            var DualListBoxConfig = (function () {
                function DualListBoxConfig(jquery, options) {
                    this.jquery = jquery;
                    this.options = options;
                }
                Object.defineProperty(DualListBoxConfig.prototype, "left", {
                    get: function () {
                        var _this = this;
                        return {
                            title: function (str) {
                                _this.options.left.title = str;
                                return _this;
                            }
                        };
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DualListBoxConfig.prototype, "right", {
                    get: function () {
                        var _this = this;
                        return {
                            title: function (str) {
                                _this.options.right.title = str;
                                return _this;
                            }
                        };
                    },
                    enumerable: true,
                    configurable: true
                });
                DualListBoxConfig.prototype.height = function (int) {
                    this.options.height = int;
                    return this;
                };
                DualListBoxConfig.prototype.dataSource = function (data) {
                    this.options.dataSource = data;
                    return this;
                };
                DualListBoxConfig.prototype.filterable = function (bool) {
                    this.options.filterable = bool;
                    return this;
                };
                DualListBoxConfig.prototype.cascadeFrom = function (id) {
                    this.jquery.data('cascadefrom', id);
                    return this;
                };
                return DualListBoxConfig;
            }());
            Bootstrap.DualListBoxConfig = DualListBoxConfig;
        })(Bootstrap = UI.Bootstrap || (UI.Bootstrap = {}));
    })(UI = WizFx.UI || (WizFx.UI = {}));
})(WizFx || (WizFx = {}));
var WizFx;
(function (WizFx) {
    var Helper;
    (function (Helper) {
        var DualListBox = (function () {
            function DualListBox() {
            }
            DualListBox.RenderHtml = function ($container, $left, $right, $options) {
                var $leftFilterBox = '<div style="margin-bottom:5px">' +
                    '   <input class="filter k-textbox filter-unselected" type="text" style="width:100%" placeholder="Filter"/>' +
                    '</div>';
                var $rightFilterBox = '<div style="margin-bottom:5px; visibility:">' +
                    '	<input class="filter k-textbox filter-selected" type="text" style="width:100%" placeholder="Filter"/>' +
                    '</div>';
                $container.appendTo($right.parent())
                    .append($('<div></div>', { 'class': 'col-md-5', 'style': 'padding-right: 0' })
                    .append('<p class="bg-primary" style="padding:10px">' +
                    '   <span class="left-title">' + $options.left.title + '</span>' +
                    '</p>' + (($options.filterable != false) ? $leftFilterBox : '')).append($left))
                    .append($('<div></div>', { 'class': 'col-md-2 center-block', 'style': 'margin-top: 90px; padding:0' })
                    .append($('<button></button>', {
                    'class': 'btn btn-primary col-md-6 col-md-offset-3',
                    'text': '',
                    'style': 'margin-bottom: 10px',
                    'data-action': '1'
                }).append('<span class="glyphicon glyphicon-forward"></span>')).append($('<button></button>', {
                    'class': 'btn btn-primary col-md-6 col-md-offset-3',
                    'text': '',
                    'style': 'margin-bottom: 10px',
                    'data-action': '2'
                }).append('<span class="glyphicon glyphicon-triangle-right"></span>')).append($('<button></button>', {
                    'class': 'btn btn-primary col-md-6 col-md-offset-3',
                    'text': '',
                    'style': 'margin-bottom: 10px',
                    'data-action': '3'
                }).append('<span class="glyphicon glyphicon-triangle-left"></span>')).append($('<button></button>', {
                    'class': 'btn btn-primary col-md-6 col-md-offset-3',
                    'text': '',
                    'style': 'margin-bottom: 10px',
                    'data-action': '4'
                }).append('<span class="glyphicon glyphicon-backward"></span>')))
                    .append($('<div></div>', {
                    'class': 'col-md-5',
                    'style': 'padding-left: 0'
                }).append('<p class="bg-primary" style="padding:10px">' +
                    '	<span class="right-title">' + $options.right.title + '</span>' +
                    '</p>' + (($options.filterable != false) ? $rightFilterBox : '')).append($right));
            };
            DualListBox.BindData = function ($data, $container, $left, $right) {
                var selected = _.map($right.find('option'), function (k, i) {
                    return {
                        Text: $(k).text(),
                        Value: $(k).attr('value')
                    };
                });
                $left.empty();
                $right.empty();
                var leftArray = [];
                var rightArray = [];
                $.each($data, function (key, item) {
                    if (selected.some(function (e) {
                        return e['Value'] == item['Value'];
                    }) === true) {
                        $('<option></option>', {
                            value: item['Value'],
                            text: item['Text']
                        }).appendTo($right);
                        rightArray.push({
                            Value: item['Value'], Text: item['Text']
                        });
                    }
                    else {
                        $('<option></option>', {
                            value: item['Value'],
                            text: item['Text']
                        }).appendTo($left);
                        leftArray.push({
                            Value: item['Value'], Text: item['Text']
                        });
                    }
                });
                $right.data('options', rightArray);
                $left.data('options', leftArray);
                Helper.DualListBox.ToggleButtons($container, $left, $right);
                WizFx.WG.iframe.resize();
            };
            DualListBox.ToggleButtons = function ($container, $left, $right) {
                $container.find('button[data-action]').prop('disabled', true);
                if ($right.find('option').length > 0) {
                    if ($right.find('option:selected').length > 0) {
                        $container.find('button[data-action="3"]').prop('disabled', false);
                    }
                    $container.find('button[data-action="4"]').prop('disabled', false);
                }
                if ($left.find('option').length > 0) {
                    if ($left.find('option:selected').length > 0) {
                        $container.find('button[data-action="2"]').prop('disabled', false);
                    }
                    $container.find('button[data-action="1"]').prop('disabled', false);
                }
            };
            return DualListBox;
        }());
        Helper.DualListBox = DualListBox;
    })(Helper = WizFx.Helper || (WizFx.Helper = {}));
})(WizFx || (WizFx = {}));
//# sourceMappingURL=dual-listbox.js.map