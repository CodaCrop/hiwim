---
title: Autocomplete
---

## Autocomplete ##

<input id="autocompete-example-1" class="form-control" data-autocomplete type="text" />

```javascript
$('#autocompete-example-1').autocomplete({
    minChars: 2,
    source: function(term, suggest){
        term = term.toLowerCase();
        var choices = ['Samsung Galaxy S8', 'Apple iPhone 7 32GB' /* more phones... */ ];
        var matches = [];
        for (i=0; i<choices.length; i++) {
            if (~choices[i].toLowerCase().indexOf(term)) {
                matches.push(choices[i]);
            }
        }            
        suggest(matches);
    }
});
```

| Option         | Default         | Description                                                                   |
| -------------- | --------------- | ----------------------------------------------------------------------------- |
| placeholder    | `''`            | placeholder                                                                   |
| source         | `null`          | placeholder                                                                   |
| minChars       | `3`             |                                                                               |
| delay          | `200`           |                                                                               |
| menuClass      | `''`            |                                                                               |
| renderCategory | `function`      |                                                                               |
| renderItem     | `function`      | A function that render the suggestion items.                                  |
| onSelect       | `function`      | A callback function that is executed after selecting a suggetion              |