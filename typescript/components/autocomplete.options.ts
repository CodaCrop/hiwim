namespace TMNL {
    export interface AutocompleteOptions {
        placeholder: string,
        source: any,
        minChars: number,
        delay: number,
        cache: number,
        menuClass: String,
        submitForm: boolean,
        renderCategory: Function,
        renderItem: Function,
        onSelect: Function
    }
}