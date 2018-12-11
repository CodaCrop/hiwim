/// <reference path="../vendor/popper.js/packages/popper/index.d.ts" />
var TMNL;
(function (TMNL) {
    var JQueryPluginBase = /** @class */ (function () {
        function JQueryPluginBase(name, element, defaults, options) {
            this.element = element;
            this.$element = $(element);
            this.options = $.extend(true, {}, defaults, (typeof options !== 'undefined' && options !== null) ?
                TMNL.Util.parseAttrAsJson(options) :
                options);
        }
        return JQueryPluginBase;
    }());
    TMNL.JQueryPluginBase = JQueryPluginBase;
})(TMNL || (TMNL = {}));
var TMNL;
(function (TMNL) {
    var Analytics = /** @class */ (function () {
        function Analytics() {
        }
        Analytics.register = function (data) {
            if (typeof data === "object" && window["dataLayer"] !== undefined) {
                window["dataLayer"].push(data);
            }
        };
        return Analytics;
    }());
    TMNL.Analytics = Analytics;
})(TMNL || (TMNL = {}));
var TMNL;
(function (TMNL) {
    var Util = /** @class */ (function () {
        function Util() {
        }
        Util.hasTouch = function () {
            return ('ontouchstart' in window)
                || (navigator.maxTouchPoints > 0)
                || (navigator.msMaxTouchPoints > 0);
        };
        Util.parseAttrAsJson = function (options) {
            if ($.isPlainObject(options)) {
                return options;
            }
            if (options.indexOf('{') < 0) {
                return {};
            }
            else {
                return new Function("", "return JSON.parse(JSON.stringify(" + options + "))")();
            }
        };
        Util.KEY = {
            TAB: 9,
            ENTER: 13,
            ESC: 27,
            END: 35,
            HOME: 36,
            UP: 38,
            RIGHT: 39,
            LEFT: 37,
            DOWN: 40
        };
        return Util;
    }());
    TMNL.Util = Util;
})(TMNL || (TMNL = {}));
var TMNL;
(function (TMNL) {
    var Core = /** @class */ (function () {
        function Core() {
            this.$html = $('html');
            TMNL.Util.hasTouch() ? this.$html.addClass('touch') : this.$html.addClass('no-touch');
            // If this is a touch-enabled device we add extra
            // empty mouseover listeners to the body's immediate children;
            // only needed because of broken event delegation on iOS
            // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
            if ('ontouchstart' in document.documentElement) {
                $('body').children().on('mouseover', null, $.noop);
            }
            $(document).on('click', '[data-analytics-click]', function (event) {
                var data = $(this).data('analytics-click');
                TMNL.Analytics.register(data);
            });
            $(document).on('click', '[data-analytics-click-once]', function (event) {
                var data = $(this).data('analytics-click-once');
                TMNL.Analytics.register(data);
                $(this).removeAttr('data-analytics-click-once');
            });
            $(document).on('change', '[data-analytics-change]', function (event) {
                var data = $(this).find(':selected').data('analytics-change-value');
                TMNL.Analytics.register(data);
            });
        }
        return Core;
    }());
    new Core();
})(TMNL || (TMNL = {}));
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TMNL;
(function (TMNL) {
    (function ($, window, document) {
        var FormNumber = /** @class */ (function (_super) {
            __extends(FormNumber, _super);
            function FormNumber(element, options) {
                var _this = _super.call(this, FormNumber.NAME, element, FormNumber.DEFAULTS, options) || this;
                _this.$input = $(element).find('input');
                _this.init();
                return _this;
            }
            FormNumber.prototype.init = function () {
                if (typeof this.options.max === 'undefined' || this.options.max === null) {
                    throw new Error("No max configured for form number.");
                }
                if (typeof this.options.min === 'undefined' || this.options.min === null) {
                    throw new Error("No min configured for form number.");
                }
            };
            FormNumber.prototype.change = function (event) {
                if ($(event.target).is('[data-form-number-minus]')) {
                    if (this.$input.val() > this.options.min) {
                        this.$input.val(parseInt(this.$input.val().toString()) - 1);
                    }
                }
                if ($(event.target).is('[data-form-number-plus]')) {
                    if (this.$input.val() < this.options.max) {
                        this.$input.val(parseInt(this.$input.val().toString()) + 1);
                    }
                }
            };
            FormNumber.NAME = 'form-number';
            FormNumber.DATA_KEY = 'tmnl.form-number';
            FormNumber.EVENT = {
                FORM_NUMBER_CLICK: 'click.form-number'
            };
            FormNumber.SELECTOR = {
                CONTAINER: '[data-form-number]',
                BUTTON_PLUS: '[data-form-number-plus]',
                BUTTON_MINUS: '[data-form-number-minus]'
            };
            FormNumber.DEFAULTS = {
                max: null,
                min: null
            };
            return FormNumber;
        }(TMNL.JQueryPluginBase));
        function Plugin(config, parameters) {
            return this.each(function () {
                var $this = $(this);
                var plugin = $this.data(FormNumber.DATA_KEY);
                if (!plugin) {
                    var options = $this.data(FormNumber.NAME);
                    plugin = new FormNumber(this, options);
                    $this.data(FormNumber.DATA_KEY, plugin);
                }
                if (typeof config === 'string') {
                    if (typeof plugin[config] === 'undefined') {
                        throw new Error("No method named \"" + config + "\"");
                    }
                    plugin[config](parameters);
                }
            });
        }
        $(document).on(FormNumber.EVENT.FORM_NUMBER_CLICK, FormNumber.SELECTOR.CONTAINER, function (event) {
            event.preventDefault();
            Plugin.call($(this).closest(FormNumber.SELECTOR.CONTAINER), 'change', event);
        });
        $.fn[FormNumber.NAME] = Plugin;
        $.fn[FormNumber.NAME].Constructor = FormNumber;
    })(jQuery, window, document);
})(TMNL || (TMNL = {}));
var TMNL;
(function (TMNL) {
    (function ($, window, document) {
        var NavBar = /** @class */ (function (_super) {
            __extends(NavBar, _super);
            function NavBar(element, options) {
                var _this = _super.call(this, NavBar.NAME, element, NavBar.DEFAULTS, options) || this;
                _this.$body = $('body');
                _this.$html = $('html');
                _this.$menu = _this.$element.find(NavBar.SELECTOR.MENU);
                _this.$dropdown = _this.$element.find(NavBar.SELECTOR.DROPDOWN);
                _this.$cart = _this.$element.find(NavBar.SELECTOR.CART);
                _this.$cartDropdown = _this.$element.find(NavBar.SELECTOR.CART_DROPDOWN);
                _this.$user = _this.$element.find(NavBar.SELECTOR.USER);
                _this.$search = _this.$element.find(NavBar.SELECTOR.SEARCH);
                _this.$searchInput = _this.$element.find(NavBar.SELECTOR.SEARCH_INPUT);
                if (_this.$cart.length > 0 && _this.$cartDropdown.length > 0) {
                    _this.cartPopper = new Popper(_this.$cart[0], _this.$cartDropdown[0], {
                        placement: 'bottom'
                    });
                }
                _this.init();
                return _this;
            }
            NavBar.prototype.init = function () {
                var _this = this;
                if (this.options.sticky) {
                    this.$body.addClass(NavBar.CSS.NAVBAR_STICKY);
                }
                else {
                    this.$body.removeClass(NavBar.CSS.NAVBAR_STICKY);
                }
                if (!TMNL.CurrentBreakpoint.isMobile()) {
                    this.$dropdown.hover(function () {
                        _this.$body.addClass(NavBar.CSS.NAVBAR_FOCUS);
                    }, function () {
                        _this.$body.removeClass(NavBar.CSS.NAVBAR_FOCUS);
                    });
                }
                else {
                    this.$element.find(NavBar.SELECTOR.MENU_TOGGLE).prop("checked", false);
                }
                // menu
                this.$element.on('click', NavBar.SELECTOR.MENU_TOGGLE, function (event) {
                    var $target = $(event.target);
                    if ($target.is(':checked')) {
                        _this.showMenu();
                        $(window).on('resize.navbar.menu', function (event) {
                            _this.showMenu();
                        });
                    }
                    else {
                        _this.hideMenu();
                    }
                });
                this.$element.on('click', NavBar.SELECTOR.MENU_ITEM, function (event) {
                    var $target = $(event.target);
                    if ((TMNL.CurrentBreakpoint.isMobile() || TMNL.CurrentBreakpoint.isTablet()) && $target.next().length > 0) {
                        event.preventDefault();
                        event.stopPropagation();
                        $(".navbar-menu").addClass(NavBar.CSS.NAVBAR_MENU_DEEP);
                        $target.removeClass(NavBar.CSS.MENU_SUB_SLIDE_OUT).addClass(NavBar.CSS.MENU_SUB_SLIDE_IN);
                        $target.parents(NavBar.SELECTOR.MENU).removeClass(NavBar.CSS.MENU_SLIDE_IN).addClass(NavBar.CSS.MENU_SLIDE_OUT);
                        _this.calculateHeight();
                    }
                });
                this.$element.on('click', NavBar.SELECTOR.MENU_BACK, function (event) {
                    _this.$element.find(NavBar.SELECTOR.MENU_ITEM).removeClass(NavBar.CSS.MENU_SUB_SLIDE_IN).addClass(NavBar.CSS.MENU_SUB_SLIDE_OUT);
                    $(event.target).parents(NavBar.SELECTOR.MENU).removeClass(NavBar.CSS.MENU_SLIDE_OUT).addClass(NavBar.CSS.MENU_SLIDE_IN);
                    _this.calculateHeight();
                    $(".navbar-menu").removeClass(NavBar.CSS.NAVBAR_MENU_DEEP);
                });
                // cart
                this.$element.on('mouseenter', NavBar.SELECTOR.CART, function () {
                    if (!TMNL.CurrentBreakpoint.isMobile()) {
                        _this.cartPopper.update();
                        _this.$cartDropdown.addClass(NavBar.CSS.CART_OPEN);
                        _this.$user.removeClass(NavBar.CSS.USER_TOGGLE);
                    }
                });
                this.$element.on('mouseleave', NavBar.SELECTOR.CART, function () {
                    _this.$cartDropdown.removeClass(NavBar.CSS.CART_OPEN);
                });
                this.$element.on('tmnl.navbar.cart.update', function (event, html) {
                    var $prevSibling = _this.$cart.prev();
                    _this.$cartDropdown.remove();
                    _this.$cart.remove();
                    $(html).insertAfter($prevSibling);
                    _this.$cart = _this.$element.find(NavBar.SELECTOR.CART);
                    _this.$cartDropdown = _this.$element.find(NavBar.SELECTOR.CART_DROPDOWN);
                    _this.cartPopper.destroy();
                    _this.cartPopper = new Popper(_this.$cart[0], _this.$cartDropdown[0], {
                        placement: 'bottom'
                    });
                });
                // search
                this.$search.on('click', NavBar.SELECTOR.SEARCH_OPEN, function () {
                    _this.$search.addClass(NavBar.CSS.SEARCH_TOGGLE);
                    _this.$user.removeClass(NavBar.CSS.USER_TOGGLE);
                    _this.$cartDropdown.removeClass(NavBar.CSS.CART_OPEN);
                    _this.$searchInput.focus();
                    // This sets the cursor in the input at the end of the text:
                    var currentValue = _this.$searchInput.val();
                    _this.$searchInput.val(currentValue);
                });
                this.$search.on('click', NavBar.SELECTOR.SEARCH_CLOSE, function () {
                    _this.$search.removeClass(NavBar.CSS.SEARCH_TOGGLE);
                    _this.$searchInput.blur();
                });
                // user
                this.$user.on('mouseenter', function (event) {
                    _this.$user.addClass(NavBar.CSS.USER_TOGGLE);
                    _this.$cartDropdown.removeClass(NavBar.CSS.CART_OPEN);
                });
                this.$user.on('mouseleave', function (event) {
                    _this.$user.removeClass(NavBar.CSS.USER_TOGGLE);
                });
                this.$user.on('click', NavBar.SELECTOR.USER_TOGGLE + ':not([href])', function (event) {
                    _this.$user.toggleClass(NavBar.CSS.USER_TOGGLE);
                    event.preventDefault();
                    event.stopPropagation();
                });
                this.$user.on('click', NavBar.SELECTOR.USER_CLOSE, function (event) {
                    _this.$user.find(NavBar.SELECTOR.USER_TOGGLE).trigger('click');
                });
                // resize window 
                $(window).on('resize', function () {
                    if (TMNL.CurrentBreakpoint.isMobile()) {
                        _this.$cartDropdown.removeClass(NavBar.CSS.CART_OPEN);
                    }
                    if ((TMNL.CurrentBreakpoint.isDesktop() || TMNL.CurrentBreakpoint.isLargeDesktop()) && _this.$html.hasClass(NavBar.CSS.MENU_TOGGLED)) {
                        _this.hideMenu();
                    }
                });
            };
            NavBar.prototype.showMenu = function () {
                this.$body.css('marginTop', '');
                this.$menu.parent().css('height', '');
                var scrollY = window.scrollY;
                this.$body.css('marginTop', (scrollY * -1));
                this.$html.addClass(NavBar.CSS.MENU_TOGGLED);
                this.calculateHeight();
            };
            NavBar.prototype.hideMenu = function () {
                this.$body.css('marginTop', 0);
                this.$menu.parent().css('height', '');
                this.$html.removeClass(NavBar.CSS.MENU_TOGGLED);
                var scrollY = parseInt(this.$body.css('marginTop'), 10) * -1;
                window.scrollTo(0, scrollY);
                $(window).off('resize.navbar.menu');
                this.$element.find(NavBar.SELECTOR.MENU_TOGGLE).prop("checked", false);
                this.$element.find(NavBar.SELECTOR.MENU_ITEM).parents(NavBar.SELECTOR.MENU).removeClass(NavBar.CSS.MENU_SLIDE_OUT).addClass(NavBar.CSS.MENU_SLIDE_IN);
                $(".navbar-menu").removeClass(NavBar.CSS.NAVBAR_MENU_DEEP);
            };
            NavBar.prototype.calculateHeight = function () {
                var menuHeight = window.innerHeight - this.$element.height();
                this.$menu.parent().css('height', menuHeight);
                $(".navbar-menu-sub-container").each(function () {
                    if ($(this).height() > menuHeight) {
                        if ($(this).parent().prev().hasClass('navbar-menu-sub-slide-in')) {
                            $(this).parent().parent().parent().parent().css('overflow-y', 'auto');
                        }
                        else {
                            $(this).parent().parent().parent().parent().css('overflow-y', 'hidden');
                        }
                    }
                    else {
                    }
                });
            };
            NavBar.prototype.toggleUser = function (event) {
                this.$menu.parent().css('height', '');
                this.$user.toggleClass(NavBar.CSS.USER_TOGGLE);
            };
            NavBar.NAME = 'tmnl.navbar';
            NavBar.DEFAULTS = {
                sticky: true
            };
            NavBar.CSS = {
                CART_OPEN: 'navbar-cart-dropdown-open',
                NAVBAR_STICKY: 'has-navbar-sticky',
                NAVBAR_FOCUS: 'navbar-focus',
                NAVBAR_MENU_DEEP: 'navbar-menu-deep',
                MENU_TOGGLED: 'has-navbar-menu-toggled',
                MENU_SLIDE_OUT: 'navbar-menu-slide-out',
                MENU_SLIDE_IN: 'navbar-menu-slide-in',
                MENU_SUB_SLIDE_IN: 'navbar-menu-sub-slide-in',
                MENU_SUB_SLIDE_OUT: 'navbar-menu-sub-slide-out',
                USER_TOGGLE: 'navbar-user-dropdown-open',
                SEARCH_TOGGLE: 'navbar-search-show'
            };
            NavBar.SELECTOR = {
                ELEMENT: '[data-navbar]',
                MENU: '[data-navbar-menu]',
                MENU_TOGGLE: '[data-navbar-menu-toggle]',
                MENU_ITEM: '[data-navbar-menu-item]',
                MENU_BACK: '[data-navbar-menu-back]',
                DROPDOWN: '[data-navbar-menu-dropdown]',
                CART: '[data-navbar-cart]',
                CART_OPEN: '[data-navbar-cart-open]',
                CART_DROPDOWN: '[data-navbar-cart-dropdown]',
                USER: '[data-navbar-user]',
                USER_TOGGLE: '[data-navbar-user-toggle]',
                USER_CLOSE: '[data-navbar-user-close]',
                SEARCH: '[data-navbar-search]',
                SEARCH_CLOSE: '[data-navbar-search-close]',
                SEARCH_OPEN: '[data-navbar-search-open]',
                SEARCH_INPUT: '[data-navbar-search-input]'
            };
            return NavBar;
        }(TMNL.JQueryPluginBase));
        $(document).ready(function (event) {
            $(NavBar.SELECTOR.ELEMENT)[NavBar.NAME]();
        });
        $.fn[NavBar.NAME] = function (options) {
            return this.each(function () {
                var $this = $(this);
                if (!$this.data(NavBar.NAME)) {
                    $this.data(NavBar.NAME, new NavBar(this, options || $this.data('navbar')));
                }
            });
        };
    })(jQuery, window, document);
})(TMNL || (TMNL = {}));
var TMNL;
(function (TMNL) {
    (function ($, window, document) {
        var SubNav = /** @class */ (function (_super) {
            __extends(SubNav, _super);
            function SubNav(element, options) {
                var _this = _super.call(this, SubNav.NAME, element, SubNav.DEFAULTS, options) || this;
                _this.currentPosition = 0;
                _this.$items = _this.$element.find(SubNav.SELECTOR.SCROLL_CONTAINER);
                _this.$back = _this.$element.find(SubNav.SELECTOR.BACK);
                _this.$next = _this.$element.find(SubNav.SELECTOR.NEXT);
                _this.init();
                return _this;
            }
            SubNav.prototype.init = function () {
                var _this = this;
                $(window).resize(function (event) { _this.scroll(event); });
                this.$back.on('click', function (event) { _this.back(event); });
                this.$next.on('click', function (event) { _this.next(event); });
                this.$items.on('scroll', function (event) { _this.scroll(event); });
                this.$items.trigger('scroll');
                this.scrollToActiveItem();
            };
            SubNav.prototype.back = function (event) {
                this.$items.animate({
                    scrollLeft: '-=100'
                });
            };
            SubNav.prototype.next = function (event) {
                this.$items.animate({
                    scrollLeft: '+=100'
                });
            };
            SubNav.prototype.scroll = function (event) {
                var itemsWidth = this.$items.innerWidth();
                var itemsMaxScrollWidth = this.$items[0].scrollWidth;
                var currentScrollPosition = this.$items.scrollLeft();
                if ((currentScrollPosition + itemsWidth) >= (itemsMaxScrollWidth - this.options.scrollThreshold)) {
                    this.$element.addClass(SubNav.CSS.SCROLL_MAX);
                }
                else {
                    this.$element.removeClass(SubNav.CSS.SCROLL_MAX);
                }
                if (currentScrollPosition <= (0 + this.options.scrollThreshold)) {
                    this.$element.addClass(SubNav.CSS.SCROLL_MIN);
                }
                else {
                    this.$element.removeClass(SubNav.CSS.SCROLL_MIN);
                }
            };
            SubNav.prototype.scrollToActiveItem = function () {
                var activeItem = this.$items.find(SubNav.SELECTOR.ACTIVE_ITEM);
                if (activeItem.length > 0) {
                    this.$items.animate({
                        scrollLeft: (activeItem.offset().left - (activeItem.width() / 2))
                    });
                }
            };
            SubNav.NAME = 'subnav';
            SubNav.DEFAULTS = {
                scrollThreshold: 25
            };
            SubNav.CSS = {
                SCROLL_MIN: 'is-scrolled-min',
                SCROLL_MAX: 'is-scrolled-max'
            };
            SubNav.SELECTOR = {
                ACTIVE_ITEM: '.is-active',
                ELEMENT: '[data-subnav]',
                SCROLL_CONTAINER: '[data-subnav-items]',
                BACK: '[data-subnav-back]',
                NEXT: '[data-subnav-next]'
            };
            return SubNav;
        }(TMNL.JQueryPluginBase));
        $(document).ready(function (event) {
            $(SubNav.SELECTOR.ELEMENT)[SubNav.NAME]();
        });
        $.fn[SubNav.NAME] = function (options) {
            return this.each(function () {
                var $this = $(this);
                if (!$this.data(SubNav.NAME)) {
                    $this.data(SubNav.NAME, new SubNav(this, options));
                }
            });
        };
    })(jQuery, window, document);
})(TMNL || (TMNL = {}));
var TMNL;
(function (TMNL) {
    (function ($, window, document) {
        var Accordion = /** @class */ (function (_super) {
            __extends(Accordion, _super);
            function Accordion(element) {
                var _this = _super.call(this, Accordion.NAME, element) || this;
                _this.$body = $('body');
                _this.init();
                return _this;
            }
            Accordion.prototype.init = function () {
                var _this = this;
                this.$element.on('click', [Accordion.SELECTOR.TOGGLE, Accordion.SELECTOR.TRIGGER_TOGGLE].join(','), function (event) {
                    var $panel = $(event.target).parents(Accordion.SELECTOR.PANEL);
                    _this.toggle($panel);
                });
            };
            Accordion.prototype.toggle = function ($panel) {
                var $toggle = $panel.find(Accordion.SELECTOR.TOGGLE);
                var $content = $panel.find(Accordion.SELECTOR.PANEL_CONTENT);
                if ($toggle.is(Accordion.SELECTOR.TOGGLE_HIDE) && $content.is(':visible')) {
                    $content.stop(true, false).animate({
                        opacity: 'toggle',
                        height: 'toggle'
                    }, function () {
                        $panel.toggleClass(Accordion.CSS.CONTENT_TOGGLE);
                    });
                    return;
                }
                $panel.toggleClass(Accordion.CSS.CONTENT_TOGGLE);
                $content.stop(true, false).animate({
                    opacity: 'toggle',
                    height: 'toggle'
                });
            };
            Accordion.NAME = 'accordion';
            Accordion.DATA_KEY = 'tmnl.accordion';
            Accordion.CSS = {
                CONTENT_TOGGLE: 'accordion-panel-open'
            };
            Accordion.SELECTOR = {
                CONTAINER: '[data-accordion]',
                TOGGLE: '[data-accordion-toggle]',
                TOGGLE_HIDE: '[data-accordion-toggle-hide]',
                TRIGGER_TOGGLE: '[data-accordion-trigger="toggle"]',
                PANEL: '[data-accordion-panel]',
                PANEL_CONTENT: '[data-accordion-panel-content]'
            };
            return Accordion;
        }(TMNL.JQueryPluginBase));
        $(document).ready(function (event) {
            $(Accordion.SELECTOR.CONTAINER)[Accordion.NAME]();
        });
        $.fn[Accordion.NAME] = function (options) {
            return this.each(function () {
                var $this = $(this);
                var plugin = $this.data(Accordion.DATA_KEY);
                if (!plugin) {
                    $this.data(Accordion.DATA_KEY, new Accordion(this));
                }
            });
        };
    })(jQuery, window, document);
})(TMNL || (TMNL = {}));
var TMNL;
(function (TMNL) {
    (function ($, window, document) {
        var Autocomplete = /** @class */ (function (_super) {
            __extends(Autocomplete, _super);
            function Autocomplete(element, options) {
                var _this = _super.call(this, Autocomplete.NAME, element, Autocomplete.DEFAULTS, options) || this;
                _this.cache = {};
                _this.lastValue = '';
                _this.$element.attr('autocomplete', 'off');
                _this.$suggestionList = $('<div class="' + Autocomplete.CSS.CONTAINER + ' ' + _this.options.menuClass + '"></div>');
                _this.$suggestionList.appendTo('body');
                _this.init();
                return _this;
            }
            Autocomplete.prototype.init = function () {
                var _this = this;
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
                this.$suggestionList.on('click', '.' + Autocomplete.CSS.SUGGESTION, function (e) {
                    var item = $(e.currentTarget), itemValue = item.data('val');
                    if (itemValue || item.hasClass(Autocomplete.CSS.SUGGESTION)) {
                        _this.$element.val(itemValue);
                        _this.options.onSelect(e, itemValue, item);
                        _this.submitForm();
                        _this.$suggestionList.hide();
                    }
                    return false;
                });
                // input binding
                this.$element.on('blur.autocomplete', function (event) {
                    var over_sb;
                    try {
                        over_sb = $('.' + Autocomplete.CSS.CONTAINER + ':hover').length;
                    }
                    catch (e) {
                        over_sb = 0;
                    } // IE7 fix :hover
                    if (!over_sb) {
                        _this.lastValue = _this.element.value;
                        _this.$suggestionList.hide();
                        setTimeout(function () { _this.$suggestionList.hide(); }, 350);
                    }
                    else if (!_this.$element.is(':focus')) {
                        setTimeout(function () { _this.$element.focus(); }, 20);
                    }
                });
                this.$element.on('focus.autocomplete', function (event) {
                    if (_this.options.placeholder.length > 0) {
                        _this.$suggestionList.html(_this.options.placeholder);
                        _this.updateSuggestion();
                    }
                    if (!_this.options.minChars) {
                        _this.lastValue = '\n';
                        _this.$element.trigger('keyup.autocomplete');
                    }
                });
                this.$element.on('keydown.autocomplete', function (event) {
                    if ((event.which == TMNL.Util.KEY.DOWN || event.which == TMNL.Util.KEY.UP) && _this.$suggestionList.html()) {
                        var next, selection = $('.' + Autocomplete.CSS.SUGGESTION + '.selected', _this.$suggestionList);
                        if (!selection.length) {
                            next = (event.which == TMNL.Util.KEY.DOWN) ? $('.' + Autocomplete.CSS.SUGGESTION, _this.$suggestionList).first() : $('.' + Autocomplete.CSS.SUGGESTION, _this.$suggestionList).last();
                            _this.$element.val(next.addClass('selected').data('val'));
                        }
                        else {
                            next = (event.which == TMNL.Util.KEY.DOWN) ? selection.nextAll('.' + Autocomplete.CSS.SUGGESTION).first() : selection.prevAll('.' + Autocomplete.CSS.SUGGESTION).first();
                            if (next.length) {
                                selection.removeClass('selected');
                                _this.$element.val(next.addClass('selected').data('val'));
                            }
                            else {
                                selection.removeClass('selected');
                                _this.$element.val(_this.lastValue);
                                next = 0;
                            }
                        }
                        _this.updateSuggestion(0, next);
                        return false;
                    }
                    else if (event.which == TMNL.Util.KEY.ESC) {
                        _this.$element.val(_this.lastValue);
                        _this.$suggestionList.hide();
                    }
                    else if (event.which == TMNL.Util.KEY.ENTER || event.which == TMNL.Util.KEY.TAB) {
                        var selection = $('.' + Autocomplete.CSS.SUGGESTION + '.selected', _this.$suggestionList);
                        if (selection.length && _this.$suggestionList.is(':visible')) {
                            _this.options.onSelect(event, selection.data('val'), selection);
                            _this.submitForm();
                            setTimeout(function () { _this.$suggestionList.hide(); }, 20);
                        }
                    }
                });
                this.$element.on('keyup.autocomplete', function (event) {
                    if (!~$.inArray(event.which, [TMNL.Util.KEY.ENTER, TMNL.Util.KEY.ESC, TMNL.Util.KEY.END, TMNL.Util.KEY.HOME, TMNL.Util.KEY.LEFT, TMNL.Util.KEY.UP, TMNL.Util.KEY.RIGHT, TMNL.Util.KEY.DOWN])) {
                        var value = _this.element.value;
                        if (value.length >= _this.options.minChars) {
                            if (value != _this.lastValue) {
                                _this.lastValue = value;
                                clearTimeout(_this.timer);
                                if (_this.options.cache) {
                                    if (value in _this.cache) {
                                        _this.renderSuggestion(_this.cache[value]);
                                        return;
                                    }
                                    for (var i = 1; i < value.length - _this.options.minChars; i++) {
                                        var part = value.slice(0, value.length - i);
                                        if (part in _this.cache && !_this.cache[part].length) {
                                            _this.renderSuggestion([]);
                                            return;
                                        }
                                    }
                                }
                                _this.timer = setTimeout(function () {
                                    _this.options.source(value, function (data) { _this.renderSuggestion(data); });
                                }, _this.options.delay);
                            }
                        }
                        else {
                            _this.lastValue = value;
                            if (_this.options.placeholder.length > 0) {
                                _this.$suggestionList.html(_this.options.placeholder);
                                _this.updateSuggestion();
                            }
                            else {
                                _this.$suggestionList.hide();
                            }
                        }
                    }
                });
                $(window).on('resize.autocomplete', function () {
                    if (_this.$suggestionList.is(':visible')) {
                        _this.updateSuggestion();
                    }
                });
            };
            Autocomplete.prototype.renderSuggestion = function (data) {
                var value = this.element.value;
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
                }
                else {
                    this.$suggestionList.hide();
                }
            };
            Autocomplete.prototype.submitForm = function () {
                if (this.options.submitForm) {
                    this.$element.closest('form').submit();
                }
            };
            Autocomplete.prototype.updateSuggestion = function (resize, next) {
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
                        }
                        else {
                            var scrollTop = this.$suggestionList.scrollTop();
                            var offsetTop = next.offset().top - this.$suggestionList.offset().top;
                            if (offsetTop + this.suggestionHeight - this.suggestionMaxHeight > 0) {
                                this.$suggestionList.scrollTop(offsetTop + this.suggestionHeight + scrollTop - this.suggestionMaxHeight);
                            }
                            else if (offsetTop < 0) {
                                this.$suggestionList.scrollTop(offsetTop + scrollTop);
                            }
                        }
                    }
                }
            };
            Autocomplete.NAME = 'autocomplete';
            Autocomplete.DEFAULTS = {
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
            Autocomplete.CSS = {
                CONTAINER: 'autocomplete',
                SUGGESTION: 'autocomplete-suggestion',
                CATEGORY: 'autocomplete-suggestion-category',
            };
            Autocomplete.SELECTOR = {};
            return Autocomplete;
        }(TMNL.JQueryPluginBase));
        $.fn[Autocomplete.NAME] = function (options) {
            return this.each(function () {
                var $this = $(this);
                if (!$this.data(Autocomplete.NAME)) {
                    $this.data(Autocomplete.NAME, new Autocomplete(this, options));
                }
            });
        };
    })(jQuery, window, document);
})(TMNL || (TMNL = {}));
var TMNL;
(function (TMNL) {
    (function ($, window, document) {
        var Carousel = /** @class */ (function (_super) {
            __extends(Carousel, _super);
            function Carousel(element, options) {
                var _this = _super.call(this, Carousel.NAME, element, Carousel.DEFAULTS, options) || this;
                _this.$carouselItem = $(_this.$element.find(Carousel.SELECTOR.CAROUSEL_ITEM));
                _this.$hightlightedSlide = $('.is-active').closest(Carousel.SELECTOR.CAROUSEL_ITEM);
                _this.carouselDots = {
                    "desktop": _this.$carouselItem.length > _this.options.slidesToShow.desktop,
                    "tablet": _this.$carouselItem.length > _this.options.slidesToShow.tablet,
                    "mobile": true
                };
                _this.initialSlideIndex = {
                    "desktop": 0,
                    "tablet": 0,
                    "mobile": 0
                };
                _this.init();
                return _this;
            }
            Carousel.prototype.init = function () {
                this.createCarousel();
            };
            Carousel.prototype.createCarousel = function () {
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
            };
            Carousel.NAME = 'carousel';
            Carousel.DEFAULTS = {
                arrows: false,
                slidesToShow: {
                    "mobile": 1,
                    "tablet": 2,
                    "desktop": 5
                }
            };
            Carousel.DATA_KEY = 'tmnl.carousel';
            Carousel.SELECTOR = {
                CONTAINER: '[data-carousel]',
                CAROUSEL_ITEM: '[data-carousel-item]'
            };
            return Carousel;
        }(TMNL.JQueryPluginBase));
        $(document).ready(function (event) {
            $(Carousel.SELECTOR.CONTAINER)[Carousel.NAME]();
        });
        $.fn[Carousel.NAME] = function (options) {
            return this.each(function () {
                var $this = $(this);
                $this.data(Carousel.NAME, new Carousel(this, $this.data("carousel")));
            });
        };
    })(jQuery, window, document);
})(TMNL || (TMNL = {}));
var TMNL;
(function (TMNL) {
    (function ($, window, document) {
        var Collapser = /** @class */ (function (_super) {
            __extends(Collapser, _super);
            function Collapser(element, options) {
                var _this = _super.call(this, Collapser.NAME, element, Collapser.DEFAULTS, options) || this;
                _this.lineHeight = Math.floor(parseInt($('body').css("line-height").replace('px', '')));
                _this.markupText = $.trim(_this.$element.html()).replace("&nbsp;", " ").split(' ');
                _this.$buttonCollapse = $('<a href="#" data-collapser-collapse class="text-nowrap"> - Minder</a>');
                _this.$buttonExpland = $('<a href="#" data-collapser-expand class="text-nowrap"> + Meer</a>');
                _this.$textFull = $('<div data-collapser-full-text> ' + $.trim(_this.$element.html()).replace("&nbsp;", " ") + '</div>');
                _this.$textTrimmed = $("<div data-collapser-trimmed-text></div>");
                _this.processMarkup();
                if (_this.$element.height() > (_this.lineHeight * _this.options.truncateLines) + 5) {
                    _this.generateTrimmedText();
                }
                _this.init();
                return _this;
            }
            Collapser.prototype.init = function () { };
            Collapser.prototype.collapse = function () {
                this.$textFull.hide();
                this.$textTrimmed.show();
                this.$buttonCollapse.hide();
                this.$buttonExpland.show();
            };
            Collapser.prototype.expand = function () {
                this.$textFull.show();
                this.$textTrimmed.hide();
                this.$buttonCollapse.show();
                this.$buttonExpland.hide();
            };
            Collapser.prototype.generateTrimmedText = function () {
                var _this = this;
                this.$element.html("");
                this.$element.append(this.$textTrimmed);
                this.$element.append(this.$textFull);
                var words = $.trim(this.$textFull.text()).split(' ');
                var tempText = words[0];
                this.$textTrimmed.html(tempText);
                this.countLines(words, tempText);
                this.collapse();
                this.$buttonExpland.on("click", function (e) {
                    e.preventDefault();
                    _this.expand();
                });
                this.$buttonCollapse.on("click", function (e) {
                    e.preventDefault();
                    _this.collapse();
                });
            };
            Collapser.prototype.countLines = function (words, tempText) {
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
                        this.$textTrimmed.html(this.markupText.slice(0, i + 1).join(" "));
                        this.$element.append(this.$buttonExpland);
                        this.$element.append(this.$buttonCollapse);
                        this.$buttonCollapse.hide();
                        break;
                    }
                }
            };
            Collapser.prototype.processMarkup = function () {
                for (var x = 0; x < this.markupText.length; x++) {
                    if (this.markupText[x].indexOf("<") !== -1) {
                        for (var y = x; x < this.markupText.length; y++) {
                            if (this.markupText[y].indexOf(">") === -1) {
                                this.markupText[x] = this.markupText[x] + " " + this.markupText[y + 1];
                            }
                            else {
                                this.markupText.splice(x + 1, y - x);
                                break;
                            }
                        }
                    }
                }
            };
            Collapser.NAME = 'collapser';
            Collapser.DEFAULTS = {
                'truncateLines': 3
            };
            Collapser.SELECTOR = {
                CONTAINER: '[data-collapser]'
            };
            return Collapser;
        }(TMNL.JQueryPluginBase));
        $(document).ready(function (event) {
            $(Collapser.SELECTOR.CONTAINER)[Collapser.NAME]();
        });
        $.fn[Collapser.NAME] = function (options) {
            return this.each(function () {
                var $this = $(this);
                $this.data(Collapser.NAME, new Collapser(this, $this.data("collapser")));
            });
        };
    })(jQuery, window, document);
})(TMNL || (TMNL = {}));
var TMNL;
(function (TMNL) {
    (function ($, window, document) {
        var GalleryImages = /** @class */ (function (_super) {
            __extends(GalleryImages, _super);
            function GalleryImages(element) {
                var _this = _super.call(this, GalleryImages.NAME, element) || this;
                _this.$container = _this.$element;
                _this.$image = _this.$element.find(GalleryImages.SELECTOR.IMAGE);
                _this.$thumbnails = _this.$container.find(GalleryImages.SELECTOR.THUMBNAIL);
                _this.init();
                return _this;
            }
            GalleryImages.prototype.init = function () {
                var _this = this;
                this.$thumbnails.on('click', function (e) {
                    var element = $(e.target).closest(GalleryImages.SELECTOR.THUMBNAIL);
                    var url = element.children('img').attr('src');
                    _this.$image.attr('src', url);
                    _this.$thumbnails.removeClass(GalleryImages.CSS.THUMBNAIL_ACTIVE);
                    element.addClass(GalleryImages.CSS.THUMBNAIL_ACTIVE);
                });
            };
            GalleryImages.NAME = 'gallery-images';
            GalleryImages.CSS = {
                THUMBNAIL_ACTIVE: 'is-active'
            };
            GalleryImages.SELECTOR = {
                CONTAINER: '[data-gallery-images]',
                IMAGE: '[data-gallery-image]',
                THUMBNAILS: '[data-gallery-thumbnails]',
                THUMBNAIL: '[data-gallery-images-thumbnail]'
            };
            return GalleryImages;
        }(TMNL.JQueryPluginBase));
        $(document).ready(function (event) {
            $(GalleryImages.SELECTOR.CONTAINER)[GalleryImages.NAME]();
        });
        $.fn[GalleryImages.NAME] = function (options) {
            return this.each(function () {
                var $this = $(this);
                if (!$this.data(GalleryImages.NAME)) {
                    $this.data(GalleryImages.NAME, new GalleryImages(this));
                }
            });
        };
    })(jQuery, window, document);
})(TMNL || (TMNL = {}));
var TMNL;
(function (TMNL) {
    (function ($, window, document) {
        var Modal = /** @class */ (function (_super) {
            __extends(Modal, _super);
            function Modal(element, options) {
                var _this = _super.call(this, Modal.NAME, element, Modal.DEFAULTS, options) || this;
                _this.$dialog = $(element).find(Modal.SELECTOR.DIALOG);
                _this.$backdrop = null;
                _this.$origin = _this.$element.parent();
                _this.isShown = false;
                _this.isBodyOverflowing = false;
                _this.ignoreBackdropClick = false;
                _this.originalBodyPadding = 0;
                _this.scrollbarWidth = 0;
                _this.init();
                return _this;
            }
            Modal.prototype.init = function () {
            };
            Modal.prototype.toggle = function (relatedTarget) {
                this.isShown ? this.hide(null) : this.show(relatedTarget);
            };
            Modal.prototype.show = function (relatedTarget) {
                var _this = this;
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
                $(this.$element).on("click", Modal.SELECTOR.DATA_DISMISS, function (event) {
                    _this.hide(event);
                });
                $(this.$dialog).on('mousedown', function () {
                    $(_this.$element).one('mouseup', function (event) {
                        if ($(event.target).is(_this.$element)) {
                            _this.ignoreBackdropClick = true;
                        }
                    });
                });
                this.showBackdrop(this.showElement(relatedTarget));
            };
            Modal.prototype.hide = function (event) {
                if (this.options.closable) {
                    if (event) {
                        event.preventDefault();
                    }
                    if (this.isTransitioning || !this.isShown) {
                        return;
                    }
                    var hideEvent = $.Event('hide.tmnl.modal');
                    $(this.$element).trigger(hideEvent);
                    if (!this.isShown) {
                        return;
                    }
                    this.isShown = false;
                    var transition = $(this.$element).hasClass(Modal.CSS.FADE);
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
            };
            Modal.prototype.dispose = function () {
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
            };
            Modal.prototype.handleUpdate = function () {
                this.adjustDialog();
            };
            // private
            Modal.prototype.showElement = function (relatedTarget) {
                var _this = this;
                var transition = $(this.$element).hasClass(Modal.CSS.FADE);
                this.$element.detach().appendTo('body');
                this.$element.css('visibility', 'visible');
                this.$element.removeData('aria-hidden');
                this.$element.scrollTop(0);
                $(this.$element).addClass(Modal.CSS.SHOW);
                if (Modal.DEFAULTS.focus) {
                    this.enforceFocus();
                }
                var shownEvent = $.Event('shown.tmnl.modal', {
                    relatedTarget: relatedTarget
                });
                var transitionComplete = function () {
                    if (Modal.DEFAULTS.focus) {
                        _this.$element.focus();
                    }
                    _this.isTransitioning = false;
                    $(_this.$element).trigger(shownEvent);
                };
                if (transition) {
                    $(this.$dialog)
                        .one('transitionend', transitionComplete);
                }
                else {
                    transitionComplete();
                }
            };
            Modal.prototype.enforceFocus = function () {
                var _this = this;
                $(document)
                    .off('focusIn') // guard against infinite focus loop
                    .on('focusIn', function (event) {
                    if (document !== event.target &&
                        _this.$element !== $(event.target) &&
                        !$(_this.$element).has(event.target).length) {
                        _this.$element.focus();
                    }
                });
            };
            Modal.prototype.setEscapeEvent = function () {
                var _this = this;
                if (this.isShown && Modal.DEFAULTS.keyboard) {
                    $(this.$element).on('keydown', function (event) {
                        if (event.which === Modal.ESCAPE_KEYCODE) {
                            event.preventDefault();
                            _this.hide(event);
                        }
                    });
                }
                else if (!this.isShown) {
                    $(this.$element).off('keydown');
                }
            };
            Modal.prototype.setResizeEvent = function () {
                var _this = this;
                if (this.isShown) {
                    $(window).on('resize', function (event) { return _this.handleUpdate(); });
                }
                else {
                    $(window).off('resize');
                }
            };
            Modal.prototype.hideModal = function () {
                var _this = this;
                this.$element.css('visibility', 'hidden');
                this.$element.attr('aria-hidden', "true");
                this.isTransitioning = false;
                var callback = function () {
                    $(document.body).removeClass(Modal.CSS.OPEN);
                    _this.resetAdjustments();
                    _this.resetScrollbar();
                    $(_this.$element).hide();
                };
                this.showBackdrop(callback);
            };
            Modal.prototype.removeBackdrop = function () {
                if (this.$backdrop) {
                    $(this.$backdrop).remove();
                    this.$backdrop = null;
                }
            };
            Modal.prototype.showBackdrop = function (callback) {
                var _this = this;
                var animate = $(this.$element).hasClass(Modal.CSS.FADE) ?
                    Modal.CSS.FADE : '';
                if (this.isShown && this.options.backdrop) {
                    var doAnimate = animate;
                    this.$backdrop = document.createElement('div');
                    $(this.$backdrop).addClass(Modal.CSS.BACKDROP);
                    if (animate) {
                        $(this.$backdrop).addClass(animate);
                    }
                    $(this.$backdrop).appendTo(document.body);
                    $(this.$element).on('click', function (event) {
                        if (_this.ignoreBackdropClick) {
                            _this.ignoreBackdropClick = false;
                            return;
                        }
                        if (event.target !== event.currentTarget) {
                            return;
                        }
                        _this.hide(event);
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
                }
                else if (!this.isShown && this.$backdrop) {
                    $(this.$backdrop).removeClass(Modal.CSS.SHOW);
                    var callbackRemove = function () {
                        _this.removeBackdrop();
                        if (callback) {
                            callback();
                        }
                    };
                    if ($(this.$element).hasClass(Modal.CSS.FADE)) {
                        $(this.$backdrop)
                            .one('transitionend', callbackRemove);
                    }
                    else {
                        callbackRemove();
                    }
                }
                else if (callback) {
                    callback();
                }
            };
            Modal.prototype.adjustDialog = function () {
                var isModalOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight;
                if (!this.isBodyOverflowing && isModalOverflowing) {
                    this.$element.css('padding-left', this.scrollbarWidth + 'px');
                }
                if (this.isBodyOverflowing && !isModalOverflowing) {
                    this.$element.css('padding-right', this.scrollbarWidth + 'px');
                }
            };
            Modal.prototype.resetAdjustments = function () {
                this.$element.css('padding-left', '');
                this.$element.css('padding-right', '');
            };
            Modal.prototype.checkScrollbar = function () {
                var rect = document.body.getBoundingClientRect();
                this.isBodyOverflowing = rect.left + rect.right < window.innerWidth;
                this.scrollbarWidth = this.getScrollbarWidth();
            };
            Modal.prototype.setScrollbar = function () {
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
                    var actualPadding = document.body.style.paddingRight;
                    var calculatedPadding = $('body').css('padding-right');
                    $('body').data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this.scrollbarWidth + "px");
                }
            };
            Modal.prototype.resetScrollbar = function () {
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
                var padding = $('body').data('padding-right');
                if (typeof padding !== 'undefined') {
                    $('body').css('padding-right', padding).removeData('padding-right');
                }
            };
            Modal.prototype.getScrollbarWidth = function () {
                var scrollDiv = document.createElement('div');
                scrollDiv.className = Modal.CSS.SCROLLBAR_MEASURER;
                document.body.appendChild(scrollDiv);
                var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
                document.body.removeChild(scrollDiv);
                return scrollbarWidth;
            };
            Modal.NAME = 'modal';
            Modal.DATA_KEY = 'tmnl.modal';
            Modal.TRANSITION_DURATION = 300;
            Modal.BACKDROP_TRANSITION_DURATION = 150;
            Modal.ESCAPE_KEYCODE = 27;
            Modal.DEFAULTS = {
                backdrop: true,
                keyboard: true,
                focus: true,
                show: true,
                closable: true
            };
            Modal.CSS = {
                SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
                BACKDROP: 'modal-backdrop',
                OPEN: 'modal-open',
                FADE: 'fade',
                SHOW: 'show'
            };
            Modal.EVENT = {
                TOGGLE_CLICK: 'click.modal.toggle'
            };
            Modal.SELECTOR = {
                CONTAINER: '[data-modal]',
                DIALOG: '.modal-dialog',
                DATA_TOGGLE: '[data-modal-toggle]',
                DATA_DISMISS: '[data-modal-dismiss]',
                FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
                STICKY_CONTENT: '.sticky-top',
                NAVBAR_TOGGLER: '.navbar-toggler'
            };
            return Modal;
        }(TMNL.JQueryPluginBase));
        function Plugin(config, parameters) {
            return this.each(function () {
                var $this = $(this);
                var plugin = $this.data(Modal.DATA_KEY);
                if (!plugin) {
                    var options = $this.data(Modal.NAME);
                    plugin = new Modal(this, options);
                    $this.data(Modal.DATA_KEY, plugin);
                }
                if (typeof config === 'string') {
                    if (typeof plugin[config] === 'undefined') {
                        throw new Error("No method named \"" + config + "\"");
                    }
                    plugin[config](parameters);
                }
            });
        }
        $(document).on(Modal.EVENT.TOGGLE_CLICK, Modal.SELECTOR.DATA_TOGGLE, function (event) {
            var selector = $(this).attr('data-modal-toggle');
            var $target = $(selector);
            if (this.tagName === 'A' || this.tagName === 'AREA') {
                event.preventDefault();
            }
            Plugin.call($target, 'toggle', $target);
        });
        $.fn[Modal.NAME] = Plugin;
        $.fn[Modal.NAME].Constructor = Modal;
    })(jQuery, window, document);
})(TMNL || (TMNL = {}));
var TMNL;
(function (TMNL) {
    (function ($, window, document) {
        var Tab = /** @class */ (function (_super) {
            __extends(Tab, _super);
            function Tab(element) {
                var _this = _super.call(this, Tab.NAME, element) || this;
                _this.$content = _this.$element.next(Tab.SELECTOR.CONTENT);
                _this.init();
                return _this;
            }
            Tab.prototype.init = function () {
            };
            Tab.prototype.show = function (event) {
                var $target = $(event.target);
                if ($target.parent().hasClass(Tab.CSS.TAB_ACTIVE)) {
                    return;
                }
                else {
                    $target.parent().siblings().removeClass(Tab.CSS.TAB_ACTIVE);
                    $target.parent().siblings().attr('aria-selected', 'false');
                    $target.parent().addClass(Tab.CSS.TAB_ACTIVE);
                    $target.parent().attr('aria-selected', 'true');
                }
                this.$content.children().removeClass(Tab.CSS.PANE_ACTIVE);
                this.$content.find($target.attr('href')).addClass(Tab.CSS.PANE_ACTIVE);
            };
            Tab.NAME = 'tab';
            Tab.DATA_KEY = 'tmnl.tab';
            Tab.CSS = {
                TAB_ACTIVE: 'is-active',
                PANE_ACTIVE: 'is-active'
            };
            Tab.SELECTOR = {
                CONTAINER: '[data-tab]',
                CONTENT: '[data-tab-content]'
            };
            Tab.EVENT = {
                TAB_CLICK: 'click.tab'
            };
            return Tab;
        }(TMNL.JQueryPluginBase));
        function Plugin(config, parameters) {
            return this.each(function () {
                var $this = $(this);
                var plugin = $this.data(Tab.DATA_KEY);
                if (!plugin) {
                    plugin = new Tab(this);
                    $this.data(Tab.DATA_KEY, plugin);
                }
                if (typeof config === 'string') {
                    if (typeof plugin[config] === 'undefined') {
                        throw new Error("No method named \"" + config + "\"");
                    }
                    plugin[config](parameters);
                }
            });
        }
        $(document).on(Tab.EVENT.TAB_CLICK, Tab.SELECTOR.CONTAINER, function (event) {
            event.preventDefault();
            Plugin.call($(this), 'show', event);
        });
        $.fn[Tab.NAME] = Plugin;
        $.fn[Tab.NAME].Constructor = Tab;
    })(jQuery, window, document);
})(TMNL || (TMNL = {}));
var TMNL;
(function (TMNL) {
    (function ($, window, document) {
        $(document).ready(function (event) {
            var tabletVw = 979;
            var resizeTimeout;
            if ($(window).width() <= tabletVw) {
                floatingTableHead(true);
            }
            $(window).resize(function () {
                if ($(window).width() > tabletVw) {
                    floatingTableHead(false);
                }
                else {
                    clearInterval(resizeTimeout);
                    resizeTimeout = setInterval(floatingTableHead(true), 1000);
                }
            });
        });
        var flag = false;
        function floatingTableHead(bool) {
            var table = $('table.table-compare');
            var thFloat = $('table.table-compare-float > thead');
            var thOfType = $('table.table-compare > thead:nth-of-type(2)');
            if (bool) {
                thOfType.remove();
                table.floatThead({
                    zIndex: 2,
                    top: 80,
                    bottom: -180,
                    floatTableClass: "table-compare-float"
                });
                table.trigger('reflow');
                flag = false;
            }
            else if (!bool && !flag) {
                thOfType.remove();
                thFloat.clone().prependTo(table);
                table.floatThead('destroy');
                flag = true;
            }
            return null;
        }
    })(jQuery, window, document);
})(TMNL || (TMNL = {}));
var TMNL;
(function (TMNL) {
    var Toast = /** @class */ (function () {
        function Toast() {
        }
        Toast.message = function (settings) {
            if (settings.content) {
                if (!Toast.instance) {
                    Toast.instance = new Toast();
                    Toast.instance.toastId = 0;
                    Toast.instance.timeouts = [];
                    $(document).on('click', Toast.SELECTOR.CLOSE_BUTTON, function (event) {
                        Toast.instance.removeToast($(event.target).parent().attr('id'));
                        clearTimeout(Toast.instance.timeouts[$(event.target).parent().attr('id')]);
                        $(event.target).parent().data('tmnl.toast.timeout', null);
                    });
                }
                Toast.instance.toastId++;
                if ($(Toast.SELECTOR.CONTAINER).length === 0) {
                    Toast.instance.createContainer();
                }
                if (settings.fullscreen) {
                    $(Toast.SELECTOR.CONTAINER).addClass('full-height');
                }
                else {
                    $(Toast.SELECTOR.CONTAINER).removeClass('full-height');
                }
                if (settings.backdrop) {
                    if ($(Toast.SELECTOR.BACKDROP).length === 0) {
                        Toast.instance.addBackdrop();
                    }
                }
                else {
                    $(Toast.SELECTOR.BACKDROP).remove();
                }
                var $toast = $(Toast.DEFAULTS.toastTemplate.replace('{0}', settings.content));
                $toast.attr("id", "toast_" + Toast.instance.toastId);
                $(Toast.SELECTOR.TOAST_LIST).append($toast);
                if (typeof Toast.instance.popper === 'undefined' || Toast.instance.popper === null) {
                    Toast.instance.popper = new Popper($(Toast.SELECTOR.CONTAINER)[0], $(Toast.SELECTOR.TOAST_LIST)[0], {
                        placement: 'top',
                        modifiers: {
                            inner: {
                                enabled: true
                            },
                            preventOverflow: {
                                padding: 0
                            }
                        }
                    });
                }
                if (settings.position) {
                    Toast.instance.popper.options.placement = settings.position;
                }
                Toast.instance.popper.update();
                Toast.instance.createTimeout($toast);
            }
        };
        Toast.prototype.createContainer = function () {
            $(document.body).append(Toast.DEFAULTS.containerTemplate);
            $(Toast.SELECTOR.CONTAINER).append(Toast.DEFAULTS.toastListTemplate);
            $(Toast.SELECTOR.TOAST_LIST).addClass('show');
        };
        Toast.prototype.addBackdrop = function () {
            $(Toast.SELECTOR.CONTAINER).append(Toast.DEFAULTS.backdropTemplate);
        };
        Toast.prototype.createTimeout = function ($element) {
            Toast.instance.timeouts[$element.attr('id')] = setTimeout(function () {
                Toast.instance.removeToast($element.attr('id'));
            }, Toast.DEFAULTS.timer);
            $element.data('tmnl.toast.timeout', Toast.instance.timeouts[$element.attr('id')]);
        };
        Toast.prototype.removeToast = function (id) {
            if ($(Toast.SELECTOR.TOAST).length === 1) {
                $(Toast.SELECTOR.CONTAINER).remove();
                Toast.instance.popper.destroy();
                Toast.instance.popper = null;
            }
            else {
                $('#' + id).remove();
                Toast.instance.popper.update();
            }
        };
        Toast.SELECTOR = {
            BACKDROP: '[data-toast-backdrop]',
            CONTAINER: '[data-toast-container]',
            TOAST_LIST: '[data-toast-list]',
            TOAST: '[data-toast]',
            CLOSE_BUTTON: '[data-toast-close]'
        };
        Toast.DEFAULTS = {
            timer: 10000,
            position: 'top',
            containerTemplate: '<div class="toast-container" data-toast-container></div>',
            backdropTemplate: '<div class="toast-backdrop" data-toast-backdrop></div>',
            toastListTemplate: '<ul class="toast-list" data-toast-list></ul>',
            toastTemplate: '<li class="toast" data-toast><button class="toast-close" data-toast-close></button>{0}</li>'
        };
        return Toast;
    }());
    TMNL.Toast = Toast;
})(TMNL || (TMNL = {}));
var TMNL;
(function (TMNL) {
    (function ($, window, document) {
        var Toggle = /** @class */ (function (_super) {
            __extends(Toggle, _super);
            function Toggle(element, options) {
                var _this = _super.call(this, Toggle.NAME, element, Toggle.DEFAULTS, options) || this;
                _this.init();
                return _this;
            }
            Toggle.prototype.init = function () {
                if (typeof this.options.selector === 'undefined' || this.options.selector === null) {
                    throw new Error("No selector configured for toggle.");
                }
            };
            Toggle.prototype.toggle = function () {
                this.$element.toggleClass(Toggle.CSS.OPENED_TOGGLE);
                $(this.options.selector).stop(true, false).slideToggle('slow');
                if (typeof this.options.parent !== 'undefined' && this.options.parent !== null) {
                    $(this.options.selector).parents(this.options.parent).toggleClass(Toggle.CSS.OPENED_TOGGLE);
                }
            };
            Toggle.NAME = 'toggle';
            Toggle.DATA_KEY = 'tmnl.toggle';
            Toggle.CSS = {
                OPENED_TOGGLE: 'is-opened'
            };
            Toggle.EVENT = {
                TOGGLE_CLICK: 'click.toggle'
            };
            Toggle.SELECTOR = {
                TOGGLE: '[data-toggle]'
            };
            Toggle.DEFAULTS = {
                selector: null,
                parent: null
            };
            return Toggle;
        }(TMNL.JQueryPluginBase));
        function Plugin(config, parameters) {
            return this.each(function () {
                var $this = $(this);
                var plugin = $this.data(Toggle.DATA_KEY);
                if (!plugin) {
                    var options = $this.data(Toggle.NAME);
                    plugin = new Toggle(this, options);
                    $this.data(Toggle.DATA_KEY, plugin);
                }
                if (typeof config === 'string') {
                    if (typeof plugin[config] === 'undefined') {
                        throw new Error("No method named \"" + config + "\"");
                    }
                    plugin[config](parameters);
                }
            });
        }
        $(document).on(Toggle.EVENT.TOGGLE_CLICK, Toggle.SELECTOR.TOGGLE, function (event) {
            event.preventDefault();
            Plugin.call($(this), 'toggle', event);
        });
    })(jQuery, window, document);
})(TMNL || (TMNL = {}));
var TMNL;
(function (TMNL) {
    (function ($, window, document) {
        var Tooltip = /** @class */ (function (_super) {
            __extends(Tooltip, _super);
            function Tooltip(element, options) {
                var _this = _super.call(this, Tooltip.NAME, element, Tooltip.DEFAULTS, options) || this;
                _this.init();
                return _this;
            }
            Tooltip.prototype.init = function () {
                this.title = this.$element.attr('title');
                if (typeof this.title === 'undefined') {
                    throw new TypeError('No title attribute specified on HTML element.');
                }
                else {
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
            };
            Tooltip.prototype.show = function (event) {
                this.popper.update();
                if (this.$tooltip.hasClass(Tooltip.CSS.TOOLTIP_SHOW)) {
                    return;
                }
                else {
                    this.$tooltip.addClass(Tooltip.CSS.TOOLTIP_SHOW);
                }
            };
            Tooltip.prototype.hide = function (event) {
                var _this = this;
                this.popper.update();
                clearTimeout(this.timeout);
                this.timeout = setTimeout(function () {
                    _this.$tooltip.removeClass(Tooltip.CSS.TOOLTIP_SHOW);
                }, this.options.delay);
            };
            Tooltip.NAME = 'tooltip';
            Tooltip.DATA_KEY = 'tmnl.tooltip';
            Tooltip.CSS = {
                TOOLTIP_SHOW: 'is-shown'
            };
            Tooltip.SELECTOR = {
                ARROW: '[data-tooltip-arrow]',
                TRIGGER: '[data-tooltip]'
            };
            Tooltip.DEFAULTS = {
                delay: 200,
                placement: 'top',
                template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow" data-tooltip-arrow x-arrow></div>{0}</div>'
            };
            Tooltip.EVENT = {
                TOOLTIP_MOUSEENTER: 'mouseenter.tooltip',
                TOOLTIP_MOUSELEAVE: 'mouseleave.tooltip'
            };
            return Tooltip;
        }(TMNL.JQueryPluginBase));
        function Plugin(config, parameters) {
            return this.each(function () {
                var $this = $(this);
                var plugin = $this.data(Tooltip.DATA_KEY);
                if (!plugin) {
                    plugin = new Tooltip(this, null);
                    $this.data(Tooltip.DATA_KEY, plugin);
                }
                if (typeof config === 'string') {
                    if (typeof plugin[config] === 'undefined') {
                        throw new Error("No method named \"" + config + "\"");
                    }
                    plugin[config](parameters);
                }
            });
        }
        $(document).on('mouseenter', Tooltip.SELECTOR.TRIGGER, function (event) {
            event.preventDefault();
            Plugin.call($(event.target), 'show', event);
        });
        $(document).on('mouseleave', Tooltip.SELECTOR.TRIGGER, function (event) {
            event.preventDefault();
            Plugin.call($(event.target), 'hide', event);
        });
        $.fn[Tooltip.NAME] = Plugin;
        $.fn[Tooltip.NAME].Constructor = Tooltip;
    })(jQuery, window, document);
})(TMNL || (TMNL = {}));
var TMNL;
(function (TMNL) {
    (function ($, window, document) {
        var VideoCarousel = /** @class */ (function (_super) {
            __extends(VideoCarousel, _super);
            function VideoCarousel(element) {
                var _this = _super.call(this, VideoCarousel.NAME, element) || this;
                _this.$container = _this.$element;
                _this.$carouselItem = _this.$container.find(VideoCarousel.SELECTOR.CAROUSEL_ITEM);
                _this.$thumbnail = _this.$container.find(VideoCarousel.SELECTOR.THUMBNAIL);
                _this.$iframe = _this.$container.find(VideoCarousel.SELECTOR.IFRAME);
                _this.$overlay = _this.$container.children(VideoCarousel.SELECTOR.OVERLAY);
                _this.$overlayClose = _this.$overlay.find(VideoCarousel.SELECTOR.OVERLAY_CLOSE);
                _this.$playButton = _this.$carouselItem.find(VideoCarousel.SELECTOR.PLAY_BUTTON);
                _this.init();
                return _this;
            }
            VideoCarousel.prototype.init = function () {
                var _this = this;
                this.$thumbnail.on('click', function (e) {
                    var element = $(e.target).closest(VideoCarousel.SELECTOR.THUMBNAIL);
                    _this.selectItem(element);
                });
                this.$playButton.on('click', function (e) {
                    _this.videoUrl = $(e.target).closest(VideoCarousel.SELECTOR.PLAY_BUTTON).data('videoCarouselUrl');
                    _this.showVideoOverlay(_this.videoUrl);
                });
                this.$overlayClose.on('click', function (e) {
                    _this.hideVideoOverlay();
                });
            };
            VideoCarousel.prototype.selectItem = function (element) {
                this.hideVideoOverlay();
                var index = $(this.$thumbnail).index($(element).closest(VideoCarousel.SELECTOR.THUMBNAIL));
                this.$thumbnail.removeClass(VideoCarousel.CSS.THUMBNAIL_ACTIVE);
                $(element).closest(VideoCarousel.SELECTOR.THUMBNAIL).addClass(VideoCarousel.CSS.THUMBNAIL_ACTIVE);
                this.$carouselItem.removeClass(VideoCarousel.CSS.CAROUSEL_ITEM_ACTIVE);
                this.$carouselItem.eq(index).addClass(VideoCarousel.CSS.CAROUSEL_ITEM_ACTIVE);
            };
            VideoCarousel.prototype.showVideoOverlay = function (videoUrl) {
                this.$container.addClass(VideoCarousel.CSS.OVERLAY_OPEN);
                this.$overlay.show();
                var autoplay = videoUrl.indexOf('?') === -1 ? "?autoplay=1&color=e20074" : "&autoplay=1&color=e20074";
                setTimeout(function () {
                    this.$iframe.attr('src', videoUrl + autoplay);
                }.bind(this), 350);
            };
            VideoCarousel.prototype.hideVideoOverlay = function () {
                this.$container.removeClass(VideoCarousel.CSS.OVERLAY_OPEN);
                this.$overlay.hide();
                this.$iframe.attr('src', '');
            };
            VideoCarousel.NAME = 'video-carousel';
            VideoCarousel.DATA_KEY = 'tmnl.video-carousel';
            VideoCarousel.CSS = {
                CAROUSEL_ITEM_ACTIVE: 'is-active',
                OVERLAY_OPEN: 'video-carousel-overlay-is-open',
                THUMBNAIL_ACTIVE: 'is-active'
            };
            VideoCarousel.SELECTOR = {
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
            return VideoCarousel;
        }(TMNL.JQueryPluginBase));
        $(document).ready(function (event) {
            $(VideoCarousel.SELECTOR.CONTAINER)[VideoCarousel.NAME]();
        });
        $.fn[VideoCarousel.NAME] = function (options) {
            return this.each(function () {
                var $this = $(this);
                if (!$this.data(VideoCarousel.NAME)) {
                    $this.data(VideoCarousel.NAME, new VideoCarousel(this));
                }
            });
        };
    })(jQuery, window, document);
})(TMNL || (TMNL = {}));
var TMNL;
(function (TMNL) {
    var CurrentBreakpoint = /** @class */ (function () {
        function CurrentBreakpoint() {
        }
        CurrentBreakpoint.isMobile = function () {
            return $(window).width() <= this.BreakPoint.MOBILE_MAX;
        };
        CurrentBreakpoint.isTablet = function () {
            return ($(window).width() >= this.BreakPoint.TABLET_MIN && $(window).width() <= this.BreakPoint.TABLET_MAX);
        };
        CurrentBreakpoint.isDesktop = function () {
            return ($(window).width() >= this.BreakPoint.DESKTOP_MIN && $(window).width() <= this.BreakPoint.DESKTOP_MAX);
        };
        CurrentBreakpoint.isLargeDesktop = function () {
            return ($(window).width() >= this.BreakPoint.LARGE_DESKTOP_MIN);
        };
        CurrentBreakpoint.BreakPoint = {
            MOBILE_MAX: 767,
            TABLET_MIN: 768,
            TABLET_MAX: 979,
            DESKTOP_MIN: 980,
            DESKTOP_MAX: 1199,
            LARGE_DESKTOP_MIN: 1200
        };
        return CurrentBreakpoint;
    }());
    TMNL.CurrentBreakpoint = CurrentBreakpoint;
})(TMNL || (TMNL = {}));
