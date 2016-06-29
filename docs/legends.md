# `chartWerk.text.legend`

The legends API contains several signals to help you draw labels. Legends are HTML elements, either flowed above the chart or absolutely positioned within the chart space.

[legend.active](#legend.active)

<a name="legend.active" href="#legend.active">#</a> legend.<b>active</b>

Boolean weather the user has opted to create a color legend for the chart.

### `legend.keys`

Keys are an array of objects:

```js
[
  {
    color: "#FF0000",
    text: "Republican"
  },
  {
    color: "#0000FF",
    text: "Democrat"
  }
]
```

`color` is derived from the range array of the color axis.

`text` is input by the user. When using a quantized color scale, the text is pre-filled with the minimum value of each color bin _but_ is overwritable by the user.

### `legend.title`

A title for the legend.

### `legend.single`/`legend.double`

Independent legend options for single or double-column size charts.

#### `legend.{size}.inside`

Boolean whether to display the legend within the chart space. If false, assumed to display flowed above.

Flow of individual keys is presumed to be left-to-right when rendering the legend above the chart and top-to-bottom, i.e., stacked, when rendered within the chart space.

#### `legend.{size}.align`

On legends flowed above the chart, determines whether to left or right align the.

#### `legend.{size}.background`

#### `legend.{size}.width`

#### `legend.{size}.position`
