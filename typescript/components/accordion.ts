namespace TMNL {
    (function ($: JQueryStatic, window: any, document: any) {

        class Accordion extends JQueryPluginBase {
            public static NAME: string = 'accordion';

            public static DATA_KEY: string = 'tmnl.accordion';

            public static CSS: any = {
                CONTENT_TOGGLE: 'accordion-panel-open'
            }

            public static SELECTOR: any = {
                CONTAINER: '[data-accordion]',
                TOGGLE: '[data-accordion-toggle]',
                TOGGLE_HIDE: '[data-accordion-toggle-hide]',
                TRIGGER_TOGGLE: '[data-accordion-trigger="toggle"]',
                PANEL: '[data-accordion-panel]',
                PANEL_CONTENT: '[data-accordion-panel-content]'
            }

            private $body: JQuery;

            constructor(element: Element) {
                super(Accordion.NAME, element);
                this.$body = $('body');
                this.init();
            }

            init(): void {
                this.$element.on('click', [Accordion.SELECTOR.TOGGLE, Accordion.SELECTOR.TRIGGER_TOGGLE].join(','), (event) => {                    
                    var $panel = $(event.target).parents(Accordion.SELECTOR.PANEL);
                    this.toggle($panel);
                });
            }

            toggle($panel: JQuery): void {
                var $toggle = $panel.find(Accordion.SELECTOR.TOGGLE);
                var $content = $panel.find(Accordion.SELECTOR.PANEL_CONTENT);

                if ($toggle.is(Accordion.SELECTOR.TOGGLE_HIDE) && $content.is(':visible')) {
                    $content.stop(true, false).animate({
                        opacity: 'toggle',
                        height: 'toggle'
                    }, function () {
                        $panel.toggleClass(Accordion.CSS.CONTENT_TOGGLE);
                    });
                    
                    return;
                }

                $panel.toggleClass(Accordion.CSS.CONTENT_TOGGLE);
                $content.stop(true, false).animate({
                    opacity: 'toggle',
                    height: 'toggle'
                });
            }
        }

        $(document).ready(function (event) {
            $(Accordion.SELECTOR.CONTAINER)[Accordion.NAME]();
        });

        $.fn[Accordion.NAME] = function (options: any) {
            return this.each(function () {
                let $this = $(this);
                let plugin = $this.data(Accordion.DATA_KEY);

                if (!plugin) {
                    $this.data(Accordion.DATA_KEY, new Accordion(this));
                }
            });
        };

    })(jQuery, window, document);
}