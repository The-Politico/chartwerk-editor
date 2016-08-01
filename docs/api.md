# Werk API

## Data mapping

Because of the many types of data schema ChartWerk has to ingest while creating charts it's necessary to abstractly represent the relationship between schema and chart.

Most common representations don't span the gap between these two domains. For example, using a mapping between data columns and traditional X and Y axes is tied too closely to the hard rules of a chart's coordinate plane. What happens when we want to use the same logic in terms of X & Y to draw both a horizontal and a vertical bar chart?

ChartWerk uses a coarse, high-level grammar to describe tabular data in terms that describe a column-wise mapping to chart dimensions. That grammar describes the schema with the bare minimum of encoded information needed to identify chart features.

Put more formally, the grammar minimizes schema entropy, but because users are asked to classify columns in their data according to this grammar, its features are colloquial.

There are six ways to classify a data column:

#### Base axis

A column classified as a base axis most often contains data like time series dates or categorical values. These are values _by which_ numeric data are charted. Mortality rates _by state_. Stock prices _by comapny_.

The base axis corresponds to the traditional X axis in the case of horizontal line and bar charts. It can also represent a column of state names used to chart data in a choropleth map.

#### Value axis

A value axis is a single column of numeric data used to determine positional attributes of a data point. For example, the height on the Y axis of a point in a scatterplot.

#### Data series

Often, it is more natural to keep data in a crosstab format than in a truly flat table schema. Data series are cross-tabbed columns always containing numeric values, never categorical data. These data are always translated to positional dimensions on the chart. For example, these may be values plotted on the Y axis in horizontal line and bar charts.

The value axis and data series classifications are mutually exclusive options because they can contain the same data, simply represented differently in the table schema.

#### Scale axis

Scale axis data is used to set the size or color of a data point. It can contain numeric or categorical data.

By design, ChartWerk does not allow for multiple scale axes, for example, scaling a data point by size and color.

#### Faceting column

Faceting columns are always categorical data used to create sub-groups of data that are drawn in facets of charts.

#### Annotation column

Annotations are text labels paired with data points.

Users are also given the option to ignore a column in the data, in which case the column is not made available through the Werk API.

### Examples of the grammar

### Bar chart

A 2-column dataset of percent of executive jobs held by women by company.

- `Company` -> base axis
- `Percent women` -> value axis

#### Unit chart

A 2-column dataset of leading causes of death among 100 teens.

- `Cause of death` -> base axis
- `Number of dead` -> value axis

#### Line chart

A 2-column dataset of company production rates over time.

- `Date` -> base axis
- `Production` -> value axis / data series

#### Multi-line chart

A 3-column dataset of company stock prices over time.

- `Date` -> base axis
- `Company A` -> data series
- `Company B` -> data series

#### Faceted multi-line chart

A 4-column dataset of company stock prices over time by industry.

- `Date` -> base axis
- `Company A` -> data series
- `Company B` -> data series
- `Industry` -> grouping column

#### Grouped bar chart

A 4-column dataset of recidivism rates by inmate risk category by county.

- `County` - base axis
- `Low risk` - data series
- `Medium risk` - data series
- `High risk` - data series

#### Scatterplot chart

A 4-column dataset of state SAT scores.

- `Student testing rate` -> base axis
- `SAT score` -> value axis
- `Student poverty rate` -> scale axis
- `State name` -> annotation column

#### Polar line chart

A 3-column dataset comparing two players performance stats.

- `Performance dimension` -> base axis
- `Player A` -> data series
- `Player B` -> data series

#### Choropleth maps

A 2-column dataset of infant mortality rates by state.

- `State` -> base axis
- `Mortality rate` -> scale axis

A 2-column dataset of states who voted for each political party.

- `State` -> base axis
- `Republican or Democrat` -> grouping column

#### Dot maps

A 3-column dataset of minority population growth rates by city.

- `Latitute` -> base axis
- `Longitude` -> value axis
- `Population growth` -> scale axis

A 3-column dataset of cities that are above or below an EPA smog threshold.

- `Latitute` -> base axis
- `Longitude` -> value axis
- `Above or below` -> grouping column
