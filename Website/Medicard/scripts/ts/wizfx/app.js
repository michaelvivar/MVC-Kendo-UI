application(function (wg) {
    init(wg);
    if (self != top) {
        $('body').css('padding', '20px').append($('<div></div>', { 'class': 'clearfix' }));
        wg.window.scroll.top();
        window.onresize = _.debounce(function () {
            $('.k-context-menu').each(function () {
                var $cm = $(this).data(wg.config.kendo.contextmenu);
                if ($cm) {
                    $cm.close($(this));
                }
            });
        }, 500);
    }
    else {
        window.onresize = _.debounce(function () {
            var $top = $(window).scrollTop();
            window.__scrollTop = (($top > 150) ? ($top - 100) : 0);
        }, 500);
        window.onscroll = _.debounce(function () {
            var $top = $(window).scrollTop();
            window.__scrollTop = (($top > 150) ? ($top - 100) : 0);
        }, 500);
        var $id = Guid.new();
        $(wg.config.menu.id + ' ul li a[data-title="Home"]').attr('data-tabid', $id);
        wg.tab.add('Home', 'Home', $id, false);
        $(wg.config.menu.id + ' ul li a').on('click', function (e) {
            e.preventDefault();
            if ($(this).hasClass('has-submenu')) {
                return;
            }
            if (_.isEmpty($(this).data('tabid'))) {
                $(this).data('tabid', Guid.new());
            }
            wg.tab.add($(this).data('title'), $(this).url(), $(this).data('tabid'));
        });
    }
    $('body').css({ 'display': 'block' });
    wg('body').initUI(function () {
        wg.iframe.resize();
        $(document).trigger('wizardsgroup');
        wg.window.scroll.top();
    });
});
function init(wg) {
    $('body').addClass(wg.window.browser).wg('browser', wg.window.browser);
    if ($('input[data-wg-parentid]').length > 0) {
        wg.parentID($('input[data-wg-parentid]').wg('parentid'));
    }
    var $document = $(document);
    $document.on('click', 'a[data-action="download"], button[data-action="download"]', function (e) {
        e.preventDefault();
        wg.download($(this).url());
    });
    $document
        .on('focus', '.k-widget input, input.k-textbox', function () {
        if ($(this).hasClass('k-formatted-value')) {
            return;
        }
        if ($(this).hasClass('k-textbox')) {
            if ($(this).prev('div[data-wg-ui="tooltip"]').length > 0) {
                $(this).prev('div[data-wg-ui="tooltip"]').tooltip('show');
            }
            else if ($(this).next('div[data-wg-ui="tooltip"]').length > 0) {
                $(this).next('div[data-wg-ui="tooltip"]').tooltip('show');
            }
            return;
        }
        if ($(this).parents('.k-widget').prev('div[data-wg-ui="tooltip"]').length > 0) {
            $(this).parents('.k-widget').prev('div[data-wg-ui="tooltip"]').tooltip('show');
        }
        else if ($(this).parents('.k-widget').next('div[data-wg-ui="tooltip"]').length > 0) {
            $(this).parents('.k-widget').next('div[data-wg-ui="tooltip"]').tooltip('show');
        }
    })
        .on('focusout', '.k-widget input, input.k-textbox', function () {
        if ($(this).hasClass('k-formatted-value')) {
            return;
        }
        if ($(this).hasClass('k-textbox')) {
            if ($(this).prev('div[data-wg-ui="tooltip"]').length > 0) {
                $(this).prev('div[data-wg-ui="tooltip"]').tooltip('hide');
            }
            else if ($(this).next('div[data-wg-ui="tooltip"]').length > 0) {
                $(this).next('div[data-wg-ui="tooltip"]').tooltip('hide');
            }
            return;
        }
        if ($(this).parents('.k-widget').prev('div[data-wg-ui="tooltip"]').length > 0) {
            $(this).parents('.k-widget').prev('div[data-wg-ui="tooltip"]').tooltip('hide');
        }
        else if ($(this).parents('.k-widget').next('div[data-wg-ui="tooltip"]').length > 0) {
            $(this).parents('.k-widget').next('div[data-wg-ui="tooltip"]').tooltip('hide');
        }
    });
    $document.on('click', 'a[data-wg-ui="kendoTabStrip"], button[data-wg-ui="kendoTabStrip"]', function (e) {
        e.preventDefault();
        var $tab = wg.tab;
        if (self != top) {
            if ($(this).data('tab')) {
                $tab = wg('#' + $(this).data('tab')).tabstrip();
            }
        }
        var data;
        var $id = $(this).data('uid');
        if ($id) {
            data = {
                id: $id
            };
            $(this).data('tabid', $(this).data('tabid') || $id);
        }
        else {
            $(this).data('tabid', $(this).data('tabid') || Guid.new());
        }
        $tab.add(($(this).data('title') || $(this).data('tab-title')), $(this).url(data), $(this).data('tabid'));
    });
    $document.on('click', 'a[data-wg-ui="kendoGrid"]', function (e) {
        e.preventDefault();
        var $grid = {
            name: $(this).data('grid'), id: $(this).data('uid'), container: null
        };
        $grid.container = $(this).parents('div[data-container="grid"]') || $(this).parents('div[data-container]');
        $grid.container.nextAll('div[data-container="wrapper"]').each(function () {
            if ($(this).find('div[data-wg-ui="kendoGrid"]').length > 0) {
                $(this).empty().remove();
            }
        });
        wg('body').block();
        wg.http.get($(this).url())
            .then(function (result) {
            wg($grid.container).after(result, function () {
                $('#' + $grid.name).attr('data-parent', $grid.id);
                wg('body').unblock();
            });
        });
    });
    $document.on('click', '.k-grid .k-pager-refresh', function (e) {
        e.preventDefault();
        var $jquery = $(this).parents('.k-grid');
        if ($jquery) {
            var $grid = wg($jquery).grid();
            $grid.uncheckRecords();
            trigger('grid-' + $grid.name + '-refresh', $grid, 'wg.bind.grid(\'' + $grid.name + '\').refresh(function(grid) {})');
        }
    });
    $document.on('click', 'a[data-contextmenu]', function (e) {
        e.preventDefault();
        var $this = $(this);
        var $jquery = $('#' + $(this).data('contextmenu'));
        var $contextmenu = wg($jquery).contextmenu();
        if ($contextmenu.kendo) {
            $contextmenu.kendo.open(e.clientX, e.clientY);
            $jquery.find('a').each(function () {
                $(this).attr('data-uid', $this.data('uid')).data('uid', $this.data('uid'));
                $(this).attr('data-title', $(this).data('title') || $this.text()).data('title', $(this).data('title') || $this.text());
            });
        }
    });
    $document.on('click', 'a[data-wg-ui="modal"], button[data-wg-ui="modal"]', function (e) {
        e.preventDefault();
        var $action = $(this).data('action');
        var $modal = new Modal($(this));
        if ($action == 'add') {
            $modal.add(wg);
        }
        else if ($action == 'edit') {
            $modal.edit(wg);
        }
        else if ($action == 'delete') {
            $modal.delete(wg);
        }
        else if ($action == 'toggle') {
            $modal.toggle(wg);
        }
    });
}
var Modal = (function () {
    function Modal(jquery) {
        this.jquery = jquery;
        var $id = this.jquery.data('uid');
        if ($id) {
            this.data = {
                id: $id
            };
        }
    }
    Modal.prototype.add = function (wg) {
        var _this = this;
        var jquery = this.jquery;
        wg.modal(function (c) { return c
            .title(jquery.data('title') || jquery.data('modal-title'))
            .width(jquery.data('width') || jquery.data('modal-width'))
            .button('Create', function (modal) {
            modal.block().form().submit()
                .success(function (result) {
                modal.close();
                if (_.isArray(result.message)) {
                    wg.notification.success(result.message[0]);
                }
                else {
                    wg.notification.success(result.message);
                }
            })
                .failed(function (result) {
                modal.close();
                wg.notification.error(result.message);
            });
        })
            .button('Cancel', function (modal) {
            // TODO: Confirm Message
            wg.confirm('', function (bool) {
                if (bool) {
                    modal.close();
                }
            });
        }); }).open(function (modal) {
            modal.block();
            wg.http.get(jquery.url(_this.data), {
                id: jquery.parents('[data-container="grid"]').find('[data-grid]').data('parent')
            })
                .then(function (result) {
                modal.html(result, function () {
                    modal.unblock();
                });
            });
        });
    };
    Modal.prototype.edit = function (wg) {
        var _this = this;
        var jquery = this.jquery;
        wg.modal(function (c) { return c
            .title(jquery.data('title'))
            .width(jquery.data('modal-width'))
            .button('Save', function (modal) {
            modal.block().form().submit()
                .success(function (result) {
                modal.close();
                if (_.isArray(result.message)) {
                    wg.notification.success(result.message[0]);
                }
                else {
                    wg.notification.success(result.message);
                }
            })
                .failed(function (result) {
                modal.close();
                wg.notification.error(result.message);
            });
        })
            .button('Cancel', function (modal) {
            // TODO: Confirm Message
            wg.confirm('', function (bool) {
                if (bool) {
                    modal.close();
                }
            });
        }); }).open(function (modal) {
            modal.block();
            wg.http.get(jquery.url(_this.data))
                .then(function (result) {
                modal.html(result, function () {
                    modal.unblock();
                });
            });
        });
    };
    Modal.prototype.delete = function (wg) {
        var _this = this;
        var jquery = this.jquery;
        var $records = [];
        var $name = jquery.parents('div[data-container="grid"]').find('div[data-grid]').first().data('grid');
        var $grid = wg('#' + $name).grid();
        if ($name) {
            $records = $grid.checkedRecords;
            if (jquery.data('selectionmode') == 'single' && $records.length > 1) {
                // TODO: Message
                wg.notification.warning('');
            }
        }
        else {
            $grid = null;
            $records = [jquery.data('uid')];
        }
        if ($records.length > 0) {
            wg.modal(function (c) { return c
                .title(jquery.data('title') || 'Delete Record' + (($records.length == 1) ? '' : 's'))
                .width(jquery.data('modal-width'))
                .button('Delete', function (modal) {
                modal.block();
                wg.http.post(jquery.url(), {
                    checkedRecords: $records,
                    parentId: $('#' + $name).data('parent')
                })
                    .success(function (result) {
                    modal.close();
                    wg.notification.success(result.message);
                    if ($grid) {
                        $grid.refresh();
                    }
                })
                    .failed(function (result) {
                    modal.close();
                    wg.notification.error(result.message);
                });
            })
                .button('Cancel', function (modal) {
                modal.close();
            }); }).open(function (modal) {
                modal.block();
                wg.http.post(jquery.url(_this.data), {
                    checkedRecords: $records,
                    parentId: $('#' + $name).data('parent')
                })
                    .success(function (result) {
                    Modal.displayGrid(wg, modal, result.data);
                    modal.unblock();
                    wg.iframe.resize();
                })
                    .failed(function (result) {
                    // TODO: Message
                    wg.notification.error('');
                });
            });
        }
        else {
            // TODO: Message
            wg.notification.warning('');
        }
    };
    Modal.prototype.toggle = function (wg) {
        var _this = this;
        var jquery = this.jquery;
        var $records = [];
        var $name = jquery.parents('div[data-container="grid"]').find('div[data-grid]').first().data('grid');
        var $grid = wg('#' + $name).grid();
        if ($name) {
            $records = $grid.checkedRecords;
            if (jquery.data('selectionmode') == 'single' && $records.length > 1) {
                // TODO: Message
                wg.notification.warning('');
            }
        }
        else {
            $grid = null;
            $records = [jquery.data('uid')];
        }
        if ($records.length > 0) {
            wg.modal(function (c) { return c
                .title(jquery.data('title') || 'Toggle Record' + (($records.length == 1) ? '' : 's'))
                .width(jquery.data('modal-width'))
                .button('Toggle', function (modal) {
                modal.block();
                wg.http.post(jquery.url(), {
                    checkedRecords: $records,
                    parentId: $('#' + $name).data('parent')
                })
                    .success(function (result) {
                    modal.close();
                    wg.notification.success(result.message);
                    if ($grid) {
                        $grid.refresh();
                    }
                })
                    .failed(function (result) {
                    modal.close();
                    wg.notification.error(result.message);
                });
            })
                .button('Cancel', function (modal) {
                modal.close();
            }); }).open(function (modal) {
                modal.block();
                wg.http.post(jquery.url(_this.data), {
                    checkedRecords: $records,
                    parentId: $('#' + $name).data('parent')
                })
                    .success(function (result) {
                    // TODO: Grid
                })
                    .failed(function (result) {
                    // TODO: Message
                    wg.notification.error('');
                });
            });
        }
        else {
            // TODO: Message
            wg.notification.warning('');
        }
    };
    Modal.displayGrid = function (wg, modal, data) {
        var $columns = _.map(_.keys(data[0]), function (i) {
            return {
                field: i, title: i.toTitle()
            };
        });
        modal.html('<div id="ModalGrid" data-grid="' + wg.config.modal.gridname + '" data-wg-ui="kendoGrid" data-ui-init="false"></div>', function () {
            wg('#ModalGrid').grid({
                dataSource: data,
                columns: $columns,
                pageable: false,
                resize: false,
                groupable: false,
                height: null,
                filterable: false,
                sortable: false,
                columnMenu: false
            });
        });
    };
    return Modal;
}());
//# sourceMappingURL=app.js.map