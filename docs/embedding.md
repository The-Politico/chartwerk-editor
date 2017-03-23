# Embedding Chartwerk charts

Chartwerk offers a high level of customization when it comes to embedding your charts so you can build embeds that fit the particulars of your CMS.

At it's core, Chartwerk embeds are simple iframes of the flat files baked out by Chartwerk's backend. There are two scripts, one for the parent page and one for child.

The parent page embed script is customized to your CMS and can handle logic like switching between a double or single-wide chart page based on the available width of the embed's container.

The child embed script renders text elements like chart chatter and HTML annotations and also calls the chart's `draw` function. It is supplied by Chartwerk.

Your backend can serve Chartwerk embeds as you like. For example, django-chartwerk offers an oEmbed option.

- [Required markup](#html)
- [Parent embed script](#parent-embed)
- [Child embed script](#child-embed)


### Required markup {#html}

```html
<div
    class="chartwerk"
    data-id="ABCDEF"
    data-size="double"
    data-embed="{\"double\": {\"height\": 705, \"width\": 600}, \"single\": {\"height\": 431, \"width\": 290}}"
></div>
<script src="https://yourdomain.com/chartwerk/parent_embed_script.js"></script>
```

A `div` with four properties:

- **class** -- Always `"chartwerk"`.
- **data-id** -- Your chart's ID (as supplied by backend).
- **data-size** -- Your preferred Chartwerk chart size, either `"double"` or `"single"`.
- **data-embed** -- A JSON string that represents an object with the height and width in pixels of both of your Chartwerk chart sizes. This data is usually used by your parent embed script to determine the correct size of the chart to display and to set the height of the iframe on the parent page.

A script tag whose source is the parent embed script.

### Parent embed script {#parent-embed}

The parent page embed script is executed on the page on which you'd like to embed your chart.

This script can be custom written for your CMS to do things like accomodate the width of your content well. It's main function is to insert an iframe with the appropriate src, either the double or single-wide chart.

It's expected that you will write your own parent embed script and host it. The URL for the parent embed script is then passed to chartwerk-editor as context, namely `embed_src`.

While we presume that you will write your own parent embed script, here's an example that will suit most cases:

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

### Child embed script

The `client.bundle.js` script will render text elements, annotations and legends; size the chart appropriately and call the global `draw` function that actually draws your chart or map. This script is baked into the flat page of each chart by the backend.



