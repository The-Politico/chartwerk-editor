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