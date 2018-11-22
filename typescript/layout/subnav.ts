namespace TMNL {
    (function ($: JQueryStatic, window: any, document: any) {

        class SubNav extends JQueryPluginBase {
            public static NAME: string = 'subnav';

            public static DEFAULTS: SubNavOptions = {
                scrollThreshold: 25
            };

            public static CSS: any = {                
                SCROLL_MIN: 'is-scrolled-min',
                SCROLL_MAX: 'is-scrolled-max'
            }

            public static SELECTOR: any = {
                ACTIVE_ITEM: '.is-active',
                ELEMENT: '[data-subnav]',
                SCROLL_CONTAINER: '[data-subnav-items]',
                BACK: '[data-subnav-back]',
                NEXT: '[data-subnav-next]'
            }

            private $items: JQuery;
            private currentPosition: number = 0;
            private $back: JQuery;
            private $next: JQuery;

            constructor(element: Element, options: any) {
                super(SubNav.NAME, element, SubNav.DEFAULTS, options);
                this.$items = this.$element.find(SubNav.SELECTOR.SCROLL_CONTAINER);
                this.$back = this.$element.find(SubNav.SELECTOR.BACK);
                this.$next = this.$element.find(SubNav.SELECTOR.NEXT);
                this.init();
            }

            init(): void {
                $(window).resize((event) => { this.scroll(event); });
                this.$back.on('click', (event) => { this.back(event); });
                this.$next.on('click', (event) => { this.next(event); });
                this.$items.on('scroll', (event) => { this.scroll(event); });                
                this.$items.trigger('scroll');
                this.scrollToActiveItem();
            }

            back(event: JQuery.Event): void {
                this.$items.animate({
                    scrollLeft: '-=100'
                })
            }

            next(event: JQuery.Event): void {
                this.$items.animate({
                    scrollLeft: '+=100'
                })
            }

            scroll(event: JQuery.Event): void {                
                var itemsWidth = this.$items.innerWidth();
                var itemsMaxScrollWidth = this.$items[0].scrollWidth;
                var currentScrollPosition = this.$items.scrollLeft();

                if ((currentScrollPosition + itemsWidth) >= (itemsMaxScrollWidth - this.options.scrollThreshold)) {
                    this.$element.addClass(SubNav.CSS.SCROLL_MAX);
                } else {
                    this.$element.removeClass(SubNav.CSS.SCROLL_MAX);
                }

                if (currentScrollPosition <= (0 + this.options.scrollThreshold)) {
                    this.$element.addClass(SubNav.CSS.SCROLL_MIN);
                } else {
                    this.$element.removeClass(SubNav.CSS.SCROLL_MIN);
                }
            }

            scrollToActiveItem(): void {
                let activeItem = this.$items.find(SubNav.SELECTOR.ACTIVE_ITEM);

                if (activeItem.length > 0) {
                    this.$items.animate({
                        scrollLeft: (activeItem.offset().left - (activeItem.width() /2))
                    })
                }
            }
        }

        $(document).ready(function (event) {
            $(SubNav.SELECTOR.ELEMENT)[SubNav.NAME]();
        });

        $.fn[SubNav.NAME] = function (options: any) {
            return this.each(function () {
                let $this = $(this);
                if (!$this.data(SubNav.NAME)) {
                    $this.data(SubNav.NAME, new SubNav(this, options));
                }
            });
        };

    })(jQuery, window, document);
}