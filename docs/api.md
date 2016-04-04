# Werk API

### Data mapping

Because of the many types of data schema ChartWerk has to ingest while creating charts, it's necessary to abstractly represent the relationship between schema and chart.

Most representations don't span the gap between these two domains. For example, using a mapping between data columns and, say, traditional X and Y axes is tied too closely to the hard rules of a chart's coordinate plane. What happens when we want to use the same logic in terms of X & Y to draw both a horizontal and a vertical bar chart?

ChartWerk uses a coarse, high-level grammar to describe tabular data in terms of a column-wise mapping to chart dimensions.

Because users are asked to classify columns in their data according to this grammar, it's as simple and colloquial as possible.

There are four ways to classify a data column:

#### Base axis

A column classified as a base axis most often includes data like dates for a time series line chart or categorical values in a bar chart. These are values _against which_ data points are charted. The base axis corresponds to the traditional X axis in the case of horizontal line and bar charts.

#### Data series

Data series are always columns of numeric values, never categorical data. These values are plotted on the Y axis in horizontal line and bar charts.

#### Grouping column

Grouping columns are always categorical data used to create sub-groups or facets in a chart.

#### Annotation column

Annotations are textual labels paired with data points.

Users are also given the option to ignore a column in the data, in which case the column is not made available through the Werk API.
