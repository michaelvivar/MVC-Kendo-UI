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
            var Grid = (function (_super) {
                __extends(Grid, _super);
                function Grid() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(Grid.prototype, "kendo", {
                    get: function () {
                        if (this.jquery && this.jquery.wg('kendo') == WizFx.WG.config.kendo.grid) {
                            return this.jquery.data(WizFx.WG.config.kendo.grid) || this.jquery.data('kendo' + this.name);
                        }
                        return null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Grid.prototype, "name", {
                    get: function () {
                        if (this.jquery) {
                            return this.jquery.data('grid') || this.jquery.attr('id') || null;
                        }
                        return null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Grid.prototype.refresh = function () {
                    if (this.kendo) {
                        this.kendo.dataSource.read();
                        trigger('grid-' + this.jquery.data('grid') + '-refresh', this, 'wg.bind.grid(\'' + this.jquery.data('grid') + '\').refresh(function(grid) { })');
                    }
                    return this;
                };
                Grid.prototype.uncheckRecords = function () {
                    if (this.jquery) {
                        this.jquery.find('input[data-action="checkall"]').prop('checked', false);
                    }
                    return this;
                };
                Object.defineProperty(Grid.prototype, "table", {
                    get: function () {
                        return new Table(this);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Grid.prototype, "checkedRecords", {
                    get: function () {
                        if (this.kendo) {
                            return _.map(this.jquery.find('input[type="checkbox"][name="checkedRecords"]:checked'), function (item) {
                                return $(item).data('uid');
                            });
                        }
                        return [];
                    },
                    enumerable: true,
                    configurable: true
                });
                return Grid;
            }(Kendo.Base));
            Kendo.Grid = Grid;
            var GridConfig = (function () {
                function GridConfig(jquery, options) {
                    this.jquery = jquery;
                    this.options = options;
                    this.options = options;
                }
                GridConfig.prototype.dataSource = function (data) {
                    this.options.dataSource = data;
                    return this;
                };
                GridConfig.prototype.serverPaging = function (bool) {
                    this.options.serverFiltering = bool;
                    return this;
                };
                GridConfig.prototype.pageSize = function (int) {
                    this.options.pageable.pageSize = int;
                    return this;
                };
                return GridConfig;
            }());
            Kendo.GridConfig = GridConfig;
            var Table = (function () {
                function Table(_grid) {
                    this._grid = _grid;
                }
                Table.prototype.columns = function (name) {
                    var _this = this;
                    this._list = WizFx.Helper.Grid.GetTableColumns(this._grid, name);
                    return {
                        each: function (fn) {
                            if (_.isFunction(fn) && _this._list.length > 0) {
                                _.each(_this._list, function (item, i) {
                                    invoke(fn, new Column(item));
                                });
                            }
                        }
                    };
                };
                return Table;
            }());
            var Cell = (function () {
                function Cell(jquery) {
                    if (jquery instanceof jQuery) {
                        this.jquery = jquery;
                    }
                    else {
                        this.jquery = $(jquery);
                    }
                }
                Cell.prototype.red = function () {
                    if (this.jquery) {
                        this.jquery.addClass('text-red');
                    }
                    return this;
                };
                Object.defineProperty(Cell.prototype, "text", {
                    get: function () {
                        if (this.jquery) {
                            return this.jquery.text();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return Cell;
            }());
            var Column = (function (_super) {
                __extends(Column, _super);
                function Column() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(Column.prototype, "row", {
                    get: function () {
                        return new Row(this.jquery.parents('.k-grid').find('tr[data-uid="' + this.jquery.parent().data('uid') + '"]'));
                    },
                    enumerable: true,
                    configurable: true
                });
                return Column;
            }(Cell));
            var Row = (function (_super) {
                __extends(Row, _super);
                function Row() {
                    _super.apply(this, arguments);
                }
                return Row;
            }(Cell));
        })(Kendo = UI.Kendo || (UI.Kendo = {}));
    })(UI = WizFx.UI || (WizFx.UI = {}));
})(WizFx || (WizFx = {}));
var WizFx;
(function (WizFx) {
    var Helper;
    (function (Helper) {
        var Grid = (function () {
            function Grid() {
            }
            Grid.OnDataBound = function (grid) {
                return function (e) {
                    grid.jquery.find('tr td').on('click', 'input, a', function (e) {
                        var $parent = $(this).parents('tr').first();
                        grid.jquery.find('tr.k-state-selected').removeClass('k-state-selected');
                        if ($(this).attr('type') == 'checkbox') {
                            if ($(this).prop('checked') == true) {
                                grid.jquery.find('tr[data-uid="' + $parent.data('uid') + '"]').addClass('k-state-checked');
                                grid.jquery.find('input[type="checkbox"][name="checkedRecords"]:checked').each(function () {
                                    if (!$(this).parents('tr').hasClass('k-state-checked')) {
                                        $(this).prop('checked', false);
                                    }
                                });
                            }
                            else {
                                grid.jquery.find('tr[data-uid="' + $parent.data('uid') + '"]').removeClass('k-state-checked');
                            }
                        }
                        else {
                            grid.jquery.find('tr.k-state-checked').removeClass('k-state-checked');
                            grid.jquery.find('input[type="checkbox"]').prop('checked', false);
                            grid.jquery.find('tr[data-uid="' + $parent.data('uid') + '"]').addClass('k-state-selected');
                            grid.jquery.find('tr[data-uid="' + $parent.data('uid') + '"]').find('input[type="checkbox"]').prop('checked', true);
                        }
                    });
                    grid.jquery.find('[date-format]').each(function () {
                        $(this).parent('td').html(Grid.FormatDate($(this)));
                    });
                    grid.jquery.find('input[data-action="checkall"]').prop('checked', false);
                    grid.jquery.on('click', '.k-grid-content input[type="checkbox"]', function (e) {
                        if ($(this).parents('.k-grid-content').find('input[type="checkbox"]').not(':checked').length > 0) {
                            grid.jquery.find('input[data-action="checkall"]').prop('checked', false);
                        }
                        else {
                            grid.jquery.find('input[data-action="checkall"]').prop('checked', true);
                        }
                    });
                    grid.jquery.on('click', '.k-grid-content-locked input[type="checkbox"]', function () {
                        if ($(this).parents('.k-grid-content-locked').find('input[type="checkbox"]').not(':checked').length > 0) {
                            grid.jquery.find('input[data-action="checkall"]').prop('checked', false);
                        }
                        else {
                            grid.jquery.find('input[data-action="checkall"]').prop('checked', true);
                        }
                    });
                    var $gridname = grid.jquery.data('grid');
                    if ($gridname != WizFx.WG.config.modal.gridname) {
                        trigger('grid-' + $gridname + '-databound', grid, 'wg.bind.grid(\'' + $gridname + '\').databound(function(grid) { })');
                    }
                };
            };
            Grid.RequestEnd = function (grid) {
                return function (e) {
                    if (_.has(e, 'response')) {
                        if (_.has(e.response, 'Title')) {
                            grid.jquery.parent().find('.grid-title').text(e.response.Title);
                        }
                        if (_.has(e.response, 'Data')) {
                            _.each(e.response.Data, function (item) {
                                _.each(item, function (val, key) {
                                    if (_.isString(key) && (key.toLowerCase() == 'recordstatus' || key.toLowerCase() == 'status')) {
                                        if (val == 0) {
                                            item[key] = 'Active';
                                        }
                                        else if (val == 1) {
                                            item[key] = 'Inactive';
                                        }
                                    }
                                    //if (val.match(/^\/Date\([0-9]{10,}\)\/$/)) {
                                    //    item[key] = new Date(parseInt(val.replace(/[^0-9]/g, '')));
                                    //}
                                });
                            });
                        }
                    }
                };
            };
            Grid.Columns = function (data) {
                data = _.each(data, function (val, key) {
                    if (_.isObject(val.template)) {
                        val.template = Grid.TmplColumn(val.template);
                    }
                    return val;
                });
                return data;
            };
            Grid.TmplColumn = function (tmpl) {
                if (_.has(tmpl, 'tag')) {
                    if (tmpl.tag == 'link' || tmpl.tag == 'a') {
                        tmpl.href = 'javascript:void(0)';
                    }
                    var $tag = tmpl.tag;
                    tmpl.tag = undefined;
                    return $('<div></div>').html($('<' + $tag + '>', tmpl)).html();
                }
            };
            Grid.FormatDate = function (element, date) {
                if (element.text().match(/^\/Date\([0-9]{10,}\)\/$/)) {
                    date = new Date(parseInt(element.text().replace(/[^0-9]/g, '')));
                }
                else {
                    date = new Date();
                }
                if (_.isDate(date)) {
                    return date.format(element.attr('date-format'));
                }
                return element.text();
            };
            Grid.GetTableColumns = function (grid, name) {
                if (_.isString(name)) {
                    var $index = Grid.FindColumnIndex(grid, name, true);
                    if ($index > 0) {
                        return grid.jquery.find('.k-grid-content-locked').find('tbody tr td:nth-child(' + $index + ')');
                    }
                    else {
                        $index = Grid.FindColumnIndex(grid, name, false);
                        if ($index > 0) {
                            return grid.jquery.find('.k-grid-content').find('tbody tr td:nth-child(' + $index + ')');
                        }
                    }
                }
                return [];
            };
            Grid.FindColumnIndex = function (grid, name, locked) {
                var $count = 0;
                var $index;
                var $header = (locked) ? '.k-grid-header-locked' : '.k-grid-header-wrap';
                grid.jquery.find($header + ' table thead tr th .k-link').each(function () {
                    $count++;
                    if ($(this).text() == name) {
                        $index = $count;
                    }
                });
                return $index;
            };
            return Grid;
        }());
        Helper.Grid = Grid;
    })(Helper = WizFx.Helper || (WizFx.Helper = {}));
})(WizFx || (WizFx = {}));
//# sourceMappingURL=grid.js.map