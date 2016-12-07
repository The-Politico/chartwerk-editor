# chartwerk.scripts

Chartwerk scripts are the custom code that underlies every template in Chartwerk. They are completely customizable JS/CSS/HTML and dependency files.

- [scripts.draw](#scripts-draw)
- [scripts.helper](#scripts-helper)
- [scripts.styles](#scripts-styles)
- [scripts.html](#scripts-html)
- [scripts.dependencies](#scripts-dependencies)

#### scripts.draw {#scripts-draw}

Contains a single javascript function which **must** be named `draw`. This function is called by Chartwerk to render your chart on updates from the editor.

```javascript
draw(){
  var werk = window.chartwerk;

	var svg = d3.select("#chart")
	    .append("svg");

  // etc.
}
```

#### scripts.helper {#scripts-helper}

You may create an object with methods to help draw your chart. This object can be useful for removing boilerplate code used to parse UI options, keeping your draw function cleaner and easier to work with.

The object will be accessible in the global scope.

```javascript
var werkHelper = {

  parseAxes: function(werk){
    // ...
  },

  parseScales: function(werk){
    // ...
  },

  build: function(werk){
    parseAxes(werk);
    parseScales(werk);
    // ...
  }

}
```

#### scripts.style {#scripts-style}

CSS style rules. These are injected below any dependency stylesheets.

#### scripts.html {#scripts-html}

Any HTML elements specified here are appended to the element, `div#chartwerk`.

**Important:** Chartwerk expects certain elements be present to append data from the editor to. These elements are selected by their `id` property. At minimum the following elements should be present, though they need not be structured this way:

```html
<div id='chart-header'>
	<h2 id='headline'></h2>
	<div id='chatter'></div>
</div>
<div id='chart-legend'></div>
<div id='chart'></div>
<div id='chart-footer'>
	<div id='footnote'></div>
	<div id='source'></div>
	<div id='author'></div>
</div>
```

#### scripts.dependencies {#scripts-dependencies}

An object containing arrays of URLs for scripts and stylesheets used as dependencies by a chart template.

Only valid URL references to `.js` and `.css` files are allowed. These are injected into the page in the order given.

```js
{
  scripts: [
    'https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/leaflet.js'
  ],
  styles: [
    'http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.css'
  ]
}
```
