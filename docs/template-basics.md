#Chart template basicsh

This section will walk you through the basics of writing the code behind a chart template in Chartwerk.

- [The draw function](#draw-function)
- [Ownership of annotations](#ownership-annotations)

### The "draw" function {#draw-function}

Chartwerk will call a global function to draw your chart everytime a user makes a selection in the Editor.

This function **must be named "draw"**, as in:

```javascript
function draw(){
  // your chart code here...
}
```





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

A separate script, `client.bundle.js`, will render the these text elements in the embeddable flat file and should be inlined on that page by the backend app. 