import React from 'react';
import Select from 'react-select';
import Modal from 'react-modal';
import _ from 'lodash';
import ellipsize from 'ellipsize';
import ColorPicker from './ColorPicker';
import ColorScheme from './ColorScheme';
import BaseTypePicker from './BaseTypePicker';
import Quantizer from './Quantizer';

export default React.createClass({

  propTypes: {
    actions: React.PropTypes.object,
    werk: React.PropTypes.object,
  },

  getInitialState() {
    return {
      helpModal: false,
    };
  },

  componentWillReceiveProps(nextProps) {
    const actions = this.props.actions;
    /**
     * If data columns change, reset the state selections array to reset
     * the data selections.
     */
    if (
        !_.isEqual(
            _.keys(this.props.werk.data[0]).sort(), // Old props
            _.keys(nextProps.werk.data[0]).sort() // New props
        )
    ) {
      if (this.props.werk.axes.color.byFacet) {
        this.props.actions.colorByFacet();
      }
      actions.unsetLegend();
      actions.resetDatamap();
      actions.resetColor();
    }
  },

  /**
   * Select dropdown options.
   * @returns {array}     Array of options.
   */
  setOptions(column) {
    const datamap = this.props.werk.datamap;
    const ui = this.props.werk.ui;

    // Start with available options
    const opts = _.filter(ui.datamap, { available: true }).map(d => ({
      value: d.class,
      label: d.alias,
    }));

    /**
     * DISABLING OPTIONS
     * We set some hard logic for disabling options based on other
     * selections below.
     */

    /**
     * Disables options for which only one column can be selected, namely,
     * base, value, scale and facet options.
     * @param  {string} valueString String that matches value prop on datamap
     *                              object.
     * @return {void}
     */
    const disableExclusiveOpt = (valueString) => {
      const i = _.indexOf(opts, _.find(opts, { value: valueString }));
      if (i === -1) { return; }
      opts[i].disabled = datamap[valueString];
    };

    disableExclusiveOpt('base');
    disableExclusiveOpt('value');
    disableExclusiveOpt('scale');
    disableExclusiveOpt('facet');

    /**
     * Manually set disabled prop. Logic for conditions below.
     * @param {string} valueString String that matches value prop on datamap
     *                             object.
     * @param {boolean} disabled    Whether option should be disabled.
     */
    const setDisabled = (valueString, disabled) => {
      const i = _.indexOf(opts, _.find(opts, { value: valueString }));
      if (i === -1) { return; }
      opts[i].disabled = disabled;
    };

    /**
     * Data series are mutually exclusive with value and scale axes.
     * So if there is more than one data series, or there is one data series
     * but it's not the option set we're creating, disable value and scale.
     */
    if (
      datamap.series.length > 1 ||
      (datamap.series.length === 1 && datamap.series[0] !== column)
    ) {
      setDisabled('value', true);
      setDisabled('scale', true);
    }
    /**
     * Disable dataseries when value or scale axis is selected, unless only one
     * is selected and that is the option set we're creating.
     */
    setDisabled('series',
      (datamap.value && datamap.scale) ||
      (datamap.value && datamap.value !== column) ||
      (datamap.scale && datamap.scale !== column)
    );

    return opts;
  },

  /**
   * Changes value of Select component via setState
   * @param  {string} column  column name
   * @param  {string} v   Value selected
   * @returns {void}
   */
  changeValue(column, v) {
    const actions = this.props.actions;

    /**
     * Remove the previously selected value from datamap and do any
     * necessary cleanup.
     */
    switch (this.traverseDatamap(column)) {
      case 'base':
        actions.removeBase();
        break;
      case 'value':
        actions.removeValue();
        actions.unsetColor(column);
        break;
      case 'scale':
        actions.removeScale();
        actions.resetColor();
        actions.unsetLegend();
        break;
      case 'series':
        actions.removeSeries(column);
        actions.unsetColor(column);
        break;
      case 'facet':
        actions.removeFacet();
        break;
      case 'annotation':
        actions.removeAnnotations(column);
        break;
      case 'ignore':
        actions.removeIgnore(column);
        break;
      default:
        break;
    }

    /**
     * Update datamap store.
     */
    if (!_.has(v, 'value')) {
      return;
    }
    switch (v.value) {
      case 'base':
        actions.addBase(column);
        break;
      case 'value':
        actions.addValue(column);
        break;
      case 'scale':
        actions.addScale(column);
        actions.resetColor();
        this.scaleSniffer(column);
        break;
      case 'series':
        actions.addSeries(column);
        break;
      case 'facet':
        actions.addFacet(column);
        break;
      case 'annotation':
        actions.addAnnotations(column);
        break;
      case 'ignore':
        actions.addIgnore(column);
        break;
      default:
        break;
    }
  },

  /**
   * Traverses the data map API and returns the type for the column
   * @param  {String} column column name
   * @return {String}        Data type
   */
  traverseDatamap(column) {
    const datamap = this.props.werk.datamap;

    if (datamap.base === column) { return 'base'; }
    if (datamap.value === column) { return 'value'; }
    if (datamap.scale === column) { return 'scale'; }
    if (datamap.series.indexOf(column) > -1) { return 'series'; }
    if (datamap.facet === column) { return 'facet'; }
    if (datamap.annotations.indexOf(column) > -1) { return 'annotation'; }
    if (datamap.ignore.indexOf(column) > -1) { return 'ignore'; }

    return null;
  },

  /**
   * Returns data attributes for Quantizer props.
   * @return {Obj} Object with series and extent properties.
   */
  getQuantizeData() {
    const werk = this.props.werk;
    const series = _.map(werk.data, werk.axes.color.quantizeProps.column);
    const extent = [
      _.min(series),
      _.max(series),
    ];
    return {
      series,
      extent,
    };
  },

  /**
   * Sniffs whether scale axis column is numeric or categorical
   * and sets quantize state accordingly.
   * @return {null}
   */
  scaleSniffer(scaleColumn) {
    const werk = this.props.werk;
    const actions = this.props.actions;

    const scaleArray = werk.data.map((d) => d[scaleColumn]);
    if (!scaleArray.some(isNaN)) {
      actions.setQuantizeColumn(scaleColumn);
      actions.setQuantize();
    } else {
      actions.unsetQuantize();
    }
  },

  colorFacetSwitch() {
    if (this.props.werk.axes.color.byFacet) {
      this.props.actions.resetColor();
    }
    this.props.actions.colorByFacet();
  },

  changeIgnoreScale() {
    const werk = this.props.werk;
    const actions = this.props.actions;

    actions.resetColor();
    /**
     * If scale axis currently ignored, run the scale sniffer to reset quantized
     * or categorical color scale. Otherwise, remove the quantize flag.
     */
    if (werk.axes.color.ignoreScale) {
      this.scaleSniffer(werk.datamap.scale);
    } else {
      actions.unsetQuantize();
    }
    actions.setIgnoreScale();
  },

  groupColors() {
    const werk = this.props.werk;
    const column = werk.datamap.scale && !werk.axes.color.quantize ?
      werk.datamap.scale : werk.datamap.facet;
    // Ternary prevents ColorPicker being initialized on an array with undefined members.
    const groups = column ? _.uniq(werk.data.map((datum) => datum[column])) : [];
    groups.sort();

    if (groups.length > 8) {
      return (
        <div className="alert alert-fail">
          <strong>Too many groups:</strong> You&rsquo;ve selected a column
          with more than 8 unique values. That&rsquo;s more groups than the
          color scheme can accomodate.
        </div>
      );
    }

    const selects = groups.map((group, i) =>
        (<tr key={i}>
          <td>
              {ellipsize(group, 8)}
          </td>
          <td>
            <ColorPicker
              column={group}
              werk={this.props.werk}
              actions={this.props.actions}
            />
          </td>
        </tr>)
    );

    return (
      <div>
        <h4>Color scale groups</h4>
        <table id="group-selects">
          <tbody>{selects}</tbody>
        </table>
      </div>
    );
  },

  changeTab(e) {
    e.preventDefault();
    $('a[href="#axes"]').tab('show');
    $('#editor-pane').animate({ scrollTop: 0 }, 300);
  },

  render() {
    const werk = this.props.werk;
    const actions = this.props.actions;

    const modalStyles = {
      overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.65)',
        zIndex: 9,
      },
      content: {
        maxWidth: '800px',
        margin: 'auto',
        backgroundColor: 'white',
      },
    };

    const classifySelects = _.keys(werk.data[0]).map((column, i) => {
      let addOption;
      let article = 'a';

      switch (this.traverseDatamap(column)) {
        case 'value':
          /**
           * If there's not a scale axis or the scale axis is explicitly
           * ignored for color, give a color picker on the value axis.
           */
          addOption = !werk.datamap.scale ||
            werk.axes.color.ignoreScale ?
            <ColorPicker
              column={column}
              werk={werk}
              actions={actions}
            /> : null;
          break;
        case 'series':
          addOption = !werk.axes.color.byFacet &&
            !werk.axes.color.quantize ?
            <ColorPicker
              column={column}
              werk={werk}
              actions={actions}
            />
            : null;
          break;
        case 'facet':
          addOption = (
            <label>
              <input type="checkbox" value="" onChange={this.colorFacetSwitch} />
              <i className="fa fa-square-o"></i>
              <i className="fa fa-check-square-o"></i> Color by facet?
            </label>
          );
          break;
        case 'scale':
          addOption = (
            <label>
              <input
                type="checkbox"
                onChange={() => this.changeIgnoreScale()}
                checked={werk.axes.color.ignoreScale}
              />
              <i className="fa fa-square-o"></i>
              <i className="fa fa-check-square-o"></i> Scale by size, not color?
            </label>
          );
          break;
        case 'base':
          addOption = (
            <BaseTypePicker
              werk={werk}
              actions={actions}
            />
          );
          break;
        default:
          addOption = null;
          article = 'an';
          break;
      }

      return (
        <tr key={i}>
          <td className="column-label">
            <p><span className="column-label">{ellipsize(column, 12)}</span> is {article}
              <Select
                name={column}
                value={this.traverseDatamap(column)}
                options={this.setOptions(column)}
                onChange={this.changeValue.bind(this, column)}
                searchable={false}
                placeholder="Choose one"
                clearable
              />
              {addOption}
            </p>
          </td>
        </tr>
      );
    });

    /**
     * If we're coloring by facets OR there's a scale axis that is neither
     * quantized nor ignored, give group color pickers.
     */
    const groups = werk.axes.color.byFacet ||
      (
        werk.datamap.scale &&
        !werk.axes.color.quantize &&
        !werk.axes.color.ignoreScale
      ) ?
      this.groupColors() : null;

    const quantizer = werk.axes.color.quantize ?
    (<Quantizer
      werk={this.props.werk}
      actions={this.props.actions}
      data={this.getQuantizeData()}
    />) : null;

    return (
      <div>
        <hr />
        <div id="classify-container">
          <h4>Describe the columns in your data
            <a id="data-help-prompt"
              onClick={() => this.setState({ helpModal: true })}
            >Need help?</a>
          </h4>
          <table id="classify-selects">
            <tbody>
              {classifySelects}
            </tbody>
          </table>
        </div>
        {groups}
        {quantizer}


        <ColorScheme werk={werk} actions={actions} />

        <div className="guidepost">
          <h4>
            <a onClick={this.changeTab} href="">
              <b>Next:</b> Axes
              <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
            </a>
          </h4>
        </div>

        <Modal
          isOpen={this.state.helpModal}
          onRequestClose={() => this.setState({ helpModal: false })}
          style={modalStyles}
        >
          <i className="fa fa-times" onClick={() => this.setState({ helpModal: false })}></i>
          <div id="data-help-modal-content">
            <p>
              You need to define your data columns so Chartwerk can interpret
              them and produce a chart. Here’s a quick guide to help you
              pick the appropriate definition:
            </p>
            <h4>Base axis</h4>
            <p>
              This column contains data like dates or names. These are the
              values <em>by which</em> your numbers are charted. Examples include stock
              prices <em>by day</em>, mortality rates <em>by state</em> and
              salaries <em>by profession</em>. This can also be a column
              of numbers plotted along the X axis in the case of a scatterplot.
            </p>
            <p>
              <img
                src={`${window.chartwerkConfig.static_prefix}img/icons/base.png`}
                alt="base axis"
                style={{ height: '100px' }}
              />
            </p>
            <h4>Value axis</h4>
            <p>
              This column contains the numeric data that you're charting. It’s
              what determines the position of your data points, like the height
              of your bars or the plot of your line graph.
            </p>
            <p>
              <img
                src={`${window.chartwerkConfig.static_prefix}img/icons/value.png`}
                alt="value axis"
                style={{ height: '100px' }}
              />
            </p>
            <h4>Scale axis</h4>
            <p>
              This column has text or values used to color or size your data points.
            </p>
            <p>
              <img
                src={`${window.chartwerkConfig.static_prefix}img/icons/scale.png`}
                alt="scale axis"
                style={{ height: '110px' }}
              />
            </p>
            <h4>Data series</h4>
            <p>
              Often your data is structured so that a column represents both
              the position <em>and</em> color of your data points. Data series columns
              are a shortcut for a value axis <em>and</em> a (categorical) scale axis.
            </p>
            <p>
              <img
                src={`${window.chartwerkConfig.static_prefix}img/icons/data_series.png`}
                alt="data series"
                style={{ height: '65px' }}
              />
            </p>
            <h4>Faceting column</h4>
            <p>
              These columns always contain categorical text used to create
              subgroups of your data for “small-multiple” charts.
            </p>
            <h4>Annotation column</h4>
            <p>
              For some chart templates, if you want to add callouts to certain data
              points, you can designate a column that contains the text used to
              annotate them.
            </p>
            <h4>Ignored column</h4>
            <p>Sure, you could've just not copied that column over, but why not be really
            explicit about it.</p>
          </div>
        </Modal>
      </div>

    );
  },

});
