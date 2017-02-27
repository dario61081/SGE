/**
 * Created by dario on 21/02/17.
 */
PrimeFaces.widget.DataGrid = PrimeFaces.widget.BaseWidget.extend({
    init: function (a) {
        this._super(a);
        this.cfg.formId = $(this.jqId).closest("form").attr("id");
        this.content = $(this.jqId + "_content");
        if (this.cfg.paginator) {
            this.setupPaginator()
        }
    }, setupPaginator: function () {
        var a = this;
        this.cfg.paginator.paginate = function (b) {
            a.handlePagination(b)
        };
        this.paginator = new PrimeFaces.widget.Paginator(this.cfg.paginator)
    }, hasBehavior: function (a) {
        if (this.cfg.behaviors) {
            return this.cfg.behaviors[a] !== undefined
        }
        return false
    }, handlePagination: function (d) {
        var c = this, b = {
            source: this.id,
            update: this.id,
            process: this.id,
            formId: this.cfg.formId,
            params: [{name: this.id + "_pagination", value: true}, {
                name: this.id + "_first",
                value: d.first
            }, {name: this.id + "_rows", value: d.rows}],
            onsuccess: function (g, e, f) {
                PrimeFaces.ajax.Response.handle(g, e, f, {
                    widget: c, handle: function (h) {
                        this.content.html(h)
                    }
                });
                return true
            },
            oncomplete: function () {
                c.paginator.cfg.page = d.page;
                c.paginator.updateUI()
            }
        };
        if (this.hasBehavior("page")) {
            var a = this.cfg.behaviors.page;
            a.call(this, b)
        } else {
            PrimeFaces.ajax.Request.handle(b)
        }
    }, getPaginator: function () {
        return this.paginator
    }
});