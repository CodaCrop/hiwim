namespace TMNL {
    export class Analytics {
        public static register(data: any): void {
            if (typeof data === "object" && window["dataLayer"] !== undefined) {
                window["dataLayer"].push(data);
            }
        }
    }
}