namespace TMNL {
    export class CurrentBreakpoint {
        public static BreakPoint = {
            MOBILE_MAX: 767,
            TABLET_MIN: 768,
            TABLET_MAX: 979,
            DESKTOP_MIN: 980,
            DESKTOP_MAX: 1199,
            LARGE_DESKTOP_MIN: 1200
        };

        public static isMobile(): boolean {
            return $(window).width() <= this.BreakPoint.MOBILE_MAX;
        }
        public static isTablet(): boolean {
            return ($(window).width() >= this.BreakPoint.TABLET_MIN && $(window).width() <= this.BreakPoint.TABLET_MAX);
        }
        public static isDesktop(): boolean {
            return ($(window).width() >= this.BreakPoint.DESKTOP_MIN && $(window).width() <= this.BreakPoint.DESKTOP_MAX);
        }
        public static isLargeDesktop(): boolean {
            return ($(window).width() >= this.BreakPoint.LARGE_DESKTOP_MIN);
        }
    }
}