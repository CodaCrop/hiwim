namespace TMNL {
    (function ($: JQueryStatic, window: any, document: any) {

        class GalleryImages extends JQueryPluginBase {
            public static NAME: string = 'gallery-images';

            public static CSS: any = {
                THUMBNAIL_ACTIVE: 'is-active'
            }

            public static SELECTOR: any = {
                CONTAINER: '[data-gallery-images]',
                IMAGE: '[data-gallery-image]',
                THUMBNAILS: '[data-gallery-thumbnails]',
                THUMBNAIL: '[data-gallery-images-thumbnail]'
            }

            private $container: JQuery;
            private $image: JQuery;
            private $thumbnails: JQuery;

            constructor(element: Element) {
                super(GalleryImages.NAME, element);
                this.$container = this.$element;
                this.$image = this.$element.find(GalleryImages.SELECTOR.IMAGE);
                this.$thumbnails = this.$container.find(GalleryImages.SELECTOR.THUMBNAIL);
                this.init();
            }

            init(): void {
                this.$thumbnails.on('click', (e) => {
                    var element = $(e.target).closest(GalleryImages.SELECTOR.THUMBNAIL);
                    var url = element.children('img').attr('src');

                    this.$image.attr('src', url);
                    this.$thumbnails.removeClass(GalleryImages.CSS.THUMBNAIL_ACTIVE);
                    element.addClass(GalleryImages.CSS.THUMBNAIL_ACTIVE);
                });
            }
        }

        $(document).ready(function (event) {
            $(GalleryImages.SELECTOR.CONTAINER)[GalleryImages.NAME]();
        });

        $.fn[GalleryImages.NAME] = function (options: any) {
            return this.each(function () {
                let $this = $(this);
                if (!$this.data(GalleryImages.NAME)) {
                    $this.data(GalleryImages.NAME, new GalleryImages(this));
                }
            });
        };

    })(jQuery, window, document);
}