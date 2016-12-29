# How chartwerk makes charts

### How data becomes a chart

The following flow chart represents how Chartwerk turns tabular data into a chart.

<br/><br/>

<img src="./img/flowchart.png" class="screenshot" />

<br/><br/>

#### Steps

1. A user supplies tabular data to the Chartwerk Editor. This step presumes the user has already determined which chart type she wants to make and the Editor is preloaded with that type's corresponding chart template.
2. User makes selections in the Editor that determine how different features of this chart should be formatted, for example, axes and labels.
3. Chartwerk takes those user selections and any defaults which are part of the chart template and turns them into an API, which is defined as a global object, `chartwerk`.
4. The chart template has scripts which are written to consume the API and draw the chart using whatever dependencies needed. These scripts are called in the editor (namely, the `draw()` function) and create a live preview for the user.
5. After a user saves their chart, the Chartwerk backend app takes the API and the chart scripts and saves them to a flat HTML file (two files, actually: one for for each size of chart, double and single-wide). The flat file will call the chart's drawing function, just as in the Editor, and draw the chart on the page.


### From a developer's perspective
It's important to understand that the previous process diagram is a little backwards from the perspective of a chart template developer, who builds templates long before a user builds any charts with them and who will not be an active part of this process flow once the template is complete.



