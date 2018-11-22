namespace TMNL {
    export class Util {

        public static KEY: any = {
            TAB: 9,
            ENTER: 13,
            ESC: 27,
            END: 35,
            HOME: 36,
            UP: 38,
            RIGHT: 39,
            LEFT: 37,
            DOWN: 40
        }

        public static hasTouch(): boolean {
            return ('ontouchstart' in window)
                || (navigator.maxTouchPoints > 0)
                || (navigator.msMaxTouchPoints > 0);
        }
        
        public static parseAttrAsJson(options: any) {
            if ($.isPlainObject(options)) {
                return options;
            }

            if (options.indexOf('{') < 0) {
                return {};
            } else {
                return new Function("", "return JSON.parse(JSON.stringify(" + options + "))")();
            }
        }
    }
}