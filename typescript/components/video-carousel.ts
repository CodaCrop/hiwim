namespace TMNL {
    (function ($: JQueryStatic, window: any, document: any) {

        class VideoCarousel extends JQueryPluginBase {
            public static NAME: string = 'video-carousel';

            public static DATA_KEY: string = 'tmnl.video-carousel';
            
            public static CSS: any = {
                CAROUSEL_ITEM_ACTIVE: 'is-active',
                OVERLAY_OPEN: 'video-carousel-overlay-is-open',
                THUMBNAIL_ACTIVE: 'is-active'
            }

            public static SELECTOR: any = {
                CONTAINER: '[data-video-carousel]',
                PLAY_BUTTON: '[data-video-carousel-url]',
                CAROUSEL_ITEMS: '[data-video-carousel-items]',
                CAROUSEL_ITEM: '[data-video-carousel-item]',
                THUMBNAILS: '[data-video-carousel-thumbnails]',
                THUMBNAIL: '[data-video-carousel-thumbnail]',
                IFRAME: '[data-video-carousel-iframe]',
                OVERLAY: '[data-video-carousel-overlay]',
                OVERLAY_CLOSE: '[data-video-carousel-overlay-close]'
            };

            private $container: JQuery;
            private $carouselItem: JQuery;
            private $thumbnail: JQuery;
            private $iframe: JQuery;
            private $overlay: JQuery;
            private $overlayClose: JQuery;
            private $playButton: JQuery;
            private videoUrl:   string;

            constructor(element: Element) {
                super(VideoCarousel.NAME, element);
                this.$container = this.$element;
                this.$carouselItem = this.$container.find(VideoCarousel.SELECTOR.CAROUSEL_ITEM);
                this.$thumbnail = this.$container.find(VideoCarousel.SELECTOR.THUMBNAIL);
                this.$iframe = this.$container.find(VideoCarousel.SELECTOR.IFRAME);
                this.$overlay = this.$container.children(VideoCarousel.SELECTOR.OVERLAY);
                this.$overlayClose = this.$overlay.find(VideoCarousel.SELECTOR.OVERLAY_CLOSE);
                this.$playButton = this.$carouselItem.find(VideoCarousel.SELECTOR.PLAY_BUTTON);
                this.init();
            }

            init(): void {

                this.$thumbnail.on('click', (e) => {
                    var element = $(e.target).closest(VideoCarousel.SELECTOR.THUMBNAIL);
                    this.selectItem(element);
                });

                this.$playButton.on('click', (e) => {
                    this.videoUrl = $(e.target).closest(VideoCarousel.SELECTOR.PLAY_BUTTON).data('videoCarouselUrl');
                    this.showVideoOverlay(this.videoUrl);
                });

                this.$overlayClose.on('click', (e) => {
                    this.hideVideoOverlay();
                });
            }

            selectItem(element): void {
                this.hideVideoOverlay();

                var index = $(this.$thumbnail).index($(element).closest(VideoCarousel.SELECTOR.THUMBNAIL));

                this.$thumbnail.removeClass(VideoCarousel.CSS.THUMBNAIL_ACTIVE);
                $(element).closest(VideoCarousel.SELECTOR.THUMBNAIL).addClass(VideoCarousel.CSS.THUMBNAIL_ACTIVE);

                this.$carouselItem.removeClass(VideoCarousel.CSS.CAROUSEL_ITEM_ACTIVE);
                this.$carouselItem.eq(index).addClass(VideoCarousel.CSS.CAROUSEL_ITEM_ACTIVE);
            }

            showVideoOverlay(videoUrl): void {
                this.$container.addClass(VideoCarousel.CSS.OVERLAY_OPEN);
                this.$overlay.show();

                var autoplay = videoUrl.indexOf('?') === -1 ? "?autoplay=1&color=e20074" : "&autoplay=1&color=e20074";
                
                setTimeout(function () {
                    this.$iframe.attr('src', videoUrl + autoplay);
                }.bind(this), 350);
            }

            hideVideoOverlay(): void {
                this.$container.removeClass(VideoCarousel.CSS.OVERLAY_OPEN);
                this.$overlay.hide();
                this.$iframe.attr('src', '');
            }
        }

        $(document).ready(function (event) {
            $(VideoCarousel.SELECTOR.CONTAINER)[VideoCarousel.NAME]();
        });

        $.fn[VideoCarousel.NAME] = function (options: any) {
            return this.each(function () {
                let $this = $(this);
                if (!$this.data(VideoCarousel.NAME)) {
                    $this.data(VideoCarousel.NAME, new VideoCarousel(this));
                }
            });
        };

    })(jQuery, window, document);
}