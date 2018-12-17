namespace TMNL {
    (function ($: JQueryStatic, window: any, document: any) {
        class FloatingActionButton extends JQueryPluginBase {

            public static NAME: string = 'tmnl.floatingactionbutton';

            public static DEFAULTS: NavBarOptions = {
                sticky: true
            };

            public static CSS: any = {
                FLOATING_ACTION_CONTAINER: 'floating-action-container'
            }

            // public static EVENT: any = {
            //     TOGGLE_CLICK: 'click.modal.toggle'
            // };

            public static SELECTOR: any = {
            }

            // private $body: JQuery;
            // private $html: JQuery;

            constructor(element: Element, options: any) {
                super(FloatingActionButton.NAME, element, FloatingActionButton.DEFAULTS, options);
                this.init();
            }

            init(): void {}
        }

        $(document).ready(function (event) {
            var container = $(FloatingActionButton.CSS.FLOATING_ACTION_CONTAINER);
            
            if (container.css("position") !== "sticky") {
                // if no support for sticky...
                $(window).scroll(function(event) {

                });
            }
        });

    })(jQuery, window, document);
}