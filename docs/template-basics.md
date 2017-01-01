#Chart template basics

This section will walk you through the basics of writing the code behind a chart template in Chartwerk.

- [The "draw" function](#draw-function)
- [The "helper" object](#helper-object)
- [Chart styles](#chart-styles)
- [Including dependencies](#dependencies)
- [Ownership of annotations](#ownership-annotations)
- [Best practices](#best-practices)

### The "draw" function {#draw-function}

Chartwerk will call a single, named global function to draw your chart.

This function **must be** named "draw", as in:

```javascript
function draw(){
  // your chart code here...
}
```

It will be called in the Editor everytime a user makes a selection in the Editor's UI. It will also be called inline on the embeddable page, though only once.


##### Idempotence

Though the draw function is called multiple times in the Editor, it _does not necessarily_ need to be idempotent[*](https://en.wikipedia.org/wiki/Idempotence#Computer_science_meaning). Chartwerk presumes your chart function will only be called once in the embeddable page and tolerates multiple calls in the Editor by [removing all children](https://github.com/DallasMorningNews/chartwerk-editor/blob/master/src/js/misc/api.js#L67-L74) of the `#chart` container before each call, basically giving you a blank slate each time.

### The "helper" object {#helper-object}

Often, it's helpful to move boilerplate code you know won't change away from code you think you may tweak as users build charts with your template.

Chartwerk gives you a space to define an object with helpful methods to do rudimentary tasks like parse data or define scales and axes.

For example, you might have a helper object like this: 

```javascript
var werkHelper = {
  parseData: function() {
    // Parses data into correctly formatted data types,
    // e.g., dates and numbers instead of strings, etc.
  },
  scales: function() {
    // Defines some d3.js scales
  }
}
```

... which you could them call within your draw function like this:

```javascript
function draw() {
  werkHelper.parseData();
}
```

See the Best Practices section on passing data to and from the helper object for a real example of a typical exchange between the draw function and helper object.




### Chart styles {#chart-styles}

### Including dependencies {#dependencies}


### Ownership of annotations {#ownership-annotations}

Chartwerk assumes ownership of many parts of the annotation layer for charts. 

 Specfically, Chartwerk handles:
- Color legends
- Free annotations
- The headline
- Chatter
- Footnote
- Source line
- Author/attribution line

The rendering scripts for these features are built into the Editor preview. 

A separate script, `client.bundle.js`, will render [these](https://github.com/DallasMorningNews/chartwerk-editor/blob/master/src/js/client/legend.js) [text](https://github.com/DallasMorningNews/chartwerk-editor/blob/master/src/js/client/annotations.js) [elements](https://github.com/DallasMorningNews/chartwerk-editor/blob/master/src/js/client/text.js) in the embeddable flat file and should be inlined on that page by the backend app. 

### Best practices {#best-practices}

#### Working with the helper object

In most cases, we've found we use the helper object to do parsing tasks we need before we can begin to draw a chart, for example setting up SVG axes or defining scales in d3.js. Relegating these tasks to helper object methods keeps our draw function cleaner and its code more explicitly tied to actually drawing SVG elements. 

Most of these helper methods can be performed in sequence once and then handed back to the draw function. To do this easily, we often write the helper object with a single method that calls all others, like the `build` method below:

```javascript
var werkHelper = {
  parse: function(werk) {
    // ...
  },
  
  scales: function (werk) {
    // ...
  },
  
  // etc.
  
  build: function(werk) {
    this.parse(werk);
    this.scales(werk);
    // etc.
    return werk;
  }
}
```

You'll notice the `werk` parameter is passed between all the methods above. This is usually an object we can hang various properties on, like d3 scale functions and axes. We'll usually create that object in the draw function with any initial properties we know upfront:

```javascript
function draw(){
  // An object that you can pass to the helper object
  // with any initial properties you know, for example,
  // chart dimensions we'll need to define our scale ranges.
  var initialProps = {
        dims: {
          single: { width: 260, height: 225 },
          double: { width: 540, height: 250}
        },
    };
  // Pass the object to the build method on the helper object.   
  var werk = werkHelper.build(initialProps);  
}
```

Then we'll hang named properties on that object in the helper.

Here's a complete example using the above `initialProps` and defining parsed data and scales:

```javascript
var werkHelper = {

  // Method that parses raw user data into data our template can use.
  parse: function(werk) {
    // First, define some parsers for our data formats.
    // Dates for the x axis, numbers for the y.
    werk.parsers = {
      x: d3.timeParse( chartwerk.axes.base.dateFormat ),
      y: function(d){ return +d; }
    };
    
    // Now use those parsers to create a new dataset with properties x & y.
    // *Checkout the datamap API section if datamap.base/value are confusing.
    werk.data = chartwerk.data.map(function(d){
      return {
        x: werk.parsers.x(d[chartwerk.datamap.base]),
        y: werk.parsers.y(d[chartwerk.datamap.value[0])
      };
    })
        
  },
  
  // Method that defines d3 scales for both axes in our chart
  scales: function(werk) {
    // Get the max dimensions of the chart, based on which
    // preview size is active.
    var s = chartwerk.ui.size,
        w = werk.dims[s].width,
        h = werk.dims[s].height;

    // Get the extents (min/max) of the X & Y data    
    var xExtent = d3.extent(werk.data, function(d) { return d.x; }),
        yExtent = d3.extent(werk.data, function(d) { return d.y; });
      
    // Define scales and hang them on the werk object.
    werk.scales = {
      x: d3.scaleTime()
          .domain(xExtent)
          .range([0, w]),
      y: d3.scaleLinear()
          .domain(yExtent)
          .range([h, 0])
    };
  },
  
  // Build function that calls each of the above
  build: function(werk) {
    this.parse(werk);
    this.scales(werk);
    return werk;
  }
}
```

