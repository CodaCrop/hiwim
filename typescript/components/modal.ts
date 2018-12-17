namespace TMNL {
    (function ($: JQueryStatic, window: any, document: any) {

        class Modal extends JQueryPluginBase {
            public static NAME: string = 'modal';
            public static DATA_KEY: string = 'tmnl.modal';

            public static TRANSITION_DURATION: number = 300
            public static BACKDROP_TRANSITION_DURATION: number = 150
            public static ESCAPE_KEYCODE: number = 27

            public static DEFAULTS: ModalOptions = {
                backdrop: true,
                keyboard: true,
                focus: true,
                show: true,
                closable: true,
                direction: "right"
            };

            public static CSS: any = {
                SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
                BACKDROP: 'modal-backdrop',
                OPEN: 'modal-open',
                FADE: 'fade',
                SHOW: 'show'
            }

            public static EVENT: any = {
                TOGGLE_CLICK: 'click.modal.toggle'
            };

            public static SELECTOR: any = {
                CONTAINER: '[data-modal]',
                DIALOG: '.modal-dialog',
                DATA_TOGGLE: '[data-modal-toggle]',
                DATA_DISMISS: '[data-modal-dismiss]',
                FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
                STICKY_CONTENT: '.sticky-top',
                NAVBAR_TOGGLER: '.navbar-toggler'
            }

            private $dialog: JQuery;
            private $backdrop: JQuery;
            private $origin: JQuery;
            private isShown: boolean;
            private isBodyOverflowing: boolean;
            private isTransitioning: boolean;
            private ignoreBackdropClick: boolean;
            private originalBodyPadding: number;
            private scrollbarWidth: number;

            constructor(element: Element, options: any) {
                super(Modal.NAME, element, Modal.DEFAULTS, options);                
                this.$dialog = $(element).find(Modal.SELECTOR.DIALOG);
                this.$backdrop = null;
                this.$origin = this.$element.parent();
                this.isShown = false;
                this.isBodyOverflowing = false;
                this.ignoreBackdropClick = false;
                this.originalBodyPadding = 0;
                this.scrollbarWidth = 0;

                this.init();
            }

            init(): void {
            }

            toggle(relatedTarget): void {
                this.isShown ? this.hide(null) : this.show(relatedTarget);
            }

            show(relatedTarget): void {
                if (this.isTransitioning || this.isShown) {
                    return;
                }

                if ($(this.$element).hasClass(Modal.CSS.FADE)) {
                    this.isTransitioning = true;
                }

                relatedTarget.show();

                if (this.isShown) {
                    return;
                }

                this.isShown = true;

                this.checkScrollbar();
                this.setScrollbar();

                this.adjustDialog();

                $(document.body).addClass(Modal.CSS.OPEN);

                this.setEscapeEvent();
                this.setResizeEvent();

                $(this.$element).on("click", Modal.SELECTOR.DATA_DISMISS, (event) => {                    
                    this.hide(event);
                });

                $(this.$dialog).on('mousedown', () => {
                    $(this.$element).one('mouseup', (event) => {                        
                        if ($(event.target).is(this.$element)) {
                            this.ignoreBackdropClick = true;
                        }
                    });
                });

                this.showBackdrop(this.showElement(relatedTarget));
            }

            hide(event): void {
                if(this.options.closable) {
                    if (event) {
                        event.preventDefault();
                    }

                    if (this.isTransitioning || !this.isShown) {
                        return;
                    }

                    const hideEvent = $.Event('hide.tmnl.modal');

                    $(this.$element).trigger(hideEvent);

                    if (!this.isShown) {
                        return;
                    }

                    this.isShown = false;

                    const transition = $(this.$element).hasClass(Modal.CSS.FADE);

                    if (transition) {
                        this.isTransitioning = true;
                    }

                    this.setEscapeEvent();
                    this.setResizeEvent();

                    $(document).off('focusIn');

                    $(this.$element).removeClass(Modal.CSS.SHOW);

                    this.$element.detach().appendTo(this.$origin);
                    
                    $(this.$element).off('click');
                    $(this.$dialog).off('mousedown');

                    this.hideModal();
                }
            }

            dispose(): void {
                //this.$element.removeData(DATA_KEY)

                //$(window, document, this.$element, this.$backdrop).off(EVENT_KEY)

                Modal.DEFAULTS = null;
                this.$element = null;
                this.$dialog = null;
                this.$backdrop = null;
                this.isShown = null;
                this.isBodyOverflowing = null;
                this.ignoreBackdropClick = null;
                this.scrollbarWidth = null;
            }

            handleUpdate(): void {
                this.adjustDialog();
            }

            // private

            showElement(relatedTarget): void {
                const transition = $(this.$element).hasClass(Modal.CSS.FADE);

                this.$element.detach().appendTo('body');

                this.$element.css('visibility', 'visible');
                this.$element.removeData('aria-hidden');
                this.$element.scrollTop(0);

                $(this.$element).addClass(Modal.CSS.SHOW);

                if (Modal.DEFAULTS.focus) {
                    this.enforceFocus();
                }

                const shownEvent = $.Event('shown.tmnl.modal', {
                    relatedTarget
                })

                const transitionComplete = () => {
                    if (Modal.DEFAULTS.focus) {
                        this.$element.focus();
                    }
                    this.isTransitioning = false;
                    $(this.$element).trigger(shownEvent);
                }

                if (transition) {
                    $(this.$dialog)
                        .one('transitionend', transitionComplete);
                } else {
                    transitionComplete();
                }
            }

            enforceFocus(): void {
                $(document)
                    .off('focusIn') // guard against infinite focus loop
                    .on('focusIn', (event) => {
                        if (document !== event.target &&
                            this.$element !== $(event.target) &&
                            !$(this.$element).has(event.target).length) {
                            this.$element.focus();
                        }
                    })
            }

            setEscapeEvent(): void {
                if (this.isShown && Modal.DEFAULTS.keyboard) {
                    $(this.$element).on('keydown', (event) => {
                        if (event.which === Modal.ESCAPE_KEYCODE) {
                            event.preventDefault()
                            this.hide(event);
                        }
                    })

                } else if (!this.isShown) {
                    $(this.$element).off('keydown');
                }
            }

            setResizeEvent(): void {
                if (this.isShown) {
                    $(window).on('resize', (event) => this.handleUpdate());
                } else {
                    $(window).off('resize');
                }
            }

            hideModal(): void {
                this.$element.css('visibility', 'hidden');
                this.$element.attr('aria-hidden', "true");
                this.isTransitioning = false;

                var callback = () => {
                    $(document.body).removeClass(Modal.CSS.OPEN)
                    this.resetAdjustments();
                    this.resetScrollbar();
                    $(this.$element).hide();
                }

                this.showBackdrop(callback);
            }

            removeBackdrop(): void {
                if (this.$backdrop) {
                    $(this.$backdrop).remove();
                    this.$backdrop = null;
                }
            }

            showBackdrop(callback): void {
                const animate = $(this.$element).hasClass(Modal.CSS.FADE) ?
                    Modal.CSS.FADE : '';

                if (this.isShown && this.options.backdrop) {
                    const doAnimate = animate;

                    this.$backdrop = document.createElement('div');
                    $(this.$backdrop).addClass(Modal.CSS.BACKDROP);

                    if (animate) {
                        $(this.$backdrop).addClass(animate);
                    }

                    $(this.$backdrop).appendTo(document.body);

                    $(this.$element).on('click', (event) => {
                        if (this.ignoreBackdropClick) {
                            this.ignoreBackdropClick = false;
                            return;
                        }
                        if (event.target !== event.currentTarget) {
                            return;
                        }

                        this.hide(event);

                    });

                    $(this.$backdrop).addClass(Modal.CSS.SHOW);

                    if (!callback) {
                        return;
                    }

                    if (!doAnimate) {
                        callback();
                        return;
                    }

                    $(this.$backdrop)
                        .one('transitionend', callback);

                } else if (!this.isShown && this.$backdrop) {
                    $(this.$backdrop).removeClass(Modal.CSS.SHOW);

                    const callbackRemove = () => {
                        this.removeBackdrop();
                        if (callback) {
                            callback();
                        }
                    }

                    if ($(this.$element).hasClass(Modal.CSS.FADE)) {
                        $(this.$backdrop)
                            .one('transitionend', callbackRemove);
                    } else {
                        callbackRemove();
                    }

                } else if (callback) {
                    callback();
                }
            }

            adjustDialog(): void {
                const isModalOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight;

                if (!this.isBodyOverflowing && isModalOverflowing) {
                    this.$element.css('padding-left', this.scrollbarWidth + 'px');
                }

                if (this.isBodyOverflowing && !isModalOverflowing) {
                    this.$element.css('padding-right', this.scrollbarWidth + 'px');
                }
            }

            resetAdjustments(): void {
                this.$element.css('padding-left', '');
                this.$element.css('padding-right', '');
            }

            checkScrollbar(): void {
                const rect = document.body.getBoundingClientRect();
                this.isBodyOverflowing = rect.left + rect.right < window.innerWidth;
                this.scrollbarWidth = this.getScrollbarWidth();
            }

            setScrollbar(): void {
                if (this.isBodyOverflowing) {
                    // // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
                    // //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set

                    // // Adjust fixed content padding
                    // $(Modal.SELECTOR.FIXED_CONTENT).each((index, element) => {
                    //     const actualPadding = $(element)[0].style.paddingRight;
                    //     const calculatedPadding = $(element).css('padding-right');
                    //     $(element).data('padding-right', actualPadding).css('padding-right', `${parseFloat(calculatedPadding) + this.scrollbarWidth}px`);
                    // })

                    // // Adjust sticky content margin
                    // $(Modal.SELECTOR.STICKY_CONTENT).each((index, element) => {
                    //     const actualMargin = $(element)[0].style.marginRight;
                    //     const calculatedMargin = $(element).css('margin-right');
                    //     $(element).data('margin-right', actualMargin).css('margin-right', `${parseFloat(calculatedMargin) - this.scrollbarWidth}px`);
                    // })

                    // // Adjust navbar-toggler margin
                    // $(Modal.SELECTOR.NAVBAR_TOGGLER).each((index, element) => {
                    //     const actualMargin = $(element)[0].style.marginRight;
                    //     const calculatedMargin = $(element).css('margin-right');
                    //     $(element).data('margin-right', actualMargin).css('margin-right', `${parseFloat(calculatedMargin) + this.scrollbarWidth}px`);
                    // })

                    // Adjust body padding
                    const actualPadding = document.body.style.paddingRight;
                    const calculatedPadding = $('body').css('padding-right');
                    $('body').data('padding-right', actualPadding).css('padding-right', `${parseFloat(calculatedPadding) + this.scrollbarWidth}px`);
                }
            }

            resetScrollbar(): void {
                // // Restore fixed content padding
                // $(Modal.SELECTOR.FIXED_CONTENT).each((index, element) => {
                //     const padding = $(element).data('padding-right');
                //     if (typeof padding !== 'undefined') {
                //         $(element).css('padding-right', padding).removeData('padding-right');
                //     }
                // });

                // // Restore sticky content and navbar-toggler margin
                // $(`${Modal.SELECTOR.STICKY_CONTENT}, ${Modal.SELECTOR.NAVBAR_TOGGLER}`).each((index, element) => {
                //     const margin = $(element).data('margin-right');
                //     if (typeof margin !== 'undefined') {
                //         $(element).css('margin-right', margin).removeData('margin-right');
                //     }
                // });

                // Restore body padding
                const padding = $('body').data('padding-right');
                if (typeof padding !== 'undefined') {
                    $('body').css('padding-right', padding).removeData('padding-right');
                }
            }

            getScrollbarWidth() { // thx d.walsh
                const scrollDiv = document.createElement('div');
                scrollDiv.className = Modal.CSS.SCROLLBAR_MEASURER;
                document.body.appendChild(scrollDiv);
                const scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
                document.body.removeChild(scrollDiv);
                return scrollbarWidth;
            }
        }

        
        function Plugin(config: string, parameters?: any) {
            return this.each(function () {
                const $this = $(this);
                let plugin = $this.data(Modal.DATA_KEY);

                if (!plugin) {
                    let options = $this.data(Modal.NAME);
                    plugin = new Modal(this, options);
                    $this.data(Modal.DATA_KEY, plugin);
                }

                if (typeof config === 'string') {
                    if (typeof plugin[config] === 'undefined') {
                        throw new Error(`No method named "${config}"`);
                    }
                    plugin[config](parameters);
                }
            });
        }

        $(document).on(Modal.EVENT.TOGGLE_CLICK, Modal.SELECTOR.DATA_TOGGLE, function (event) {                       
            const selector = $(this).attr('data-modal-toggle');
            let $target = $(selector);

            if (this.tagName === 'A' || this.tagName === 'AREA') {
                event.preventDefault();
            }

            Plugin.call($target, 'toggle', $target);
        });

        $.fn[Modal.NAME] = Plugin
        $.fn[Modal.NAME].Constructor = Modal
        
    })(jQuery, window, document);
}