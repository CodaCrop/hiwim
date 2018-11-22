namespace TMNL {
    (function ($: JQueryStatic, window: any, document: any) {

        class NavBar extends JQueryPluginBase {
            public static NAME: string = 'tmnl.navbar';

            public static DEFAULTS: NavBarOptions = {
                sticky: true
            };

            public static CSS: any = {
                CART_OPEN: 'navbar-cart-dropdown-open',
                NAVBAR_STICKY: 'has-navbar-sticky',
                NAVBAR_FOCUS: 'navbar-focus',
                MENU_TOGGLED: 'has-navbar-menu-toggled',
                MENU_SLIDE_OUT: 'navbar-menu-slide-out',
                MENU_SLIDE_IN: 'navbar-menu-slide-in',
                MENU_SUB_SLIDE_IN: 'navbar-menu-sub-slide-in',
                MENU_SUB_SLIDE_OUT: 'navbar-menu-sub-slide-out',
                USER_TOGGLE: 'navbar-user-dropdown-open',
                SEARCH_TOGGLE: 'navbar-search-show'
            }

            public static SELECTOR: any = {
                ELEMENT: '[data-navbar]',
                MENU: '[data-navbar-menu]',
                MENU_TOGGLE: '[data-navbar-menu-toggle]',
                MENU_ITEM: '[data-navbar-menu-item]',
                MENU_BACK: '[data-navbar-menu-back]',
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
            }

            private $body: JQuery;
            private $html: JQuery;
            private $menu: JQuery;
            private $cart: JQuery;
            private $cartDropdown: JQuery;
            private $user: JQuery;
            private $search: JQuery;
            private $searchInput: JQuery;
            private cartPopper: any;

            constructor(element: Element, options: any) {
                super(NavBar.NAME, element, NavBar.DEFAULTS, options);                
                this.$body = $('body');
                this.$html = $('html');
                this.$menu = this.$element.find(NavBar.SELECTOR.MENU);
                this.$cart = this.$element.find(NavBar.SELECTOR.CART);
                this.$cartDropdown = this.$element.find(NavBar.SELECTOR.CART_DROPDOWN);
                this.$user = this.$element.find(NavBar.SELECTOR.USER);
                this.$search = this.$element.find(NavBar.SELECTOR.SEARCH);
                this.$searchInput = this.$element.find(NavBar.SELECTOR.SEARCH_INPUT);

                if (this.$cart.length > 0 && this.$cartDropdown.length > 0) {
                    this.cartPopper = new Popper(this.$cart[0], this.$cartDropdown[0], {
                        placement: 'bottom'
                    });
                }

                this.init();
            }

            init(): void {
                if (this.options.sticky) {
                    this.$body.addClass(NavBar.CSS.NAVBAR_STICKY);
                } else {
                    this.$body.removeClass(NavBar.CSS.NAVBAR_STICKY);
                }

                this.$menu.find(".navbar-menu-sub").parent().hover(() => {
                    this.$body.addClass(NavBar.CSS.NAVBAR_FOCUS);  
                }, () => {
                    this.$body.removeClass(NavBar.CSS.NAVBAR_FOCUS);  
                })

                // menu
                this.$element.on('click', NavBar.SELECTOR.MENU_TOGGLE, (event) => {
                    let $target = $(event.target);
                    
                    if ($target.is(':checked')) {
                        this.showMenu();

                        $(window).on('resize.navbar.menu', (event) => {
                            this.showMenu();
                        });
                    } else {
                        this.hideMenu();
                    }
                });
                
                this.$element.on('click', NavBar.SELECTOR.MENU_ITEM, (event) => {
                    let $target = $(event.target);

                    if((CurrentBreakpoint.isMobile() || CurrentBreakpoint.isTablet()) && $target.next().length > 0) {
                        event.preventDefault();
                        event.stopPropagation();
                        $target.removeClass(NavBar.CSS.MENU_SUB_SLIDE_OUT).addClass(NavBar.CSS.MENU_SUB_SLIDE_IN);                        
                        $target.parents(NavBar.SELECTOR.MENU).removeClass(NavBar.CSS.MENU_SLIDE_IN).addClass(NavBar.CSS.MENU_SLIDE_OUT);
                    }
                });

                this.$element.on('click', NavBar.SELECTOR.MENU_BACK, (event) => {
                    this.$element.find(NavBar.SELECTOR.MENU_ITEM).removeClass(NavBar.CSS.MENU_SUB_SLIDE_IN).addClass(NavBar.CSS.MENU_SUB_SLIDE_OUT);
                    $(event.target).parents(NavBar.SELECTOR.MENU).removeClass(NavBar.CSS.MENU_SLIDE_OUT).addClass(NavBar.CSS.MENU_SLIDE_IN);
                });

                // cart
                this.$element.on('mouseenter', NavBar.SELECTOR.CART,  (event) => {
                    if(!CurrentBreakpoint.isMobile()) {
                        this.cartPopper.update();
                        this.$cartDropdown.addClass(NavBar.CSS.CART_OPEN);
                        this.$user.removeClass(NavBar.CSS.USER_TOGGLE);
                    }
                });

                this.$element.on('mouseleave', NavBar.SELECTOR.CART,  (event) => {
                    this.$cartDropdown.removeClass(NavBar.CSS.CART_OPEN);
                });

                this.$element.on('tmnl.navbar.cart.update', (event, html) => {
                    let $prevSibling = this.$cart.prev();

                    this.$cartDropdown.remove();
                    this.$cart.remove();
                    
                    $(html).insertAfter($prevSibling);
                    
                    this.$cart = this.$element.find(NavBar.SELECTOR.CART);
                    this.$cartDropdown = this.$element.find(NavBar.SELECTOR.CART_DROPDOWN);
                    
                    this.cartPopper.destroy();
                    this.cartPopper = new Popper(this.$cart[0], this.$cartDropdown[0], {
                        placement: 'bottom'
                    });
                });

                // search
                this.$search.on('click', NavBar.SELECTOR.SEARCH_OPEN,  (event) => {
                    this.$search.addClass(NavBar.CSS.SEARCH_TOGGLE);
                    this.$user.removeClass(NavBar.CSS.USER_TOGGLE);
                    this.$cartDropdown.removeClass(NavBar.CSS.CART_OPEN);
                    this.$searchInput.focus();

                    // This sets the cursor in the input at the end of the text:
                    let currentValue = this.$searchInput.val();
                    this.$searchInput.val(currentValue);
                });

                this.$search.on('click', NavBar.SELECTOR.SEARCH_CLOSE,  (event) => {
                    this.$search.removeClass(NavBar.CSS.SEARCH_TOGGLE);
                    this.$searchInput.blur();
                });

                // user
                this.$user.on('mouseenter', (event) => {
                    this.$user.addClass(NavBar.CSS.USER_TOGGLE);
                    this.$cartDropdown.removeClass(NavBar.CSS.CART_OPEN);
                });

                this.$user.on('mouseleave', (event) => {
                    this.$user.removeClass(NavBar.CSS.USER_TOGGLE);                 
                });

                this.$user.on('click', NavBar.SELECTOR.USER_TOGGLE + ':not([href])',(event) => {
                    this.$user.toggleClass(NavBar.CSS.USER_TOGGLE);
                    event.preventDefault();
                    event.stopPropagation();                 
                });

                this.$user.on('click', NavBar.SELECTOR.USER_CLOSE,(event) => {
                    this.$user.find(NavBar.SELECTOR.USER_TOGGLE).trigger('click');                    
                });

                // resize window
                $(window).on('resize', (event) => {
                    if(CurrentBreakpoint.isMobile()) {
                        this.$cartDropdown.removeClass(NavBar.CSS.CART_OPEN);
                    }

                    if ((CurrentBreakpoint.isDesktop() || CurrentBreakpoint.isLargeDesktop()) && this.$html.hasClass(NavBar.CSS.MENU_TOGGLED)) {
                        this.hideMenu();
                    }
                });
            }

            showMenu():void {
                this.$body.css('marginTop', '');
                this.$menu.parent().css('height', '');

                let scrollY = window.scrollY;
                let menuHeight = window.innerHeight - this.$element.height();

                this.$html.removeClass(NavBar.CSS.MENU_TOGGLED);
                this.$body.css('marginTop', (scrollY * -1));
                this.$html.addClass(NavBar.CSS.MENU_TOGGLED);
                this.$menu.parent().css('height', menuHeight);
            }

            hideMenu():void {
                let scrollY = parseInt(this.$body.css('marginTop'), 10) * -1;
                        
                this.$html.removeClass(NavBar.CSS.MENU_TOGGLED);                        
                window.scrollTo(0, scrollY);
                this.$body.css('marginTop', 0);
                this.$menu.parent().css('height', '');

                $(window).off('resize.navbar.menu');
                
                this.$element.find(NavBar.SELECTOR.MENU_TOGGLE).prop("checked", false);
            }

            toggleUser(event: JQuery.Event): void {
                this.$user.toggleClass(NavBar.CSS.USER_TOGGLE);
            }
        }

        $(document).ready(function (event) {
            $(NavBar.SELECTOR.ELEMENT)[NavBar.NAME]();
        });

        $.fn[NavBar.NAME] = function (options: any) {
            return this.each(function () {
                let $this = $(this);
                if (!$this.data(NavBar.NAME)) {
                    $this.data(NavBar.NAME, new NavBar(this, options || $this.data('navbar')));
                }
            });
        };

    })(jQuery, window, document);
}