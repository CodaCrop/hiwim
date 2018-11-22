namespace TMNL {
    (function ($: JQueryStatic, window: any, document: any) {

        class FormNumber extends JQueryPluginBase {
            public static NAME: string = 'form-number';

            public static DATA_KEY: string = 'tmnl.form-number';

            public static EVENT: any = {
                FORM_NUMBER_CLICK: 'click.form-number'
            };

            public static SELECTOR: any = {
                CONTAINER: '[data-form-number]',
                BUTTON_PLUS: '[data-form-number-plus]',
                BUTTON_MINUS: '[data-form-number-minus]'
            }

            public static DEFAULTS: FormNumberOptions = {
                max: null,
                min: null                   
            }

            private $input: JQuery;

            constructor(element: Element, options: any) {
                super(FormNumber.NAME, element, FormNumber.DEFAULTS, options);
                this.$input = $(element).find('input');
                this.init();
            }

            init(): void {
                if (typeof this.options.max === 'undefined' || this.options.max === null) {
                    throw new Error("No max configured for form number.");
                }

                if (typeof this.options.min === 'undefined' || this.options.min === null) {
                    throw new Error("No min configured for form number.");
                }
            }

            change(event): void {
                if($(event.target).is('[data-form-number-minus]')) {
                    if(this.$input.val() > this.options.min){
                        this.$input.val( parseInt(this.$input.val().toString()) - 1);
                    }
                }

                if($(event.target).is('[data-form-number-plus]')) {
                    if(this.$input.val() < this.options.max){
                        this.$input.val( parseInt(this.$input.val().toString()) + 1);
                    }
                }
            }
        }

        function Plugin(config: string, parameters?: any) {
            return this.each(function () {
                const $this = $(this);
                let plugin = $this.data(FormNumber.DATA_KEY);

                if (!plugin) {
                    let options = $this.data(FormNumber.NAME);
                    plugin = new FormNumber(this, options);
                    $this.data(FormNumber.DATA_KEY, plugin);
                }

                if (typeof config === 'string') {
                    if (typeof plugin[config] === 'undefined') {
                        throw new Error(`No method named "${config}"`);
                    }
                    plugin[config](parameters);
                }
            });
        }

        $(document).on(FormNumber.EVENT.FORM_NUMBER_CLICK, FormNumber.SELECTOR.CONTAINER, function (event) {
            event.preventDefault();
            Plugin.call($(this).closest(FormNumber.SELECTOR.CONTAINER), 'change', event);
        });

        $.fn[FormNumber.NAME] = Plugin
        $.fn[FormNumber.NAME].Constructor = FormNumber

    })(jQuery, window, document);
}