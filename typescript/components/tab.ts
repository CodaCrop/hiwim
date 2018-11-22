namespace TMNL {
    (function ($: JQueryStatic, window: any, document: any) {

        class Tab extends JQueryPluginBase {
            public static NAME: string = 'tab';

            public static DATA_KEY: string = 'tmnl.tab';

            public static CSS: any = {
                TAB_ACTIVE: 'is-active',
                PANE_ACTIVE: 'is-active'
            }

            public static SELECTOR: any = {
                CONTAINER: '[data-tab]',
                CONTENT: '[data-tab-content]'
            };

            public static EVENT: any = {
                TAB_CLICK: 'click.tab'
            };

            private $content: JQuery;

            constructor(element: Element) {
                super(Tab.NAME, element);
                this.$content = this.$element.next(Tab.SELECTOR.CONTENT);
                this.init();
            }

            init(): void {
            }

            show(event: any): void {
                const $target = $(event.target);

                if ($target.parent().hasClass(Tab.CSS.TAB_ACTIVE)) {
                    return;
                } else {
                    $target.parent().siblings().removeClass(Tab.CSS.TAB_ACTIVE);
                    $target.parent().siblings().attr('aria-selected','false');
                    $target.parent().addClass(Tab.CSS.TAB_ACTIVE);
                    $target.parent().attr('aria-selected','true');
                }

                this.$content.children().removeClass(Tab.CSS.PANE_ACTIVE);
                this.$content.find($target.attr('href')).addClass(Tab.CSS.PANE_ACTIVE);
            }
        }

        function Plugin(config: string, parameters?: any) {
            return this.each(function () {
                const $this = $(this);
                let plugin = $this.data(Tab.DATA_KEY);

                if (!plugin) {
                    plugin = new Tab(this);
                    $this.data(Tab.DATA_KEY, plugin);
                }

                if (typeof config === 'string') {
                    if (typeof plugin[config] === 'undefined') {
                        throw new Error(`No method named "${config}"`);
                    }
                    plugin[config](parameters);
                }
            });
        }

        $(document).on(Tab.EVENT.TAB_CLICK, Tab.SELECTOR.CONTAINER, function (event) {
            event.preventDefault();
            Plugin.call($(this), 'show', event);
        });

        $.fn[Tab.NAME] = Plugin
        $.fn[Tab.NAME].Constructor = Tab

    })(jQuery, window, document);
}