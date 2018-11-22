namespace TMNL {
    (function ($: JQueryStatic, window: any, document: any) {

        class Autocomplete extends JQueryPluginBase {
            public static NAME: string = 'autocomplete';

            public static DEFAULTS: AutocompleteOptions = {
                placeholder: '',
                source: null,
                minChars: 3,
                delay: 150,
                cache: 1,
                menuClass: '',
                submitForm: true,
                renderCategory: function (item) {
                    return '<div class="' + Autocomplete.CSS.CATEGORY + '">' + item.category + '</div>';
                },
                renderItem: function (item, search) {
                    search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                    var regExp = new RegExp("(" + search.split(' ').join('|') + ")", "gi");
                    return '<div class="' + Autocomplete.CSS.SUGGESTION + '" data-val="' + item + '">' + item.replace(regExp, "<b>$1</b>") + '</div>';
                },
                onSelect: function (event, term, item) {
                }
            };

            public static CSS: any = {
                CONTAINER: 'autocomplete',
                SUGGESTION: 'autocomplete-suggestion',
                CATEGORY: 'autocomplete-suggestion-category',
            }

            public static SELECTOR: any = {}

            private $suggestionList: JQuery;
            private suggestionMaxHeight: number;
            private suggestionHeight: number;
            private cache: any = {};
            private lastValue: string = '';
            private timer: any;

            constructor(element: Element, options: any) {
                super(Autocomplete.NAME, element, Autocomplete.DEFAULTS, options);
                this.$element.attr('autocomplete', 'off');
                this.$suggestionList = $('<div class="' + Autocomplete.CSS.CONTAINER + ' ' + this.options.menuClass + '"></div>');
                this.$suggestionList.appendTo('body');
                this.init();
            }

            init(): void {
                // suggestion list binding                
                this.$suggestionList.on('mouseleave', '.' + Autocomplete.CSS.SUGGESTION, function () {
                    if ($('html').hasClass('no-touch')) {
                        $('.' + Autocomplete.CSS.SUGGESTION + '.selected').removeClass('selected');
                    }
                });

                this.$suggestionList.on('mouseenter', '.' + Autocomplete.CSS.SUGGESTION, function () {
                    if ($('html').hasClass('no-touch')) {
                        $('.' + Autocomplete.CSS.SUGGESTION + '.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }                    
                });

                this.$suggestionList.on('click', '.' + Autocomplete.CSS.SUGGESTION, (e) => {
                    var item = $(e.currentTarget), itemValue = item.data('val');
                    if (itemValue || item.hasClass(Autocomplete.CSS.SUGGESTION)) {
                        this.$element.val(itemValue);
                        this.options.onSelect(e, itemValue, item);
                        this.submitForm();
                        this.$suggestionList.hide();
                    }
                    return false;
                });

                // input binding
                this.$element.on('blur.autocomplete', (event) => {
                    var over_sb;
                    try {
                        over_sb = $('.' + Autocomplete.CSS.CONTAINER + ':hover').length;
                    } catch (e) {
                        over_sb = 0;
                    } // IE7 fix :hover
                    if (!over_sb) {
                        this.lastValue = (<HTMLInputElement>this.element).value;
                        this.$suggestionList.hide();
                        setTimeout(() => { this.$suggestionList.hide(); }, 350);
                    } else if (!this.$element.is(':focus')) {
                        setTimeout(() => { this.$element.focus(); }, 20);
                    }
                });

                this.$element.on('focus.autocomplete', (event) => {
                    if (this.options.placeholder.length > 0) {
                        this.$suggestionList.html(this.options.placeholder);
                        this.updateSuggestion();
                    }

                    if (!this.options.minChars) {
                        this.lastValue = '\n';
                        this.$element.trigger('keyup.autocomplete');
                    }
                });

                this.$element.on('keydown.autocomplete', (event) => {
                    if ((event.which == Util.KEY.DOWN || event.which == Util.KEY.UP) && this.$suggestionList.html()) {
                        var next, selection = $('.' + Autocomplete.CSS.SUGGESTION + '.selected', this.$suggestionList);
                        if (!selection.length) {
                            next = (event.which == Util.KEY.DOWN) ? $('.' + Autocomplete.CSS.SUGGESTION, this.$suggestionList).first() : $('.' + Autocomplete.CSS.SUGGESTION, this.$suggestionList).last();
                            this.$element.val(next.addClass('selected').data('val'));
                        } else {
                            next = (event.which == Util.KEY.DOWN) ? selection.nextAll('.' + Autocomplete.CSS.SUGGESTION).first() : selection.prevAll('.' + Autocomplete.CSS.SUGGESTION).first();
                            if (next.length) { selection.removeClass('selected'); this.$element.val(next.addClass('selected').data('val')); }
                            else { selection.removeClass('selected'); this.$element.val(this.lastValue); next = 0; }
                        }
                        this.updateSuggestion(0, next);
                        return false;
                    }
                    else if (event.which == Util.KEY.ESC) {
                        this.$element.val(this.lastValue);
                        this.$suggestionList.hide();
                    }
                    else if (event.which == Util.KEY.ENTER || event.which == Util.KEY.TAB) {
                        var selection = $('.' + Autocomplete.CSS.SUGGESTION + '.selected', this.$suggestionList);
                        if (selection.length && this.$suggestionList.is(':visible')) {
                            this.options.onSelect(event, selection.data('val'), selection);
                            this.submitForm();
                            setTimeout(() => { this.$suggestionList.hide(); }, 20);
                        }
                    }
                });

                this.$element.on('keyup.autocomplete', (event) => {
                    if (!~$.inArray(event.which, [Util.KEY.ENTER, Util.KEY.ESC, Util.KEY.END, Util.KEY.HOME, Util.KEY.LEFT, Util.KEY.UP, Util.KEY.RIGHT, Util.KEY.DOWN])) {
                        var value = (<HTMLInputElement>this.element).value;

                        if (value.length >= this.options.minChars) {
                            if (value != this.lastValue) {
                                this.lastValue = value;
                                clearTimeout(this.timer);

                                if (this.options.cache) {
                                    if (value in this.cache) {
                                        this.renderSuggestion(this.cache[value]);
                                        return;
                                    }

                                    for (var i = 1; i < value.length - this.options.minChars; i++) {
                                        var part = value.slice(0, value.length - i);
                                        if (part in this.cache && !this.cache[part].length) {
                                            this.renderSuggestion([]); return;
                                        }
                                    }
                                }

                                this.timer = setTimeout(() => {
                                    this.options.source(value, (data) => { this.renderSuggestion(data); });
                                }, this.options.delay)
                            }
                        } else {
                            this.lastValue = value;
                            if (this.options.placeholder.length > 0) {
                                this.$suggestionList.html(this.options.placeholder);
                                this.updateSuggestion();
                            } else {
                                this.$suggestionList.hide();
                            }
                        }
                    }
                })

                $(window).on('resize.autocomplete', () => {
                    if (this.$suggestionList.is(':visible')) {
                        this.updateSuggestion();
                    }
                });
            }

            renderSuggestion(data: any): void {
                var value = (<HTMLInputElement>this.element).value;

                this.cache[value] = data;

                if (data.length && value.length >= this.options.minChars) {
                    var html = '';
                    var lastCategory = '';

                    for (var i = 0; i < data.length; i++) {
                        if (data[i].category && data[i].category !== lastCategory) {
                            html += this.options.renderCategory(data[i]);
                            lastCategory = data[i].category;
                        }
                        html += this.options.renderItem(data[i].text || data[i], value);
                    }

                    this.$suggestionList.html(html);
                    this.updateSuggestion();
                } else {
                    this.$suggestionList.hide();
                }
            }

            submitForm(): void {
                if (this.options.submitForm) {
                    this.$element.closest('form').submit();
                }
            }

            updateSuggestion(resize?, next?): void {
                this.$suggestionList.css({
                    top: this.$element.offset().top + this.$element.outerHeight(),
                    left: this.$element.offset().left,
                    width: this.$element.outerWidth()
                });

                if (!resize) {
                    this.$suggestionList.show();

                    if (!this.suggestionMaxHeight) {
                        this.suggestionMaxHeight = parseInt(this.$suggestionList.css('max-height'));
                    }

                    if (!this.suggestionHeight) {
                        this.suggestionHeight = $('.' + Autocomplete.CSS.SUGGESTION, this.$suggestionList).first().outerHeight();
                    }

                    if (this.suggestionHeight) {
                        if (!next) {
                            this.$suggestionList.scrollTop(0);
                        } else {
                            var scrollTop = this.$suggestionList.scrollTop()
                            var offsetTop = next.offset().top - this.$suggestionList.offset().top;

                            if (offsetTop + this.suggestionHeight - this.suggestionMaxHeight > 0) {
                                this.$suggestionList.scrollTop(offsetTop + this.suggestionHeight + scrollTop - this.suggestionMaxHeight);
                            } else if (offsetTop < 0) {
                                this.$suggestionList.scrollTop(offsetTop + scrollTop);
                            }
                        }
                    }
                }
            }
        }

        $.fn[Autocomplete.NAME] = function (options: any) {
            return this.each(function () {
                let $this = $(this);
                if (!$this.data(Autocomplete.NAME)) {
                    $this.data(Autocomplete.NAME, new Autocomplete(this, options));
                }
            });
        };

    })(jQuery, window, document);
}