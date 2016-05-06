# activeButton

Utility to determine active/inactive button state.

**Parameters**

-   `type` **String** Type of input to check.

Returns **String** Disabled class or null.

# addGroup

Add quantile group, up to 8 groups.

Returns **void**

# axis

datamap reducer

**Parameters**

-   `axis` **Object** Previous redux store state tree.
-   `action` **Object** Action contains type and payload for reducer.
                                 See actions/index.js for descriptions of
                                 action params.

Returns **Object** nextState  Next redux store state tree.

# changeThreshold

Change a quantile threshold via input change.

**Parameters**

-   `i` **Integer** Index of threshold
-   `e` **Object** event with target value

Returns **void**

# changeValue

Changes value of Select component via setState

**Parameters**

-   `i` **integer** Index of Select component
-   `v` **string** Value selected

Returns **void**

# colors

Add your own color schemes here as nested arrays of hex color values.

We recommend you replicate the structure of categorical, sequential and
diverging schemes, as used at <http://colorbrewer2.org>.

If you want to change that structure, the reducer for setting the scheme
(SET_COLOR_SCHEME) is written to expect an array at categorical.default.
You'll also need to rewrite parseSchemes in the ColorScheme component to
match your custom structure.

The ColorPicker component is styled to fit an array of 8 colors.

# componentDidMount

After first render, chart SVG els for chart.

Returns **void**

# componentDidMount

Set initial state tree

Returns **void**

# componentDidUpdate

On subsequent renders, update SVG els.

Returns **void**

# data

data reducer

**Parameters**

-   `data` **Object** Previous redux store state tree.
-   `action` **Object** Action contains type and payload for reducer.
                                 See actions/index.js for descriptions of
                                 action params.

Returns **Object** nextState  Next redux store state tree.

# datamap

datamap reducer

**Parameters**

-   `datamap` **Object** Previous redux store state tree.
-   `action` **Object** Action contains type and payload for reducer.
                                 See actions/index.js for descriptions of
                                 action params.

Returns **Object** nextState  Next redux store state tree.

# dateLabel

If dateSniffer returned a valid datetime format, ie, the index
of a datetime object, add humanized label. If it didn't but date
format was picked, add parse error. Otherwise, null.

# dateSniffer

Sniff for date format using moment.js.

**Parameters**

-   `force` **Boolean** Whether to force dateSniffing. Used to avoid
                             	setState race conditions, e.g., setDateFormat.

Returns **Integer** i      Index of object in datetime array.

# datetime

Supported datetime strings.

Component data/BaseTypePicker uses moment.js
to sniff datetime formats, then passes d3 datetime
string to werk object for use in template parsers.

Human readable strings are displayed in the UI after parsing.

You may add valid datetime formats.

# dragThreshold

Change a quantile threshold via drag on viz.

**Parameters**

-   `i` **Integer** Index of threshold
-   `v` **Float** New threshold value

Returns **void**

# dragThreshold

Change a quantile threshold via drag on viz.
Passed up to parent component.

**Parameters**

-   `i` **Integer** Index of threshold
-   `v` **Float** New threshold value

Returns **void**

# equalGroups

[function description]

**Parameters**

-   `groups` **Number** Number of quantize groups

Returns **Array** Array of thresholds of length groups - 1.

# equidistantColors

Creates a color range of equidistant hues from lightest and darkest
color in scheme.

**Parameters**

-   `groups` **Number** Number of quantize groups.

Returns **Array** Array of hex colors interpolated for each
                       quantize group.

# getChartState

Gets data needed for d3 scales

Returns **Object** Data array, thresholds array (including min value)
                      and color range array

# getInitialState

Creates an array of nulls, one for each select component.
Props is an antipattern here, but...

Returns **Obj** Initial state object

# inputMax

Determine maximum value of the input based on neighboring theshold values.

**Parameters**

-   `threshold` **Number** Threshold for this group.

Returns **Number** Maximum value for group, or null of last group.

# inputMin

Determine minimum value of the input based on neighboring theshold values.

**Parameters**

-   `threshold` **Number** Threshold for this group.

Returns **Number** Minimum value for group, or null of first group.

# isEqual

If data columns change, reset the state selections array to reset
the data selections.

# maxCeil

Get max input value, offset by 2% of data extent.

Returns **Float** Max input value

# minCeil

Get min input value, offset by 2% of data extent.

Returns **Float** Min input value

# offset

Return 2% offset, which serves as min size of group.

Returns **Float** 2% offset

# parse

parse - Sets state from obj returned from converter

**Parameters**

-   `format` **str** 'TSV' or 'CSV'
-   `jsonObj` **obj** Obj returned by converter

Returns **void**

# removeGroup

Remove quantile group, down to 2 groups.

Returns **void**

# render

Renders SVG container.

Returns **JSX** Chart container.

# resetGroups

Reset to equidistant quantile thresholds.

Returns **void**

# rowCheck

Check that datetime format parses all row-wise data.

**Parameters**

-   `format` **string** A moment.js datetime format.

Returns **Integer** If dateformat parses all data,
                            the index of the datetime
                            object.

# setColorScheme

Sets a path that navigates color object (from constants/colors).

**Parameters**

-   `path` **string** A string that represents the path to a color
                             array in constants/colors, accessed via the
                             lodash function _.get .

Returns **Object** Action payload.

# setDateFormat

Pass d3-friendly date format string back to state tree.

# setOptions

Select component options. Conditional for base and group classifications.

Returns **array** Array of options.

# setQuantizeDomain

Sets color domain.

**Parameters**

-   `thresholds` **Array** Quantize thresholds

Returns **void**

# setQuantizeRange

Sets color range.

**Parameters**

-   `groups` **Integer** Number of groups.

Returns **void**

# typeCheck

typeCheck - Checks type of data pasted by user
Checks in order: JSON, TSV, CSV

**Parameters**

-   `data` **str** User-pasted data as string.

Returns **void**

# typeSniffer

Sniff data type of first data object's base property.

Returns **String** The data type sniffed

# value

Update datamap store.

# value

Remove the previously selected value from datamap and do any
necessary cleanup.
