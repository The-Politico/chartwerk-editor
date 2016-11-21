# datamap API

Because of the many types of data schema Chartwerk has to ingest while creating charts it's necessary to abstractly represent the relationship between schema and chart.

Most common representations of that relationship don't span the gap between these two domains. For example, using a mapping between data columns and traditional X and Y axes is tied too closely to the hard rules of a chart's coordinate plane. What happens when we want to use the same logic in terms of X & Y axes to draw both a horizontal and a vertical bar chart?

Chartwerk uses a coarse, high-level grammar to describe tabular data in terms that represent a column-wise mapping to the dimensions of a chart. That grammar describes the schema with the bare minimum information needed to identify chart features.

There are six ways to classify a data column:

### Base axis

A column classified as a base axis most often contains data like time series dates or categorical values. Commonly, these are values _by which_ numeric data are charted. Mortality rates _by occupation_. Stock prices _by company_.

The base axis corresponds to the traditional X axis in the case of horizontal line and bar charts. It can also represent a column of state names used to chart data in a choropleth map or a column of numeric values plotted along the X axis of a scatterplot.

### Value axis

A value axis is a single column of numeric data used to determine positional attributes of a data point. For example, the height on the Y axis of a point in a scatterplot or the number of units to draw in a unit chart.

### Scale axis

Scale axis data is used to set the color or size of a data point. It can contain numeric or categorical data.

By design, Chartwerk does not allow for multiple scale axes, for example, scaling a data point by size and color.

### Data series

Often, it is more natural to keep data in a crosstab format than in a [flat table schema](https://cran.r-project.org/web/packages/tidyr/vignettes/tidy-data.html#tidy-data) that neatly corresponds to base, value and scale axes. Data series accommodate that convenience.

Data series are crosstabbed columns always containing numeric values, never categorical data. These data are always translated to a positional dimension on the chart _and_ to a categorical color range.

The data series classifications are mutually exclusive with value axis and scale axis options because they contain the same data, simply represented differently in the table schema.

Take, for example, these two table schemas:

#### Crosstab

| Date     | Male | Female |
|----------|------|--------|
| 01/01/16 | 22   | 24     |
| 02/01/16 | 26   | 32     |

- `Date` -> base axis
- `Male` -> data series
- `Female` -> data series

#### Flat table schema

| Date     | Gender | Age |
|----------|--------|-----|
| 01/01/16 | Female | 24  |
| 02/01/16 | Female | 32  |
| 01/01/16 | Male   | 22  |
| 02/01/16 | Male   | 26  |

- `Date` -> base axis
- `Gender` -> scale axis
- `Age` -> value axis

In the crosstab, the `Male` and `Female` columns will represent both a color and a position, whereas in the flat table, `Gender` is discretely a scale axis and `Age`, a value axis.

### Faceting column

Faceting columns are always categorical data used to create sub-groups of data for small multiples, i.e., faceted charts.

### Annotation column

Annotations are text labels paired with data points. These are often used to pass data to tooltips.

### Ignored column

Users are also given the option to ignore a column in the data, in which case the column is not made available through the datamap API.

## Examples of the grammar

#### Bar chart

A 2-column dataset of percent of executive jobs held by women by company.

- `Company` -> base axis
- `Percent women` -> value axis

#### Unit chart

A 2-column dataset of leading causes of death among 100 teens.

- `Cause of death` -> scale axis (color of each block)
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
- `Industry` -> faceting column

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

#### Boxplots

A 3-column dataset of medical [utilization rates](https://www.cms.gov/research-statistics-data-and-systems/statistics-trends-and-reports/medicare-provider-charge-data/physician-and-other-supplier.html) by doctor by practice specialty.

- `specialty` -> base axis
- `utilization rate` -> value axis
- `doctor NPI` -> ignored column

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
- `Republican or Democrat` -> scale axis

#### Dot maps

A 3-column dataset of minority population growth rates by city.

- `Longitude` -> base axis
- `Latitude` -> value axis
- `Population growth` -> scale axis

A 3-column dataset of cities that are above or below an EPA smog threshold.

- `Longitude` -> base axis
- `Latitude` -> value axis
- `Above or below` -> scale axis
