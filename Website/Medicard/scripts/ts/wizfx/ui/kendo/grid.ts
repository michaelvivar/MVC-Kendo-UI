module WizFx.UI.Kendo {
    export class Grid extends Base implements Wizardsgroup.UI.Kendo.Grid {
        get kendo(): kendo.ui.Grid {
            if (this.jquery && this.jquery.wg('kendo') == WG.config.kendo.grid) {
                return this.jquery.data(WG.config.kendo.grid) || this.jquery.data('kendo' + this.name);
            }
            return null;
        }
        get name() {
            if (this.jquery) {
                return this.jquery.data('grid') || this.jquery.attr('id') || null;
            }
            return null;
        }
        refresh() {
            if (this.kendo) {
                (<kendo.ui.Grid>this.kendo).dataSource.read();
                trigger('grid-' + this.jquery.data('grid') + '-refresh', this,
                    'wg.bind.grid(\'' + this.jquery.data('grid') + '\').refresh(function(grid) { })');
            }
            return this;
        }
        uncheckRecords() {
            if (this.jquery) {
                this.jquery.find('input[data-action="checkall"]').prop('checked', false);
            }
            return this;
        }
        get table() {
            return new Table(this);
        }
        get checkedRecords() {
            if (this.kendo) {
                return _.map(this.jquery.find('input[type="checkbox"][name="checkedRecords"]:checked'), (item) => {
                    return $(item).data('uid');
                });
            }
            return [];
        }
    }
    export class GridConfig implements Wizardsgroup.UI.Kendo.Grid.Config {
        constructor(private jquery: JQuery, public options: Wizardsgroup.UI.Kendo.Grid.Options) {
            this.options = options;
        }
        dataSource(data?: any) {
            this.options.dataSource = data;
            return this;
        }
        serverPaging(bool: boolean) {
            this.options.serverFiltering = bool;
            return this;
        }
        pageSize(int: number) {
            this.options.pageable.pageSize = int;
            return this;
        }
    }

    class Table implements Wizardsgroup.UI.Kendo.Grid.Table {
        private _list: JQuery[];
        constructor(private _grid: Grid) {

        }
        columns(name: string) {
            this._list = <any>Helper.Grid.GetTableColumns(this._grid, name);
            return {
                each: (fn: (column: Column) => void) => {
                    if (_.isFunction(fn) && this._list.length > 0) {
                        _.each(this._list, (item, i) => {
                            invoke(fn, new Column(item));
                        });
                    }
                }
            }
        }
    }
    class Cell implements Wizardsgroup.UI.Kendo.Grid.Table.Cell {
        protected jquery: JQuery
        constructor(jquery: any) {
            if (jquery instanceof jQuery) {
                this.jquery = jquery;
            }
            else {
                this.jquery = $(jquery);
            }
        }
        red() {
            if (this.jquery) {
                this.jquery.addClass('text-red');
            }
            return this;
        }
        get text() {
            if (this.jquery) {
                return this.jquery.text();
            }
        }
    }
    class Column extends Cell implements Wizardsgroup.UI.Kendo.Grid.Table.Column {
        get row() {
            return new Row(this.jquery.parents('.k-grid').find('tr[data-uid="' + this.jquery.parent().data('uid') + '"]'));
        }
    }
    class Row extends Cell implements Wizardsgroup.UI.Kendo.Grid.Table.Row {

    }
}

module WizFx.Helper {
    export class Grid {
        static OnDataBound(grid: UI.Kendo.Grid) {
            return (e: kendo.ui.GridDataBoundEvent) => {
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
                let $gridname = grid.jquery.data('grid');
                if ($gridname != WG.config.modal.gridname) {
                    trigger('grid-' + $gridname + '-databound', grid,
                        'wg.bind.grid(\'' + $gridname + '\').databound(function(grid) { })');
                }
            }
        }
        static RequestEnd(grid: UI.Kendo.Grid) {
            return (e: kendo.data.DataSourceRequestEndEvent) => {
                if (_.has(e, 'response')) {
                    if (_.has(e.response, 'Title')) {
                        grid.jquery.parent().find('.grid-title').text(e.response.Title);
                    }
                    if (_.has(e.response, 'Data')) {
                        _.each(e.response.Data, function (item) {
                            _.each(<any>item, function (val, key: string) {
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
            }
        }
        static Columns(data: kendo.ui.GridColumn[]) {
            data = <any>_.each(data, function (val, key) {
                if (_.isObject(val.template)) {
                    val.template = <any>Grid.TmplColumn(val.template);
                }
                return val;
            });
            return data;
        }
        static TmplColumn(tmpl: any) {
            if (_.has(tmpl, 'tag')) {
                if (tmpl.tag == 'link' || tmpl.tag == 'a') {
                    tmpl.href = 'javascript:void(0)';
                }
                let $tag = tmpl.tag;
                tmpl.tag = undefined;
                return $('<div></div>').html($('<' + $tag + '>', tmpl)).html();
            }
        }
        static FormatDate(element: JQuery, date?: Date) {
            if (element.text().match(/^\/Date\([0-9]{10,}\)\/$/)) {
                date = new Date(parseInt(element.text().replace(/[^0-9]/g, '')));
            }
            else {
                date = new Date();
            }
            if (_.isDate(date)) {
                return (<Date>date).format(element.attr('date-format'));
            }
            return element.text();
        }
        static GetTableColumns(grid: UI.Kendo.Grid, name: string | any) {
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
            return <any>[];
        }
        static FindColumnIndex(grid: UI.Kendo.Grid, name: string, locked: boolean): number {
            var $count = 0;
            var $index: number;
            var $header = (locked) ? '.k-grid-header-locked' : '.k-grid-header-wrap';
            grid.jquery.find($header + ' table thead tr th .k-link').each(function () {
                $count++;
                if ($(this).text() == name) {
                    $index = $count;
                }
            });
            return $index;
        }
    }
}