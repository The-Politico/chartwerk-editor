# chartwerk.axes

Axes options are used to construct scales and axes.

This is the densest branch of the API, but that doesn't mean it's the hardest to understand. Most of these options correspond to the properties of [scales](https://github.com/d3/d3/blob/master/API.md#scales-d3-scale) and [axes](https://github.com/d3/d3/blob/master/API.md#axes-d3-axis) as implemented in [d3.js](https://d3js.org/). That said, it _is_ important that you understand the concepts used to create the [datamap](datamap.md).

##### Base axis
- [axes.base](#base)
- [axes.base.type](#base-type)
- [axes.base.dateFormat](#base-dateFormat)
- [axes.base.max](#base-max)
- [axes.base.min](#base-min)
- [axes.base.label](#base-label)
- [axes.base.prefix](#base-prefix)
- [axes.base.suffix](#base-suffix)
- [axes.base.format.{single|double}](#base-format)
- [axes.base.format.{single|double}.dateString](#base-format-dateString)
- [axes.base.format.{single|double}.frequency](#base-format-frequency)
- [axes.base.format.{single|double}.ticks](#base-format-ticks)
- [axes.base.format.{single|double}.customTicks](#base-format-customTicks)
- [axes.base.shadedRegions](#base-shadedRegions)

<img class="screenshot" src="../img/screenshots/base_axis_date.png" />

##### Value axis
- [axes.value](#value)
- [axes.value.max](#value-max)
- [axes.value.min](#value-min)
- [axes.value.label](#value-label)
- [axes.value.prefix](#value-prefix)
- [axes.value.suffix](#value-suffix)
- [axes.value.format.{single|double}](#value-format)
- [axes.value.format.{single|double}.ticks](#value-format-ticks)
- [axes.value.format.{single|double}.customTicks](#value-format-customTicks)

<img class="screenshot" src="../img/screenshots/value_axis.png" />

##### Scale axis
- [axes.scale](#scale)
- [axes.scale.prefix](#scale-prefix)
- [axes.scale.suffix](#scale-suffix)

##### Color
- [axes.color](#color)
- [axes.color.domain](#color-domain)
- [axes.color.range](#color-range)
- [axes.color.scheme](#color-scheme)
- [axes.color.byFacet](#color-byFacet)
- [axes.color.ignoreScale](#color-ignoreScale)
- [axes.color.quantize](#color-quantize)
- [axes.color.quantizeProps](#color-quantizeProps)
- [axes.color.quantizeProps.column](#color-quantizeProps-column)
- [axes.color.quantizeProps.groups](#color-quantizeProps-groups)
- [axes.color.quantizeProps.reverseColors](#color-quantizeProps-reverseColors)



#### axes.base {#base}

Properties that belong to a chart's [base axis](datamap.md#chartwerk-datamap-base).

#### axes.base.type {#base-type}

The type of data contained in the base axis column. One of `categorical`, `numerical` or `date`.

#### axes.base.dateFormat {#base-dateFormat}

A string representing the format of dates in the base axis column. The format is automatically sniffed by Chartwerk and the string passed to the API. 

The string, itself, is in the format of [d3.js's locale.format](https://github.com/d3/d3-time-format#locale_format) and is often used to create a d3 date [parser](https://github.com/d3/d3-time-format#locale_parse) in a template.

#### axes.base.max {#base-max}

The maximum value of the axis.

Only displayed if `axes.base.type` is `numerical`. 

#### axes.base.min {#base-min}

The minumum value of the axis.

Only displayed if `axes.base.type` is `numerical`.

#### axes.base.label {#base-label}

A string label that can be used to label an axis. For example, _"U.S. dollars."_

#### axes.base.prefix {#base-prefix}

A string used to prefix tick labels on the axis. For example, _"$."_ 

This is often also used to prefix numeric values in tooltips.

#### axes.base.suffix {#base-suffix}

A string used to suffix tick labels on the axis. For example, _"lbs."_ 

This is often also used to suffix numeric values in tooltips.

#### axes.base.format.{single|double} {#base-format}

Specifies format options on the axis for both the single and double-wide size.

#### axes.base.format.{single|double}.dateString {#base-format-dateString}

A string used to format dates in axis tick labels. Represents short and long labels for date periods, for example, `Y` for four-digit year and `y` for two-digit.

Usually used to create a custom [multi-scale time format](https://github.com/d3/d3-time-format/blob/master/README.md). For example:

```javascript
var formatMillisecond = d3.timeFormat(".%L"),
    formatSecond = d3.timeFormat(":%S"),
    formatMinute = d3.timeFormat("%I:%M"),
    formatHour = d3.timeFormat("%I %p"),
    formatDay = d3.timeFormat("%a %d"),
    formatWeek = d3.timeFormat("%b %d"),
    formatMonth = d3.timeFormat("%B"),
    formatYear = d3.timeFormat("%Y");

var s = chartwerk.ui.size;  // either 'single' or 'double'
var dateTick;

switch(chartwerk.axes.base.format[s].dateString) {
    case 'Y':
        dateTick = d3.timeYear;
        formatYear = d3.timeFormat("%Y");
        break;
    case 'y':
        dateTick = d3.timeYear;
        formatYear = d3.timeFormat("'%y");
        break;
    case 'M':
        dateTick = d3.timeMonth;
        formatMonth = d3.timeFormat("%B");
        formatYear = d3.timeFormat("Jan. '%y");
        break;
    case 'm':
        dateTick = d3.timeMonth;
        formatMonth = d3.timeFormat("%b.");
        formatYear = d3.timeFormat("J/%y");
        break;
    case 'W':
    case 'w':
        dateTick = d3.timeWeek;
        formatMonth = d3.timeFormat("%b.");
        formatYear = d3.timeFormat("J/%y");
        break;
    case 'D':
        dateTick = d3.timeDay;
        formatMonth = d3.timeFormat("%b.");
        formatYear = d3.timeFormat("J/%y");
}
        
function multiFormat(date) {
  return (d3.timeSecond(date) < date ? formatMillisecond
      : d3.timeMinute(date) < date ? formatSecond
      : d3.timeHour(date) < date ? formatMinute
      : d3.timeDay(date) < date ? formatHour
      : d3.timeMonth(date) < date ? (d3.timeWeek(date) < date ? formatDay : formatWeek)
      : d3.timeYear(date) < date ? formatMonth
      : formatYear)(date);
}
        
werk.axes.x.tickFormat(multiFormat)
```


#### axes.base.format.{single|double}.frequency {#base-format-frequency}

An integer used to create a date interval or the frequency of the axis label date period. For example, a `2` for displaying a tick every two years.

```javascript
var s = chartwerk.ui.size;  // either 'single' or 'double'

werk.axes.x.ticks(
    d3.timeYear.every( chartwerk.axes.base.format[s].frequency )
);
```

#### axes.base.format.{single|double}.ticks {#base-format-ticks}

An integer representing how many ticks to display on the axis.

#### axes.base.format.{single|double}.customTicks {#base-format-customTicks}

An array of custom tick values to use on the axis.

#### axes.base.shadedRegions {#base-shadedRegions}

An array of regions to shade on the axis. Usually used to shade date periods along a date axis. Date strings should be in the same format as dates in the base axis column.

```JSON
[
  {
    min: '2015-01-01',
    max: '2015-06-30'
  }
]
```

**Hint:** You can use shadedRegions to draw rectangles _and_ lines on the axis. Say a user provides the same value for max and min, draw a line at the corresponding axis point. Use free annotations to annotate what rectangles and lines represents.

#### axes.value {#value}

Properties that belong to a chart's [value axis](datamap.md#chartwerk-datamap-value).

#### axes.value.max {#value-max}

The maximum value of the axis. 

#### axes.value.min {#value-min}

The minumum value of the axis.

#### axes.value.label {#value-label}

A string label that can be used to label an axis. For example, _"U.S. dollars."_

#### axes.value.prefix {#value-prefix}

A string used to prefix tick labels on the axis. For example, _"$."_ 

This is often also used to prefix numeric values in tooltips.

#### axes.value.suffix {#value-suffix}

A string used to suffix tick labels on the axis. For example, _"lbs."_ 

This is often also used to suffix numeric values in tooltips.

#### axes.value.format.{single|double} {#value-format}

Specifies format options on the axis for both the single and double-wide size.

#### axes.value.format.{single|double}.ticks {#value-format-ticks}

An integer representing how many ticks to display on the axis.

#### axes.value.format.{single|double}.customTicks {#value-format-customTicks}

An array of custom tick values to use on the axis.

#### axes.value.shadedRegions {#value-shadedRegions}

An array of regions to shade on the axis.

```JSON
[
  {
    min: 0,
    max: 100
  }
]
```

**Hint:** You can use shadedRegions to draw rectangles _and_ lines on the axis. Say a user provides the same value for max and min, draw a line at the corresponding axis point. Use free annotations to annotate what rectangles and lines represents.


#### axes.scale {#scale}

Properties that belong to a chart's [scale axis](https://hobbes7878.gitbooks.io/chartwerk-editor/content/docs/api/chartwerk-datamap-base#chartwerk-datamap-scale).

#### axes.scale.prefix {#scale-prefix}

A string used to prefix tick labels on the axis. For example, _"$."_ 

This is often also used to prefix numeric values in tooltips.

#### axes.scale.suffix {#scale-suffix}

A string used to suffix tick labels on the axis. For example, _"lbs."_ 

This is often also used to suffix numeric values in tooltips.

#### axes.color {#color}

#### axes.color.domain {#color-domain}

The domain array of the chart's color scale.

#### axes.color.range {#color-range}

The range array of the chart's color scale.

#### axes.color.scheme {#color-scheme}

A string accessor in dot notation to an array of colors in the color object constant. For example, `"categorical.default"` to access the color array:

```JSON
{
  categorical: {
    default: [
      '#329CEB',
      '#E34E36',
      '#FF8F24',
      '#FEC44F',
      '#52B033',
      '#8554BF',
      '#6DCCF2',
      '#C9C9C9'
    ]
  }
}
```

#### axes.color.byFacet {#color-byFacet}

Boolean whether to set color domain by [faceting column](datamap.md#chartwerk-datamap-facet).

#### axes.color.ignoreScale {#color-ignoreScale}

Boolean whether to ignore [scale axis](datamap.md#chartwerk-datamap-scale) when setting color scale domain. Used when you want to use the scale axis to specify the size of your data points rather than their color.

#### axes.color.quantize {#color-quantize}

Boolean whether or not color scale is quantized, i.e., whether the domain represents continuous rather than discrete values.

#### axes.color.quantizeProps {#color-quantizeProps}

Contains properties used to create quantized color scale. 

**Hint:** If you're using d3.js, the correct color scale to use is actually a [threshold scale](https://github.com/d3/d3-scale#threshold-scales).

#### axes.color.quantizeProps.column {#color-quantizeProps-column}

Specifies which data column to create the quantized color scale domain from.

#### axes.color.quantizeProps.groups {#color-quantizeProps-groups}

The number of color groups in the quantized color scale range.

#### axes.color.quantizeProps.reverseColors {#color-quantizeProps-reverseColors}

Boolean whether to reverse the direction of the color scale range. Used to emphasize minimum rather than maximum in color scheme (or vice versa).