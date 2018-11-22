namespace TMNL {
    (function ($: JQueryStatic, window: any, document: any) {

        class Toggle extends JQueryPluginBase {
            public static NAME: string = 'toggle';

            public static DATA_KEY: string = 'tmnl.toggle';

            public static CSS: any = {
                OPENED_TOGGLE: 'is-opened'
            }

            public static EVENT: any = {
                TOGGLE_CLICK: 'click.toggle'
            };

            public static SELECTOR: any = {
                TOGGLE: '[data-toggle]'
            }

            public static DEFAULTS: ToggleOptions = {
                selector: null,
                parent: null
            }

            constructor(element: Element, options: any) {
                super(Toggle.NAME, element, Toggle.DEFAULTS, options);
                this.init();
            }

            init(): void {
                if (typeof this.options.selector === 'undefined' || this.options.selector === null) {
                    throw new Error("No selector configured for toggle.");
                }
            }

            toggle(): void {
                this.$element.toggleClass(Toggle.CSS.OPENED_TOGGLE);

                $(this.options.selector).stop(true, false).slideToggle('slow');

                if (typeof this.options.parent !== 'undefined' && this.options.parent !== null) {
                    $(this.options.selector).parents(this.options.parent).toggleClass(Toggle.CSS.OPENED_TOGGLE);
                }
            }
        }

        function Plugin(config: string, parameters?: any) {
            return this.each(function () {
                const $this = $(this);
                let plugin = $this.data(Toggle.DATA_KEY);

                if (!plugin) {
                    let options = $this.data(Toggle.NAME);
                    plugin = new Toggle(this, options);
                    $this.data(Toggle.DATA_KEY, plugin);
                }

                if (typeof config === 'string') {
                    if (typeof plugin[config] === 'undefined') {
                        throw new Error(`No method named "${config}"`);
                    }
                    plugin[config](parameters);
                }
            });
        }

        $(document).on(Toggle.EVENT.TOGGLE_CLICK, Toggle.SELECTOR.TOGGLE, function (event) {
            event.preventDefault();
            Plugin.call($(this), 'toggle', event);
        });

    })(jQuery, window, document);
}