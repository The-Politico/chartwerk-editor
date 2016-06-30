# `chartWerk.text.legend`

The legends API contains properties to help you draw labels. Legends are HTML elements, either flowed above the chart or absolutely positioned within the chart space.

- [legend.active](#legend.active)
- [legend.keys](#legend.keys)
- [legend.title](#legend.title)
- [legend.{single|double}](#legend.size)
- [legend.{single|double}.inside](#legend.size.inside)
- [legend.{single|double}.align](#legend.size.align)
- [legend.{single|double}.background](#legend.size.background)
- [legend.{single|double}.width](#legend.size.width)
- [legend.{single|double}.position](#legend.size.position)

<a name="legend.active" href="#legend.active">#</a> legend.<b>active</b>

Boolean weather the user has opted to create a color legend for the chart.

<a name="legend.keys" href="#legend.keys">#</a> legend.<b>keys</b>

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

<a name="legend.title" href="#legend.title">#</a> legend.<b>title</b>

A title for the legend.

<a name="legend.size" href="#legend.size">#</a> legend.<b>{single|double}</b>

Independent legend options for single or double-column size charts.

<a name="legend.size.inside" href="#legend.size.inside">#</a> legend.{single|double}.<b>inside</b>

Boolean whether to display the legend within the chart space. If false, assumed to display flowed above.

Flow of individual keys is presumed to be left-to-right when rendering the legend above the chart and top-to-bottom, i.e., stacked, when rendered within the chart space.

<a name="legend.size.align" href="#legend.size.align">#</a> legend.{single|double}.<b>align</b>

Either `l` or `r` for left or right aligning the chart container above the chart. Option only displayed when `legend.{single|double}.inside` is `false`.

<a name="legend.size.background" href="#legend.size.background">#</a> legend.{single|double}.<b>background</b>

Boolean whether to draw a background behind the legend. Option only displayed when `legend.{single|double}.inside` is `true`.

<a name="legend.size.width" href="#legend.size.width">#</a> legend.{single|double}.<b>width</b>

Width in pixels of the legend container.

<a name="legend.size.position" href="#legend.size.position">#</a> legend.{single|double}.<b>position</b>

An object containing `x` and `y` position of the legend container within the chart space. Option only displayed when `legend.{single|double}.inside` is `true`.

```js
{
  x: 10,
  y: 15
}
```
