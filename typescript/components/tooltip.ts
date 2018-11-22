namespace TMNL {
    (function ($: JQueryStatic, window: any, document: any) {

        class Tooltip extends JQueryPluginBase {
            public static NAME: string = 'tooltip';

            public static DATA_KEY: string = 'tmnl.tooltip';

            public static CSS: any = {
                TOOLTIP_SHOW: 'is-shown'
            }

            public static SELECTOR: any = {
                ARROW: '[data-tooltip-arrow]',
                TRIGGER: '[data-tooltip]'
            };

            public static DEFAULTS: TooltipOptions = {
                delay: 200,
                placement: 'top',
                template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow" data-tooltip-arrow x-arrow></div>{0}</div>'                
            }

            public static EVENT: any = {
                TOOLTIP_MOUSEENTER: 'mouseenter.tooltip',
                TOOLTIP_MOUSELEAVE: 'mouseleave.tooltip'
            };

            private popper: any;
            private title: string;
            private $tooltip: JQuery;
            private timeout: any;

            constructor(element: Element, options: any) {
                super(Tooltip.NAME, element, Tooltip.DEFAULTS, options);

                this.init();
            }

            init(): void {
                this.title = this.$element.attr('title');
                
                if (typeof this.title === 'undefined') {
                    throw new TypeError('No title attribute specified on HTML element.');
                } else {
                    this.$element.removeAttr('title');
                }

                this.$tooltip = $(this.options.template.replace('{0}', this.title));
                if (!$.contains(this.element.ownerDocument.documentElement, this.$tooltip[0])) {
                    this.$tooltip.appendTo(document.body);
                }

                this.popper = new Popper(this.element, this.$tooltip[0], {
                    placement: 'top',
                    modifiers: {
                        arrow: {
                            element: this.$tooltip.find(Tooltip.SELECTOR.ARROW)[0]
                        }
                    }
                });
            }

            show(event: any): void {
                this.popper.update();

                if (this.$tooltip.hasClass(Tooltip.CSS.TOOLTIP_SHOW)) {
                    return;
                } else {
                    this.$tooltip.addClass(Tooltip.CSS.TOOLTIP_SHOW);
                }
            }

            hide(event: any): void {
                this.popper.update();
                
                clearTimeout(this.timeout);

                this.timeout = setTimeout(() => {
                    this.$tooltip.removeClass(Tooltip.CSS.TOOLTIP_SHOW);
                }, this.options.delay);
            }
        }

        function Plugin(config: string, parameters?: any) {
            return this.each(function () {
                const $this = $(this);
                let plugin = $this.data(Tooltip.DATA_KEY);

                if (!plugin) {
                    plugin = new Tooltip(this, null);
                    $this.data(Tooltip.DATA_KEY, plugin);
                }

                if (typeof config === 'string') {
                    if (typeof plugin[config] === 'undefined') {
                        throw new Error(`No method named "${config}"`);
                    }
                    plugin[config](parameters);
                }
            });
        }

        $(document).on('mouseenter', Tooltip.SELECTOR.TRIGGER, (event) => {
            event.preventDefault();
            Plugin.call($(event.target), 'show', event);
        });

        $(document).on('mouseleave', Tooltip.SELECTOR.TRIGGER, (event) => {
            event.preventDefault();
            Plugin.call($(event.target), 'hide', event);
        });

        $.fn[Tooltip.NAME] = Plugin
        $.fn[Tooltip.NAME].Constructor = Tooltip

    })(jQuery, window, document);
}