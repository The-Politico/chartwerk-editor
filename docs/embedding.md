# Embedding Chartwerk charts

### Rendering the chart

The `client.bundle.js` script will render text elements, annotations and legends; size the chart appropriately and call the global `draw` function that actually draws your chart or map.

### Embed script

You will also need an embed script on the parent page you're embedding your chart into.

Here's an example:

```javascript
(function(){
    var werks = document.querySelectorAll(".chartwerk");
    for (var i = 0; i < werks.length; i++) {
        var werk = werks[i],
            id = werk.dataset.id,
            dimensions = JSON.parse(werk.dataset.embed),
            size = werk.dataset.size,
            screen = werk.parentElement.clientWidth;
        // Check if iframe already embedded. (Handles for multiple embedded charts...)
        if (werk.querySelectorAll('iframe').length < 1) {
            var iframe = document.createElement("iframe");
            iframe.setAttribute("scrolling", "no");
            iframe.setAttribute("frameborder", "0");
            // desktop
            if (size === 'double') {
                if (screen > dimensions.double.width) {
                    iframe.setAttribute("src", "https://interactives.dallasnews.com/chartwerk/2.0/"+id+".html");
                    iframe.setAttribute("height", dimensions.double.height);
                    iframe.setAttribute("width", "100%");
                } else {
                    iframe.setAttribute("src", "https://interactives.dallasnews.com/chartwerk/2.0/"+id+"_single.html");
                    iframe.setAttribute("height", dimensions.single.height);
                    iframe.setAttribute("width", dimensions.single.width);
                }
            // mobile
            } else {
                iframe.setAttribute("src", "https://interactives.dallasnews.com/chartwerk/2.0/"+id+"_single.html");
                iframe.setAttribute("height", dimensions.single.height);
                iframe.setAttribute("width", dimensions.single.width);
            }
            werk.appendChild(iframe);
        }
    }
})();
```