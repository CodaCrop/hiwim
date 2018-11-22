namespace TMNL {
    (function ($: JQueryStatic, window: any, document: any) {

        class Carousel extends JQueryPluginBase {
            public static NAME: string = 'carousel';

            public static DEFAULTS: CarouselOptions = {
                arrows: false,
                slidesToShow: {
                    "mobile": 1,
                    "tablet": 2,
                    "desktop": 5
                }
            };

            public static DATA_KEY: string = 'tmnl.carousel';

            public static SELECTOR: any = {
                CONTAINER: '[data-carousel]',
                CAROUSEL_ITEM: '[data-carousel-item]'
            };

            private $content: JQuery;
            private $carouselItem: JQuery;
            private $hightlightedSlide: JQuery;
            private carouselDots: any;
            private initialSlideIndex: any;

            constructor(element: Element, options: any) {
                super(Carousel.NAME, element, Carousel.DEFAULTS, options);
                this.$carouselItem = $(this.$element.find(Carousel.SELECTOR.CAROUSEL_ITEM));
                this.$hightlightedSlide = $('.is-active').closest(Carousel.SELECTOR.CAROUSEL_ITEM);
                this.carouselDots  = {
                    "desktop": this.$carouselItem.length > this.options.slidesToShow.desktop,
                    "tablet": this.$carouselItem.length > this.options.slidesToShow.tablet,
                    "mobile": true
                };
                this.initialSlideIndex = {
                    "desktop": 0,
                    "tablet": 0,
                    "mobile": 0
                };

                this.init();
            }

            init(): void {
                this.createCarousel();
            }

            createCarousel() {
                if (this.$carouselItem.index(this.$hightlightedSlide) > 0) {
                    this.initialSlideIndex.desktop = this.$carouselItem.index(this.$hightlightedSlide) - 1;
                    this.initialSlideIndex.tablet = this.$carouselItem.index(this.$hightlightedSlide) - 1;
                    this.initialSlideIndex.mobile = this.$carouselItem.index(this.$hightlightedSlide);
                }

                this.$element.slick({
                    slidesToShow: this.options.slidesToShow.desktop,
                    slidesToScroll: 1,
                    arrows: this.options.arrows,
                    infinite: false,
                    dots: this.carouselDots.desktop,
                    initialSlide: this.initialSlideIndex.desktop,
                    responsive: [
                        {
                            breakpoint: 980,
                            settings: {
                                dots: this.carouselDots.tablet,
                                initialSlide: this.initialSlideIndex.tablet,
                                slidesToShow: this.options.slidesToShow.tablet
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                arrows: false,
                                centerMode: true,
                                centerPadding: '30px',
                                dots: this.carouselDots.mobile,
                                initialSlide: this.initialSlideIndex.mobile,
                                slidesToShow: this.options.slidesToShow.mobile
                            }
                        }
                    ]
                });
            }
        }

        $(document).ready(function (event) {
            $(Carousel.SELECTOR.CONTAINER)[Carousel.NAME]();
        });

        $.fn[Carousel.NAME] = function (options: any) {
            return this.each(function () {
                let $this = $(this);
                $this.data(Carousel.NAME, new Carousel(this, $this.data("carousel")));
            });
        };

    })(jQuery, window, document);
}