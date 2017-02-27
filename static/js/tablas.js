/**
 * Created by dario on 20/02/17.
 */
$(function ($, window) {

    $.fn.tabla = function () {
        var currentPage = 0;
        var numPerPage = 10;
        var $table = $(this);
        /*repaginado de la tabla*/
        $table.bind('repaginate', function () {
            $table.find('tbody tr').hide().slice(currentPage * numPerPage, (currentPage + 1) * numPerPage).show();
        });
        $table.trigger('repaginate');
        var numRows = $table.find('tbody tr').length;
        var numPages = Math.ceil(numRows / numPerPage);
        var $pager = $('<tfoot><tr><th colspan="100"><div class="navegador derecha"><i class="fa fa-chevron-circle-left control"></i><div class="buttons"></div><i class="fa fa-chevron-circle-right control"></i></div></th></tr></tfoot> ');
        for (var page = 0; page < numPages; page++) {
            $('<a class="item"></a>').text(page + 1).bind('click', {
                newPage: page
            }, function (event) {
                currentPage = event.data['newPage'];
                $table.trigger('repaginate');
                $(this).addClass('active').siblings().removeClass('active');
            }).appendTo($pager.find('.buttons')); //.addClass('clickable');
        }
        $pager.appendTo($table).find('a.item:first').addClass('active');
    }


}(jQuery));