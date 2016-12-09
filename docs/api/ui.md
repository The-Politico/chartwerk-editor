# chartwerk.ui

UI properties represent state in the editor. Generally, they are not used to draw the chart.

- [ui.rawData](#raw)
- [ui.size](#size)
- [ui.datamap](#datamap)

#### ui.rawData {#raw}

A string of the raw data pasted into the editor by a chart creator.

#### ui.size {#size}

The size of chart to render in the preview window. Either `single` or `double`.

#### ui.datamap {#datamap}

The datamap classification options with their aliases and availability (i.e., whether they are visible in the dropdown).

```javascript
[
  {
    class: "base",
    alias: "X axis",
    available: true
  }
]
```