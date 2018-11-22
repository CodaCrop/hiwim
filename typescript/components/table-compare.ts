namespace TMNL {
    (function ($: JQueryStatic, window: any, document: any) {

        $(document).ready(function (event) {
            const tabletVw = 979;
            let resizeTimeout;

            if ($(window).width() <= tabletVw) {
                floatingTableHead(true);
            }

            $(window).resize(function() {
                if ($(window).width() > tabletVw) {
                    floatingTableHead(false);
                } else {
                    clearInterval(resizeTimeout);
                    resizeTimeout = setInterval(floatingTableHead(true), 1000);
                }
            });
        });

        var flag = false;
        function floatingTableHead(bool) {
            const table = (<any>$('table.table-compare'));
            const thFloat = (<any>$('table.table-compare-float > thead'));
            const thOfType = (<any>$('table.table-compare > thead:nth-of-type(2)'));

            if (bool) {
                thOfType.remove();
                table.floatThead({
                    zIndex: 2,
                    top: 80,
                    bottom: -180,
                    floatTableClass: "table-compare-float"
                });
                table.trigger('reflow')
                flag = false;
            } else if (!bool && !flag) {
                thOfType.remove();
                thFloat.clone().prependTo(table);
                table.floatThead('destroy');
                flag = true;
            }
            return null;
        }

    })(jQuery, window, document);
}