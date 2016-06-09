import React from 'react';
import Select from 'react-select';
import _ from 'lodash';
import $ from 'jquery';
import ellipsize from 'ellipsize';
import ColorPicker from './ColorPicker.jsx';
import ColorScheme from './ColorScheme.jsx';
import BaseTypePicker from './BaseTypePicker.jsx';

export default React.createClass({

  propTypes: {
    actions: React.PropTypes.object,
    werk: React.PropTypes.object,
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
      if (this.props.werk.axes.color.byGroup) {
        this.props.actions.colorByGroup();
      }
      actions.resetDatamap();
      actions.resetColor();
    }
  },

  /**
   * Select component options. Conditional for base and group classifications.
   * @returns {array}     Array of options.
   */
  setOptions() {
    const datamap = this.props.werk.datamap;
    const opts = [
      { value: 'base', label: 'Base axis', disabled: false },
      { value: 'series', label: 'Data series' },
      { value: 'group', label: 'Grouping column', disabled: false },
      { value: 'annotation', label: 'Annotation column' },
      { value: 'ignore', label: 'Ignore column' },
    ];

    opts[0].disabled = datamap.base;
    opts[2].disabled = datamap.group;

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
      case 'group':
        actions.removeGroup();
        actions.resetColor();
        if (this.props.werk.axes.color.byGroup) {
          actions.colorByGroup();
        }
        break;
      case 'series':
        actions.removeSeries(column);
        actions.unsetColor(column);
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
    switch (v.value) {
      case 'base':
        actions.addBase(column);
        break;
      case 'group':
        actions.addGroup(column);
        break;
      case 'series':
        actions.addSeries(column);
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
    if (datamap.group === column) { return 'group'; }
    if (datamap.annotations.indexOf(column) > -1) { return 'annotation'; }
    if (datamap.series.indexOf(column) > -1) { return 'series'; }
    if (datamap.ignore.indexOf(column) > -1) { return 'ignore'; }

    return null;
  },

  colorGroupSwitch() {
    if (this.props.werk.axes.color.byGroup) {
      this.props.actions.resetColor();
    }
    this.props.actions.colorByGroup();
  },

  groupColors() {
    const werk = this.props.werk;
    const column = werk.datamap.group;
    const groups = _.sortedUniq(werk.data.map((datum) => datum[column]));

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
        <h4>Groups</h4>
        <table id="group-selects">
          <tbody>{selects}</tbody>
        </table>
      </div>
    );
  },

  changeTab(e) {
    e.preventDefault();
    $('a[href="#axes"]').tab('show');
  },

  render() {
    const werk = this.props.werk;

    const classifySelects = _.keys(werk.data[0]).map((column, i) => {
      let addOption;

      switch (this.traverseDatamap(column)) {
        case 'series':
          addOption = !this.props.werk.axes.color.byGroup &&
            !this.props.werk.axes.color.quantize ?
            <ColorPicker
              column={column}
              werk={this.props.werk}
              actions={this.props.actions}
            />
            : null;
          break;
        case 'group':
          addOption = (
            <label>
              <input type="checkbox" value="" onChange={this.colorGroupSwitch} />
              <i className="fa fa-square-o"></i>
              <i className="fa fa-check-square-o"></i> Color by groups?
            </label>
          );
          break;
        case 'base':
          addOption = (
            <BaseTypePicker
              werk={this.props.werk}
              actions={this.props.actions}
            />
          );
          break;
        default:
          addOption = null;
          break;
      }

      return (
        <tr key={i}>
          <td className="column-label">{ellipsize(column, 12)}</td>
          <td>
            <Select
              name={column}
              value={this.traverseDatamap(column)}
              options={this.setOptions()}
              onChange={this.changeValue.bind(this, column)}
              searchable={false}
              placeholder="Choose one"
              clearable={false}
            />
            {addOption}
          </td>
        </tr>
      );
    });

    const groups = this.props.werk.axes.color.byGroup ? this.groupColors() : null;


    return (
      <div>

        <div id="classify-container">
          <h4>Classify and color columns in your data&nbsp;
            <span
              className="glyphicon glyphicon-info-sign helper"
              data-toggle="modal"
              data-target=".help-modal"
              aria-hidden="true"
            >
            </span>
          </h4>
          <table id="classify-selects">
            <tbody>
              {classifySelects}
            </tbody>
          </table>
        </div>
        {groups}


        <ColorScheme werk={this.props.werk} actions={this.props.actions} />

        <div className="guidepost">
          <h4>
            <a onClick={this.changeTab} href="">
              <b>Next:</b> Axes
              <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
            </a>
          </h4>
        </div>
      </div>

    );
  },

});
