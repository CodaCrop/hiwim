/// <reference path="../vendor/popper.js/packages/popper/index.d.ts" />

namespace TMNL {
    export abstract class JQueryPluginBase {
        public element: Element;
        public $element: JQuery;        
        public options: any;

        constructor(name: string, element: Element, defaults?: any, options?: any) {
            this.element = element;
            this.$element = $(element);
            this.options = $.extend(true, {}, defaults, 
                (typeof options !== 'undefined' && options !== null) ? 
                TMNL.Util.parseAttrAsJson(options) : 
                options);
        }

        abstract init(): void;
    }
}