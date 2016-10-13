declare module Wizardsgroup {
    interface Config {
        url: Config.Url;
        menu: Config.Menu;
        modal: Config.Modal;
        confirm: Config.Confirm;
        alert: Config.Alert;
        notification: Config.Notification;
        tab: Config.Tab;
        kendo: Config.Kendo;
        bootstrap: Config.Bootstrap;
        file: Config.File;
    }
    interface Window {
        redirectTo(url: url): void;
        scroll: Window.Scroll;
        scrollTop: number;
        browser: Browser;
    }
    interface Bind {
        form(name: string): Bind.Form.Event;
        form(name: string[]): Bind.Form.Event;
        grid(name: string): Bind.Grid.Event;
        grid(name: string[]): Bind.Grid.Event;
        modal(): Bind.Modal.Event;
        modal(title: string): Bind.Modal.Event;
        modal(title: string[]): Bind.Modal.Event;
    }
    interface UI {
        initUI(callback?: Function, options?: { context: any }): void;
        textbox(): UI.Kendo.TextBox;
        textbox(options: UI.Kendo.TextBox.Options): UI.Kendo.TextBox;
        textbox(config: Action<UI.Kendo.TextBox.Config>, options?: UI.Kendo.TextBox.Options): UI.Kendo.TextBox;

        combobox(): UI.Kendo.ComboBox;
        combobox(options: UI.Kendo.ComboBox.Options): UI.Kendo.ComboBox;
        combobox(config: Action<UI.Kendo.ComboBox.Config>, options?: UI.Kendo.ComboBox.Options): UI.Kendo.ComboBox;

        multiselect(): UI.Kendo.MultiSelect;
        multiselect(options: UI.Kendo.MultiSelect.Options): UI.Kendo.MultiSelect;
        multiselect(config: Action<UI.Kendo.MultiSelect.Config>, options?: UI.Kendo.MultiSelect.Options): UI.Kendo.MultiSelect;

        datepicker(): UI.Kendo.DatePicker;
        datepicker(options: UI.Kendo.DatePicker.Options): UI.Kendo.DatePicker;
        datepicker(config: Action<UI.Kendo.DatePicker.Config>, options?: UI.Kendo.DatePicker.Options): UI.Kendo.DatePicker;

        datetimepicker(): UI.Kendo.DateTimePicker;
        datetimepicker(options: UI.Kendo.DateTimePicker.Options): UI.Kendo.DateTimePicker;
        datetimepicker(config: Action<UI.Kendo.DateTimePicker.Config>, options?: UI.Kendo.DateTimePicker.Options): UI.Kendo.DateTimePicker;

        timepicker(): UI.Kendo.TimePicker;
        timepicker(options: UI.Kendo.TimePicker.Options): UI.Kendo.TimePicker;
        timepicker(config: Action<UI.Kendo.TimePicker.Config>, options?: UI.Kendo.TimePicker.Options): UI.Kendo.TimePicker;

        numerictextbox(): UI.Kendo.NumericTextBox;
        numerictextbox(options: Wizardsgroup.UI.Kendo.NumericTextBox.Options): UI.Kendo.NumericTextBox;
        numerictextbox(config: Action<Wizardsgroup.UI.Kendo.NumericTextBox.Config>, options?: Wizardsgroup.UI.Kendo.NumericTextBox.Options): UI.Kendo.NumericTextBox;

        maskedtextbox(): UI.Kendo.MaskedTextBox;
        maskedtextbox(options: Wizardsgroup.UI.Kendo.MaskedTextBox.Options): UI.Kendo.MaskedTextBox;
        maskedtextbox(config: Action<Wizardsgroup.UI.Kendo.MaskedTextBox.Config>, options?: Wizardsgroup.UI.Kendo.MaskedTextBox.Options): UI.Kendo.MaskedTextBox;

        contextmenu(): UI.Kendo.ContextMenu;
        contextmenu(options: Wizardsgroup.UI.Kendo.ContextMenu.Options): UI.Kendo.ContextMenu;
        contextmenu(config: Action<Wizardsgroup.UI.Kendo.ContextMenu.Config>, options?: Wizardsgroup.UI.Kendo.ContextMenu.Options): UI.Kendo.ContextMenu;

        fileupload(): UI.Kendo.Upload;
        fileupload(options: UI.Kendo.Upload.Options): UI.Kendo.Upload;
        fileupload(config: Action<UI.Kendo.Upload.Config>, options?: UI.Kendo.Upload.Options): UI.Kendo.Upload;

        tabstrip(): UI.Kendo.TabStrip;
        tabstrip(options: UI.Kendo.TabStrip.Options): UI.Kendo.TabStrip;
        tabstrip(config: Action<UI.Kendo.TabStrip.Config>, options?: UI.Kendo.TabStrip.Options): UI.Kendo.TabStrip;

        accordion(): UI.Kendo.Accordion;
        accordion(options: UI.Kendo.Accordion.Options): UI.Kendo.Accordion;
        accordion(config: Action<UI.Kendo.Accordion.Config>, options?: UI.Kendo.Accordion.Options): UI.Kendo.Accordion;

        grid(): UI.Kendo.Grid;
        grid(options: UI.Kendo.Grid.Options): UI.Kendo.Grid;
        grid(config: Action<UI.Kendo.Grid.Config>, options?: UI.Kendo.Grid.Options): UI.Kendo.Grid;

        duallistbox(): UI.Bootstrap.DualListBox;
        duallistbox(options: UI.Bootstrap.DualListBox.Options): UI.Bootstrap.DualListBox;
        duallistbox(config: Action<UI.Bootstrap.DualListBox.Config>, options?: UI.Bootstrap.DualListBox.Options): UI.Bootstrap.DualListBox;

        modal(): UI.Bootstrap.Modal;
        modal(config: Action<UI.Bootstrap.Modal.Config.Title>, options?: UI.Bootstrap.Modal.Options): UI.Bootstrap.Modal;

        form(): UI.Html.Form;
        form(name: string): UI.Html.Form;
        html(content: any): void;
        html(content: any, callback: Function): void;
        append(content: any): void;
        append(content: any, callback: Function): void;
        after(content: any): void;
        after(content: any, callback: Function): void;
        block(): void;
        block(options: any, callback?: Function): void;
        unblock(): void;
        unblock(callback: Function): void;
    }
}

declare module Wizardsgroup.Config {
    interface Url {
        host: url;
        homepage: url;
    }
    interface Menu {
        id: string;
    }
    interface Modal {
        id: string;
        gridname: string;
    }
    interface Confirm {
        id: string;
    }
    interface Alert {
        id: string;
    }
    interface Notification {
        id: string;
        type: {
            success: string;
            info: string;
            warning: string;
            error: string;
        };
        timeOut: number;
    }
    interface Tab {
        id: string;
        height: number;
        button: {
            close: string;
        };
        animation: boolean;
        iframe: {
            name: string;
            frameborder: number;
            scrolling: string;
            width: string;
            height: number;
        }
    }
    interface Kendo {
        textbox: string;
        combobox: string;
        multiselect: string;
        maskedtextbox: string;
        numerictextbox: string;
        datepicker: string;
        datetimepicker: string;
        timepicker: string;
        upload: string;
        tabstrip: string;
        accordion: string;
        contextmenu: string;
        grid: string;

        gridcolumnsetting: string;
        error: {
            class: string;
        }

        folder: {
            gridsetting: string;
        }
    }
    interface Bootstrap {
        duallistbox: string;
    }
    interface File {
        url: {
            upload: url;
            remove: url;
        }
    }
}
declare module Wizardsgroup.Window {
    interface Scroll {
        top(): void;
        top(int: number): void;
        bottom(): void;
        bottom(int: number): void;
    }
}
declare module Wizardsgroup.Bind {

}
declare module Wizardsgroup.Bind.Form {
    interface Event {
        submit(callback: (data: Wizardsgroup.Ajax.Request.ActionResult) => void): void;
        submit(callback: { success?: (data: Wizardsgroup.Ajax.Request.ActionResult) => void, failed?: (data: Wizardsgroup.Ajax.Request.ActionResult) => void }): void;
    }
}
declare module Wizardsgroup.Bind.Grid {
    interface Event {
        refresh(callback: (grid: UI.Kendo.Grid) => void): void;
        databound(callback: (grid: UI.Kendo.Grid) => void): void;
    }
}
declare module Wizardsgroup.Bind.Modal {
    interface Event {
        open(callback: (modal: UI.Bootstrap.Modal) => void): void;
        close(callback: (modal: UI.Bootstrap.Modal) => void): void;
        ready(callback: (modal: UI.Bootstrap.Modal) => void): void;
    }
}

declare module Wizardsgroup.Ajax {
    interface Http {
        get(url: url, data?: any): Request.Success;
        post(url: url, data?: any): Request.Success;
        json(url: url, data?: any): Request.Success;
    }
    interface Options extends JQueryAjaxSettings {
        action?: string;
    }
}
declare module Wizardsgroup.Ajax.Request {
    interface Success {
        success(callback: (result: Result) => void): Failed;
        then(callback: (data: any, status: string, xhr: JQueryXHR) => void): void;
    }
    interface Failed {
        failed(callback: (result: Result) => void): void;
    }
    interface Result {
        data: any;
        message: string;
        status: string;
    }
    interface ActionResult {
        ActionStatus: Status;
        Messages: string[];
        DataResult: any;
        ErrorMessages: ErrorMessages[];
    }
    interface ErrorMessages {
        FieldNames: string[];
        Message: string;
    }
}

declare module Wizardsgroup.UI {
    interface Element {
        jquery: JQuery;
    }
    interface CascadeFrom<T> {
        value: any;
        bind: CascadeFrom.Event<T>;
    }
    interface Kendo<T, K> {
        error(bool?: boolean): T;
        readonly(bool: boolean): T;
        label: Html.Label;
        show(): T;
        hide(): T;
        kendo: K;
        container: JQuery;
    }
}
declare module Wizardsgroup.UI.CascadeFrom {
    interface Event<T> {
        change(callback: (element: T) => void): void;
    }
}
declare module Wizardsgroup.UI.Kendo {
    interface TextBox extends Kendo<TextBox, kendo.ui.AutoComplete> {
        bind: TextBox.Event;
        data: any;
        read(): TextBox;
        value: any
    }
    interface ComboBox extends Kendo<ComboBox, kendo.ui.ComboBox> {
        bind: ComboBox.Event;
        reset(): ComboBox;
        cascadefrom: CascadeFrom<ComboBox>;
        text: string;
        data: any;
        read(): ComboBox;
        value: any
    }
    interface MultiSelect extends Kendo<MultiSelect, kendo.ui.MultiSelect> {
        bind: MultiSelect.Event;
        reset(): MultiSelect;
        cascadefrom: CascadeFrom<MultiSelect>;
        data: any;
        read(): MultiSelect;
        value: any
    }
    interface DatePicker extends Kendo<DatePicker, kendo.ui.DatePicker> {
        bind: DatePicker.Event;
        max(value: Date): DatePicker;
        min(value: Date): DatePicker;
        cascadefrom: CascadeFrom<DatePicker>;
        value: any
    }
    interface DateTimePicker extends Kendo<DateTimePicker, kendo.ui.DateTimePicker> {
        bind: DateTimePicker.Event;
        max(value: Date): DateTimePicker;
        min(value: Date): DateTimePicker;
        cascadefrom: CascadeFrom<DateTimePicker>;
        value: any
    }
    interface TimePicker extends Kendo<TimePicker, kendo.ui.TimePicker> {
        bind: TimePicker.Event;
        max(value: Date): TimePicker;
        min(value: Date): TimePicker;
        cascadefrom: CascadeFrom<TimePicker>;
        value: any
    }
    interface NumericTextBox extends Kendo<NumericTextBox, kendo.ui.NumericTextBox> {
        bind: NumericTextBox.Event;
        max(value: number): NumericTextBox;
        min(value: number): NumericTextBox;
        cascadefrom: CascadeFrom<NumericTextBox>;
        value: any
    }
    interface MaskedTextBox extends Kendo<MaskedTextBox, kendo.ui.MaskedTextBox> {
        bind: MaskedTextBox.Event;
        value: any
    }
    interface ContextMenu {
        kendo: kendo.ui.ContextMenu;
        bind: ContextMenu.Event;
    }
    interface Upload {
        kendo: kendo.ui.Upload;
        bind: Upload.Event;
        error(bool?: boolean): Upload;
        container: JQuery;
    }
    interface Accordion {
        kendo: kendo.ui.PanelBar;
        bind: Accordion.Event;
    }
    interface TabStrip {
        kendo: kendo.ui.TabStrip;
        bind: TabStrip.Event;
        add(title: string, url: url, key: string, x?: boolean): TabStrip;
        activate(key: string): TabStrip;
        remove(key: string): TabStrip;
    }
    interface Grid {
        kendo: kendo.ui.Grid;
        refresh(): Grid;
        name: string;
        data: any;
        checkedRecords: any[];
        uncheckRecords(): Grid;
        table: Grid.Table;
    }
}

declare module Wizardsgroup.UI.Kendo.TextBox {
    interface Event {
        change(callback: (textbox: TextBox) => void): TextBox;
    }
    interface Config {
        value(val: any): Config;
        serverFiltering(bool: boolean): Config;
        dataSource(url: url): Config;
        dataSource(data: string[]): Config;
        dataSource(data: kendo.data.DataSource): Config;
    }
    interface Options extends kendo.ui.AutoCompleteOptions {
        maxLength?: number;
        container?: any;
        serverFiltering?: boolean;
    }
}
declare module Wizardsgroup.UI.Kendo.ComboBox {
    interface Config {
        dataSource(url: url): Config;
        dataSource(data: TextValue[]): Config;
        dataSource(data: kendo.data.DataSource): Config;
        cascadeFrom(id: string): Config;
        maxLength(int: number): Config;
        value(val: string): Config;
    }
    interface Options extends kendo.ui.ComboBoxOptions {
        maxLength?: number;
        container?: any;
    }
    interface Event {
        change(callback: (combobox: ComboBox) => void): ComboBox;
    }
}
declare module Wizardsgroup.UI.Kendo.MultiSelect {
    interface Config {
        value(val: string): Config;
        value(val: string[]): Config;
        dataSource(url: url): Config;
        dataSource(data: TextValue[]): Config;
        dataSource(data: kendo.data.DataSource): Config;
        cascadeFrom(id: string): Config;
    }
    interface Event {
        change(callback: (multiselect: MultiSelect) => void): MultiSelect;
    }
    interface Options extends kendo.ui.MultiSelectOptions {
        serverFiltering?: boolean;
        maxLength?: number;
        container?: any;
    }
}
declare module Wizardsgroup.UI.Kendo.DatePicker {
    interface Config {
        max(date: Date): Config;
        min(date: Date): Config;
        format(str: string): Config;
        value(val: Date): Config;
        cascadeFrom(id: string): Config;
    }
    interface Options extends kendo.ui.DatePickerOptions {
        container: any;
        maxLength: number;
    }
    interface Event {
        change(callback: (datepicker: DatePicker) => void): DatePicker;
    }
}
declare module Wizardsgroup.UI.Kendo.DateTimePicker {
    interface Config {
        max(date: Date): Config;
        min(date: Date): Config;
        format(str: string): Config;
        value(val: Date): Config;
        cascadeFrom(id: string): Config;
    }
    interface Options extends kendo.ui.DateTimePickerOptions {
        container: any;
        maxLength: number;
    }
    interface Event {
        change(callback: (datetimepicker: DateTimePicker) => void): DateTimePicker;
    }
}
declare module Wizardsgroup.UI.Kendo.TimePicker {
    interface Config {
        max(date: Date): Config;
        min(date: Date): Config;
        format(str: string): Config;
        value(val: Date): Config;
        cascadeFrom(id: string): Config;
        interval(minutes: number): Config;
    }
    interface Options extends kendo.ui.TimePickerOptions {
        container: any;
        maxLength: number;
    }
    interface Event {
        change(callback: (timepicker: TimePicker) => void): TimePicker;
    }
}
declare module Wizardsgroup.UI.Kendo.NumericTextBox {
    interface Config {
        spinner(bool: boolean): Config;
        max(value: number): Config;
        min(value: number): Config;
        format(str: string): Config;
        decimals(int: number): Config;
        cascadeFrom(id: string): Config;
        value(val: number): Config;
    }
    interface Options extends kendo.ui.NumericTextBoxOptions {
        container?: any;
    }
    interface Event {
        change(callback: (numerictextbox: NumericTextBox) => void): NumericTextBox;
    }
}
declare module Wizardsgroup.UI.Kendo.MaskedTextBox {
    interface Config {
        mask(str: string): Config;
        value(val: any): Config;
    }
    interface Options extends kendo.ui.MaskedTextBoxOptions {
        container?: any;
        format?: string;
    }
    interface Event {
        change(callback: (maskedtextbox: MaskedTextBox) => void): MaskedTextBox;
    }
}
declare module Wizardsgroup.UI.Kendo.ContextMenu {
    interface Config {
        target(selector: string): void;
    }
    interface Options extends kendo.ui.ContextMenuOptions {

    }
    interface Event {

    }
}
declare module Wizardsgroup.UI.Kendo.Upload {
    interface Config {
        autoUpload(bool: boolean): Config;
        batchUpload(bool: boolean): Config;
        saveUrl(url: url): Config;
        removeUrl(url: url): Config;
    }
    interface Options extends kendo.ui.UploadOptions {

    }
    interface File {
        extension: string;
        name: string;
        size: number;
        uid: string;
    }
    interface Event {
        error(callback: (upload: Upload, file: File) => void): Upload;
        remove(callback: (upload: Upload, file: File) => void): Upload;
        select(callback: (upload: Upload, file: File) => void): Upload;
        success(callback: (upload: Upload, file: File) => void): Upload;
        upload(callback: (upload: Upload, files: File) => void): Upload;
        //cancel(callback: (upload: Upload, files: File) => void): Upload;
        //complete(callback: (upload: Upload, files: File) => void): Upload;
    }
}
declare module Wizardsgroup.UI.Kendo.Accordion {
    interface Config {
        expandMode(mode: string): Config;
        expandMode(mode: "single"): Config;
        expandMode(mode: "multiple"): Config;
        addItem(title: string, content: url): Config;
        addItem(title: string, content: any): Config;
        addItem(title: string, content: url, expanded: boolean): Config;
        addItem(title: string, content: any, expanded: boolean): Config;
    }
    interface Item {
        text: string;
        contentUrl?: url;
        content?: any;
        expanded: boolean;
    }
    interface Options extends kendo.ui.PanelBarOptions {
        items?: Item[];
    }
    interface Event {
        expand(item: string, callback: (accordion: Accordion, element: JQuery) => void): Accordion;
        expand(item: string[], callback: (accordion: Accordion, element: JQuery) => void): Accordion;
        expand(callback: (accordion: Accordion, element: JQuery) => void): Accordion;
        collapse(item: string, callback: (accordion: Accordion, element: JQuery) => void): Accordion;
        collapse(item: string[], callback: (accordion: Accordion, element: JQuery) => void): Accordion;
        collapse(callback: (accordion: Accordion, element: JQuery) => void): Accordion;
        load(item: string, callback: (accordion: Accordion, element: JQuery) => void): Accordion;
        load(item: string[], callback: (accordion: Accordion, element: JQuery) => void): Accordion;
        load(callback: (accordion: Accordion, element: JQuery) => void): Accordion;
    }
}
declare module Wizardsgroup.UI.Kendo.TabStrip {
    interface Config {

    }
    interface Options extends kendo.ui.TabStripOptions {

    }
    interface Event {
        load(item: string, callback: (tab: TabStrip, content: JQuery, element: JQuery) => void): TabStrip;
        load(item: string[], callback: (tab: TabStrip, content: JQuery, element: JQuery) => void): TabStrip;
    }
}
declare module Wizardsgroup.UI.Kendo.Grid {
    interface Config {
        dataSource(url: url): Config;
        dataSource(data: any);
        dataSource(data: kendo.data.DataSource): Config;
        serverPaging(bool: boolean): Config;
        pageSize(int: number): Config;
    }
    interface Options extends kendo.ui.GridOptions {
        serverFiltering?: boolean;
        container?: any;
        resize?: boolean;
    }
    interface Event {
        //refresh(callback: (grid: Grid) => void): void;
    }
    interface Table {
        columns(name: string): Table.Columns;
    }
}
declare module Wizardsgroup.UI.Kendo.Grid.Table {
    interface Columns {
        each(fn: (column: Column) => void): void;
    }
    interface Cell {
        red(): void;
        text: string;
    }
    interface Column extends Cell {
        row: Row;
    }
    interface Row {
        red(): void;
    }
}

declare module Wizardsgroup.UI.Bootstrap {
    interface Modal {
        html(content: any): Modal;
        html(content: any, callback: (modal: Modal) => void): Modal;
        open(): void;
        open(callback: (modal: Modal) => void): void;
        close(): void;
        close(callback: (modal: Modal) => void): void;
        block(): Modal;
        block(callback: (modal: Modal) => void): Modal;
        unblock(): Modal;
        unblock(callback: (modal: Modal) => void): Modal;
        form(): Html.Form;
        form(name: string): Html.Form;
    }
    interface DualListBox {
        cascadefrom: CascadeFrom<DualListBox>;
        bind: DualListBox.Events;
        move(number: string): void;
        move(btn: "left"): void;
        move(btn: "left-all"): void;
        move(btn: "right"): void;
        move(btn: "right-all"): void;
        error(bool: boolean): DualListBox;
        //readonly(bool: boolean): DualListBox;
        container: JQuery;
    }
}
declare module Wizardsgroup.UI.Bootstrap.Modal {
    interface Config extends Config.Title, Config.Width, Config.Button {

    }
    interface Options extends ModalOptions {
        type?: string;
    }
}
declare module Wizardsgroup.UI.Bootstrap.Modal.Config {
    interface Title {
        title(str: string): Width;
    }
    interface Width {
        width(str: string): void;
        width(size: "modal-sm"): Button;
        width(size: "modal-md"): Button;
        width(size: "modal-lg"): Button;
    }
    interface Button {
        button(text: string): Button;
        button(text: string, click: (modal: Modal) => void): Button;
        button(text: string, click: (modal: Modal) => void, attributes: any): Button;
    }
}
declare module Wizardsgroup.UI.Bootstrap.DualListBox {
    interface Config {
        left: Box;
        right: Box;
        height(size: number): Config;
        dataSource(url: url): Config;
        dataSource(data: TextValue[]): Config;
        dataSource(data: kendo.data.DataSource): Config;
        filterable(bool: boolean): Config;
        cascadeFrom(id: string): Config;
    }
    interface Box {
        title(str: string): Config;
    }
    interface Options {
        id?: any,
        container?: any;
        height?: number;
        timeout?: number;
        left?: {
            title?: string;
        };
        right?: {
            title?: string;
        };
        filterable?: boolean;
        dataSource?: any;
    }
    interface Events {
        move(callback: (box: DualListBox, list: TextValue[], btn: number) => void): void;
    }
}

declare module Wizardsgroup.UI.Html {
    interface Form {
        bind: Form.Event;
        submit(): Ajax.Request.Success;
    }
    interface Label {
        hide(): Label;
        show(): Label;
        text: string;
    }
    interface Notification {
        success(msg: string): void;
        info(msg: string): void;
        warning(msg: string): void;
        error(msg: string): void;
        display(result: Ajax.Request.Result): void;
    }
    interface Iframe {
        resize(): void;
        resize(int: number): void;
    }
}
declare module Wizardsgroup.UI.Html.Form {
    interface Event {
        onsubmit(fn: (form: Form) => boolean): Form;
    }
}

interface Static {
    parentID(id: string): void;
    config: Wizardsgroup.Config;
    window: Wizardsgroup.Window;
    iframe: Wizardsgroup.UI.Html.Iframe;
    http: Wizardsgroup.Ajax.Http;
    bind: Wizardsgroup.Bind;
    tab: Wizardsgroup.UI.Kendo.TabStrip;
    notification: Wizardsgroup.UI.Html.Notification;
    url(path: string): url;
    download(url: url): void;
    alert(msg: string): void;
    alert(msg: string, callback: Function): void;
    alert(msg: string, callback: Function, title: string): void;
    confirm(msg: string, callback: (bool: boolean) => void): void;
    confirm(msg: string, callback: (bool: boolean) => void, title: string): void;
    dataSource(url: url, data?: any): void;
    dataSource(data: TextValue[]): void;
    dataSource(options: kendo.data.DataSourceOptions): kendo.data.DataSource;
    scrollTop: number;
}

interface Common {
    modal(): Wizardsgroup.UI.Bootstrap.Modal;
    modal(config?: Action<Wizardsgroup.UI.Bootstrap.Modal.Config.Title>): Wizardsgroup.UI.Bootstrap.Modal;
    modal(config?: Action<Wizardsgroup.UI.Bootstrap.Modal.Config.Title>, options?: Wizardsgroup.UI.Bootstrap.Modal.Options): Wizardsgroup.UI.Bootstrap.Modal;
}

interface Wizardsgroup extends Static, Common {
    (arg: any): Wizardsgroup.UI;
}

interface Action<T> {
    (type: T): void;
}

interface Func<TInput, TResult> {
    (type: TInput): TResult;
}

interface JQuery {
    wg(): any[];
    wg(key: string): any;
    wg(key: string, data: any): void;
    url(data?: Object): url;

    block(options?: any): void;
    unblock(): void;

    html(object: JQuery): JQuery;
    unwrap(object: JQuery): JQuery;

    filterByText(element: JQuery, timeout: number): JQuery;
    sortOptions(): JQuery;
    isVisible(): JQuery;
    center(): JQuery;
    sort(fn: Function): JQuery;

    hasChild(selector: string): boolean;
    attributes(): any[];
    bind(eventType: string, handler: (eventObject: JQueryEventObject, data: any) => void): JQuery;
}

interface IElement {
    jquery: JQuery;
}

interface UnderscoreStatic {
    isGuid(str: any): boolean;
    isUrl(str: any): boolean;
}

declare module kendo.data {
    interface DataSourceSchema {
        title: string;
    }
}

interface String {
    trimEventName(): string;
    toTitle(): string;
}

interface Date {
    format(mask: string, utc?: string): string;
}

interface url {

}

interface TextValue {
    Text: string;
    Value: any;
}

interface Window {
    __config: Wizardsgroup.Config;
    __window: Wizardsgroup.Window;
    __iframe: Wizardsgroup.UI.Html.Iframe;
    __notification: Wizardsgroup.UI.Html.Notification;
    __tab: Wizardsgroup.UI.Kendo.TabStrip;
    __scrollTop: number;
}

declare enum Status {
    success, failed, warning, serverException
}

declare enum Color {
    green, blue, orange, red, violet
}

declare enum Browser {
    firefox, ie, chrome
}

declare enum Button {
    default, primary, success, info, warning, danger
}

declare function wizardsgroup(fn: (wg: Wizardsgroup) => void): void;
declare function application(fn: (wg: Wizardsgroup) => void): void;
declare var __baseurl: string;
