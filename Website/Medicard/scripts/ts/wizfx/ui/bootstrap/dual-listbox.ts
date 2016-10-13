module WizFx.UI.Bootstrap {
    export class DualListBox extends Element implements Wizardsgroup.UI.Bootstrap.DualListBox {
        constructor(id) {
            super(id);
        }
        get left() {
            return this.jquery.parents('[data-wg="dualListBox"]').find('.left-box').first();
        }
        get right() {
            return this.jquery;
        }
        get cascadefrom() {
            return new CascadeFrom(this);
        }
        error(bool: boolean) {
            if (bool) {
                this.jquery.addClass(WG.config.kendo.error.class);
            }
            else {
                this.jquery.removeClass(WG.config.kendo.error.class);
            }
            return this;
        }
        move(button: any) {
            var btn: number;
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
                left: (<any[]>$left.data('options')),
                right: (<any[]>$right.data('options'))
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
                $.each($data.right, (key, item) => {
                    if (!_.find($moved, o => o.Value == item['Value'])) {
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
                $.each($data.left, (key, item) => {
                    if (!_.find($moved, o => o.Value == item['Value'])) {
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
            Helper.DualListBox.ToggleButtons($container, $left, $right);
            _.delay(() => {
                this.jquery.trigger('move', { button: btn, list: $moved });
            }, 500);
        }
        get bind() {
            return {
                move: (callback: Function) => {
                    this.jquery.bind('move', (e, data) => {
                        callback(this, data.list, data.button);
                    });
                }
            }
        }
        get container() {
            return this.jquery.wg('container') || $('body');
        }
        set container(object: any) {
            if (!(object instanceof jQuery)) {
                object = $(object);
            }
            this.jquery.wg('container', object);
        }
        readonly(bool: boolean) {
            //bool = _.isUndefined(bool) ? bool : true;
            console.log(bool);
            this.left.prop('disabled', bool);
            this.right.prop('disabled', bool);
            this.container.find('input.filter').prop('disabled', bool);
            this.container.find('button').each(function () {
                $(this).prop('disabled', bool);
            });
            return this;
        }
    }
    export class DualListBoxConfig implements Wizardsgroup.UI.Bootstrap.DualListBox.Config {
        constructor(private jquery: JQuery, public options: Wizardsgroup.UI.Bootstrap.DualListBox.Options) {

        }
        get left() {
            return {
                title: (str: string) => {
                    this.options.left.title = str;
                    return this;
                }
            }
        }
        get right() {
            return {
                title: (str: string) => {
                    this.options.right.title = str;
                    return this;
                }
            }
        }
        height(int?: number) {
            this.options.height = int;
            return this;
        }
        dataSource(data: any) {
            this.options.dataSource = data;
            return this;
        }
        filterable(bool: boolean) {
            this.options.filterable = bool;
            return this;
        }
        cascadeFrom(id: string) {
            this.jquery.data('cascadefrom', id);
            return this;
        }
    }
}

module WizFx.Helper {
    export class DualListBox {
        static RenderHtml($container: JQuery, $left: JQuery, $right: JQuery, $options: Wizardsgroup.UI.Bootstrap.DualListBox.Options) {
            var $leftFilterBox = '<div style="margin-bottom:5px">' +
                '   <input class="filter k-textbox filter-unselected" type="text" style="width:100%" placeholder="Filter"/>' +
                '</div>';
            var $rightFilterBox = '<div style="margin-bottom:5px; visibility:">' +
                '	<input class="filter k-textbox filter-selected" type="text" style="width:100%" placeholder="Filter"/>' +
                '</div>';

            $container.appendTo($right.parent())
                .append($('<div></div>', { 'class': 'col-md-5', 'style': 'padding-right: 0' })
                    .append(
                    '<p class="bg-primary" style="padding:10px">' +
                    '   <span class="left-title">' + $options.left.title + '</span>' +
                    '</p>' + (($options.filterable != false) ? $leftFilterBox : '')
                    ).append($left))
                .append($('<div></div>', { 'class': 'col-md-2 center-block', 'style': 'margin-top: 90px; padding:0' })
                    .append(
                    $('<button></button>', {
                        'class': 'btn btn-primary col-md-6 col-md-offset-3',
                        'text': '',
                        'style': 'margin-bottom: 10px',
                        'data-action': '1'
                    }).append('<span class="glyphicon glyphicon-forward"></span>')
                    ).append(
                    $('<button></button>', {
                        'class': 'btn btn-primary col-md-6 col-md-offset-3',
                        'text': '',
                        'style': 'margin-bottom: 10px',
                        'data-action': '2'
                    }).append('<span class="glyphicon glyphicon-triangle-right"></span>')
                    ).append(
                    $('<button></button>', {
                        'class': 'btn btn-primary col-md-6 col-md-offset-3',
                        'text': '',
                        'style': 'margin-bottom: 10px',
                        'data-action': '3'
                    }).append('<span class="glyphicon glyphicon-triangle-left"></span>')
                    ).append(
                    $('<button></button>', {
                        'class': 'btn btn-primary col-md-6 col-md-offset-3',
                        'text': '',
                        'style': 'margin-bottom: 10px',
                        'data-action': '4'
                    }).append('<span class="glyphicon glyphicon-backward"></span>')
                    )
                )
                .append(
                $('<div></div>', {
                    'class': 'col-md-5',
                    'style': 'padding-left: 0'
                }).append(
                    '<p class="bg-primary" style="padding:10px">' +
                    '	<span class="right-title">' + $options.right.title + '</span>' +
                    '</p>' + (($options.filterable != false) ? $rightFilterBox : '')
                    ).append($right)
                );
        }
        static BindData($data: kendo.data.ObservableArray, $container: JQuery, $left: JQuery, $right: JQuery) {
            var selected = _.map($right.find('option'), (k, i) => {
                return {
                    Text: $(k).text(),
                    Value: $(k).attr('value')
                };
            });
            $left.empty();
            $right.empty();
            var leftArray = [];
            var rightArray = [];
            $.each($data, (key, item) => {
                if (selected.some((e) => {
                    return e['Value'] == item['Value']
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
            WG.iframe.resize();
        }
        static ToggleButtons($container: JQuery, $left: JQuery, $right: JQuery) {
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
        }
    }
}