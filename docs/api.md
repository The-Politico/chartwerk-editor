# Werk API

### Data mapping

Because of the many types of data schema ChartWerk has to ingest while creating charts, it's necessary to abstractly represent the relationship between schema and chart.

Most representations don't span the gap between these two domains. For example, using a mapping between data columns and traditional X and Y axes is tied too closely to the hard rules of a chart's coordinate plane. What happens when we want to use the same logic in terms of X & Y to draw both a horizontal and a vertical bar chart?

ChartWerk uses a coarse, high-level grammar to describe tabular data in terms that describe a column-wise mapping to chart dimensions.

Because users are asked to classify columns in their data according to this grammar, it's described as colloquially as possible.

There are four ways to classify a data column:

#### Base axis

A column classified as a base axis most often contains data like time series dates or categorical values. These are values _against which_ numeric data are charted. The base axis corresponds to the traditional X axis in the case of horizontal line and bar charts. It can also, more expansively, represent a column of state names used to chart data points in a choropleth map.

#### Data series

Data series columns always contain numeric values, never categorical data. These data are always _translated_ to dimensions on the chart, whether those be positional attributes like X & Y coordinates or dimensions coded by color.

For example, these may be values plotted on the Y axis in horizontal line and bar charts, or data points used in choropleth maps to indicate the difference in a value between areas.

#### Grouping column

Grouping columns are always categorical data used to create sub-groups or facets in a chart. They can be represented by color.

#### Annotation column

Annotations are textual labels paired with data points.

#### Faceting column

A column of values used on some charts to create faceted charts, i.e., small multiples.

Users are also given the option to ignore a column in the data, in which case the column is not made available through the Werk API.
