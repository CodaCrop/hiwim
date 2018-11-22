namespace TMNL {
    (function ($: JQueryStatic, window: any, document: any) {

        class Collapser extends JQueryPluginBase {
            public static NAME: string = 'collapser';

            public static DEFAULTS: CollapserOptions = {
                'truncateLines': 3
            };

            public static SELECTOR: any = {
                CONTAINER:  '[data-collapser]'
            }

            private $textFull: JQuery;
            private $buttonCollapse: JQuery;
            private $buttonExpland: JQuery;
            private $textTrimmed: JQuery;
            private markupText: string[];
            private lineHeight: number;

            constructor(element: Element, options: any) {
                super(Collapser.NAME, element, Collapser.DEFAULTS, options);

                this.lineHeight = Math.floor(parseInt($('body').css("line-height").replace('px', '')));
                this.markupText = $.trim(this.$element.html()).replace("&nbsp;", " ").split(' ');
                this.$buttonCollapse = $('<a href="#" data-collapser-collapse class="text-nowrap"> - Minder</a>');
                this.$buttonExpland = $('<a href="#" data-collapser-expand class="text-nowrap"> + Meer</a>');
                this.$textFull = $('<div data-collapser-full-text> ' + $.trim(this.$element.html()).replace("&nbsp;", " ") + '</div>');
                this.$textTrimmed = $("<div data-collapser-trimmed-text></div>");
                this.processMarkup();

                if (this.$element.height() > (this.lineHeight * this.options.truncateLines) + 5) {
                    this.generateTrimmedText();
                }

                this.init();
            }

            init(): void { }

            collapse(): void {
                this.$textFull.hide(); 
                this.$textTrimmed.show();
                this.$buttonCollapse.hide();
                this.$buttonExpland.show();
            }

            expand(): void {
                this.$textFull.show();
                this.$textTrimmed.hide();
                this.$buttonCollapse.show();
                this.$buttonExpland.hide();
            }

            generateTrimmedText(): void {
                this.$element.html("");
                this.$element.append(this.$textTrimmed);
                this.$element.append(this.$textFull);

                var words = $.trim(this.$textFull.text()).split(' ');

                var tempText = words[0];

                this.$textTrimmed.html(tempText);

                this.countLines(words, tempText);
                this.collapse();

                this.$buttonExpland.on("click", (e) => {
                    e.preventDefault();
                    this.expand();
                });

                this.$buttonCollapse.on("click", (e) => {
                    e.preventDefault();
                    this.collapse();
                });
            }

            countLines(words, tempText): void {
                for (var i = 1; i < words.length; i++) {
                    this.$textTrimmed.html(this.$textTrimmed.html() + ' ' + words[i]);

                    if (this.$textTrimmed.height() > (this.lineHeight * this.options.truncateLines)) {
                        this.$textTrimmed.html(this.$textTrimmed.html().substring(0, this.$textTrimmed.html().lastIndexOf(" " + words[i])) + "...");

                        if (this.$textTrimmed.height() > (this.lineHeight * this.options.truncateLines)) {
                            this.$textTrimmed.html(this.markupText.slice(0, i - 1).join(" ") + "...");
                        }
                        else {
                            this.$textTrimmed.html(this.markupText.slice(0, i).join(" ") + "...");
                        }

                        this.$element.append(this.$buttonExpland);
                        this.$element.append(this.$buttonCollapse);
                        this.$buttonCollapse.hide();

                        break;
                    }
                    if (this.markupText[i].indexOf("</p>") !== -1) {
                        this.$textTrimmed.html(this.markupText.slice(0, i+1).join(" "));
                        this.$element.append(this.$buttonExpland);
                        this.$element.append(this.$buttonCollapse);
                        this.$buttonCollapse.hide();

                        break;
                    }
                }
            }

            processMarkup(): void {
                for (var x = 0; x < this.markupText.length; x++) {
                    if (this.markupText[x].indexOf("<") !== -1) {
                        for (var y = x; x < this.markupText.length; y++) {
                            if (this.markupText[y].indexOf(">") === -1) {
                                this.markupText[x] = this.markupText[x] + " " + this.markupText[y+1];
                            }
                            else {
                                this.markupText.splice(x + 1, y - x);
                                break;
                            }
                        }
                    }
                }
            }
        }

        $(document).ready(function (event) {
            $(Collapser.SELECTOR.CONTAINER)[Collapser.NAME]();
        });

        $.fn[Collapser.NAME] = function (options: any) {
            return this.each(function () {
                let $this = $(this);
                $this.data(Collapser.NAME, new Collapser(this, $this.data("collapser")));
            });
        };

    })(jQuery, window, document);
}