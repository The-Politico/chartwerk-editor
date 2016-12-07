# chartwerk.text.legend

The legends API contains properties to help you draw labels. Legends are HTML elements, either flowed above the chart or absolutely positioned within the chart space.

- [legend.active](#legend-active)
- [legend.keys](#legend-keys)
- [legend.title](#legend-title)
- [legend.{single|double}](#legend-size)
- [legend.{single|double}.inside](#legend-size-inside)
- [legend.{single|double}.align](#legend-size-align)
- [legend.{single|double}.background](#legend-size-background)
- [legend.{single|double}.width](#legend-size-width)
- [legend.{single|double}.position](#legend-size-position)

#### legend.active {#legend-active}

Boolean weather the user has opted to create a color legend for the chart.

####legend.keys {#legend-keys}

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

####legend.title {#legend-title}

A title for the legend.

####legend.{single|double} {#legend-size}

Independent legend options for single or double-column size charts.

####legend.{single|double}.inside {#legend-size-inside}

Boolean whether to display the legend within the chart space. If false, assumed to display flowed above.

Flow of individual keys is presumed to be left-to-right when rendering the legend above the chart and top-to-bottom, i.e., stacked, when rendered within the chart space.

####legend.{single|double}.align {#legend-size-align}

Either `l` or `r` for left or right aligning the chart container above the chart. Option only displayed when `legend.{single|double}.inside` is `false`.

####legend.{single|double}.background {#legend-size-background}

Boolean whether to draw a background behind the legend. Option only displayed when `legend.{single|double}.inside` is `true`.

####legend.{single|double}.width {#legend-size-width}

Width in pixels of the legend container.

####legend.{single|double}.position {#legend-size-position}

An object containing `x` and `y` position of the legend container within the chart space. Option only displayed when `legend.{single|double}.inside` is `true`.

```js
{
  x: 10,
  y: 15
}
```

<img src="../img/screenshots/color_legend.md" class="screenshot" />