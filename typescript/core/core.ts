namespace TMNL {
    class Core {
        private $html: JQuery;

        constructor() {
            this.$html = $('html');

            Util.hasTouch() ? this.$html.addClass('touch') : this.$html.addClass('no-touch');

            // If this is a touch-enabled device we add extra
            // empty mouseover listeners to the body's immediate children;
            // only needed because of broken event delegation on iOS
            // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
            if ('ontouchstart' in document.documentElement) {
                $('body').children().on('mouseover', null, $.noop);
            }

            $(document).on('click', '[data-analytics-click]', function (event) {
                var data = $(this).data('analytics-click');
                Analytics.register(data);
            });

            $(document).on('click', '[data-analytics-click-once]', function (event) {
                var data = $(this).data('analytics-click-once');
                Analytics.register(data);
                $(this).removeAttr('data-analytics-click-once');
            });

            $(document).on('change', '[data-analytics-change]', function (event) {
                var data = $(this).find(':selected').data('analytics-change-value');
                Analytics.register(data);
            });
        }
    }

    new Core();
}