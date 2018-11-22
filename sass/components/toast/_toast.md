---
title: Toast
---

## Toast

<button type="button" class="button-primary" onClick='TMNL.Toast.message({"position": "bottom", "backdrop": true, "content": "<h3>This is a toast</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae ornare urna.</p>"})'>Show toast</button>

```javascript
TMNL.Toast.message({
    "position": "bottom", 
    "backdrop": true, 
    "content": "<h3>This is a toast</h3>"
});
```

| Option                 | Default      | Description                                                             |
| ---------------------- | ------------ | ----------------------------------------------------------------------- |
| position               | `'top'`      | Position of the toast (top/bottom/left/right/right-start/right-end)     |
| backdrop               | `false`      | Show backdrop                                                           |
| content                | `''`         | Content of the toast as an HTML string                                  |
| fullscreen  | `false`      | Toast container takes the full height of the window                     |
