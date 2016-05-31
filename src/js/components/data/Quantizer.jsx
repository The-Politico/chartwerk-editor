"use strict";
var React           = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var _               = require('lodash');
var d3              = require('d3');
var chroma          = require('chroma-js');
var colors          = require('../../constants/colors');
var ellipsize       = require('ellipsize');
var geostats        = require('geostats');

var QuantizerViz    = require('./QuantizerViz.jsx');

module.exports = React.createClass({

  propTypes: {
      actions: React.PropTypes.object,
      werk: React.PropTypes.object,
      data: React.PropTypes.object
  },


  /**
   * Set initial state tree
   * @return {void}
   */
  componentWillMount: function(){
    var actions = this.props.actions,
        werk = this.props.werk;
    if(werk.axes.color.quantizeProps.groups === 0){
      actions.setQuantizeGroups(4);
      this.setQuantizeRange(4);
    }
  },

  /**
   * Sets color domain.
   * @param {Array} thresholds Quantize thresholds
   * @return {void}
   */
  setQuantizeDomain: function(thresholds){
    var actions = this.props.actions;
    actions.setQuantizeDomain(thresholds);
  },

  /**
   * Sets color range.
   * @param {Integer} groups Number of groups.
   * @return {void}
   */
  setQuantizeRange: function(groups){
    var actions = this.props.actions;
    actions.setQuantizeDomain(this.equalGroups(groups));
    actions.setQuantizeRange(this.equidistantColors(groups));
  },

  /**
   * Calculate equidistant thresholds.
   * @param  {Number} groups Number of quantize groups
   * @return {Array}        Array of thresholds of length groups - 1.
   */
  equalGroups: function(groups){

    var data = this.props.data,
        range = data.extent[1] - data.extent[0],
        band = range / groups;

    return _.map(new Array( groups - 1 ), function(k,i){
          return parseFloat((data.extent[0] + (band * (i+1))).toPrecision(4))
        });
  },

  /**
   * Calcualte logarithmic thresholds.
   * @param  {Integer} groups Number of quantize groups
   * @return {Array}        Array of thresholds of length groups - 1.
   */
  logGroups: function(groups){
    var data = this.props.data;

    var logScale = d3.scale.log()
        .range(data.extent)
        .domain(data.extent);

    return _.map(this.equalGroups(groups), function(d){
      return parseFloat(logScale(d).toPrecision(4));
    });
  },

  /**
   * Calculate squared thresholds.
   * @param  {Integer} groups Number of quantize groups
   * @return {Array}        Array of thresholds of length groups - 1.
   */
  sqrGroups: function(groups){
    var data = this.props.data;

    var sqrScale = d3.scale.pow().exponent(2)
        .range(data.extent)
        .domain(data.extent);

    return _.map(this.equalGroups(groups), function(d){
      return parseFloat(sqrScale(d).toPrecision(4));
    });
  },

  /**
   * Calcualted sqaure root thresholds.
   * @param  {Integer} groups Number of quantize groups
   * @return {Array}        Array of thresholds of length groups - 1.
   */
  sqtGroups: function(groups){
    var data = this.props.data;

    var sqtScale = d3.scale.pow().exponent(0.5)
        .range(data.extent)
        .domain(data.extent);

    return _.map(this.equalGroups(groups), function(d){
      return parseFloat(sqtScale(d).toPrecision(4));
    });
  },

  /**
   * Calculate thresholds by Jenks natural breaks formula.
   * @param  {Integer} groups Number of quantize groups
   * @return {Array}        Array of thresholds of length groups - 1.
   */
  jnkGroups: function(groups){
    var data = this.props.data,
        statSeries = new geostats(data.series),
        bounds = statSeries.getJenks(groups);
        // Remove max and min thresholds
        bounds.shift();
        bounds.pop();
    return bounds;
  },

  /**
   * Creates a color range of equidistant hues from lightest and darkest
   * color in scheme.
   * @param  {Number} groups Number of quantize groups.
   * @return {Array}        Array of hex colors interpolated for each
   *                        quantize group.
   */
  equidistantColors: function(groups){
    var quantizeProps = this.props.werk.axes.color.quantizeProps,
        color = this.props.werk.axes.color,
        scheme = _.get(colors, color.scheme);

    // Reverse the color range
    if(quantizeProps.reverseColors){
      var scheme = _.clone(scheme).reverse();
    }

    return chroma.scale(scheme).mode('lab').classes(groups).colors();
  },

  /**
   * Return 2% offset, which serves as min size of group.
   * @return {Float} 2% offset
   */
  offset: function(){
    var data = this.props.data;
    return (data.extent[1] - data.extent[0]) * 0.02 // 2% offset minimum
  },

  /**
   * Get max input value, offset by 2% of data extent.
   * @return {Float} Max input value
   */
  maxCeil: function(){
    var data = this.props.data;
    return data.extent[1] - this.offset();
  },

  /**
   * Get min input value, offset by 2% of data extent.
   * @return {Float} Min input value
   */
  minCeil: function(){
    var data = this.props.data;
    return data.extent[0] + this.offset();
  },

  /**
   * Determine maximum value of the input based on neighboring theshold values.
   * @param  {Number} threshold Threshold for this group.
   * @return {Number}           Maximum value for group, or null of last group.
   */
  inputMax: function(threshold){
    var i = this.props.werk.axes.color.domain.indexOf(threshold);
    return i < this.props.werk.axes.color.domain.length - 1 ?
      this.props.werk.axes.color.domain[i+1] - this.offset()
      : this.maxCeil();
  },

  /**
   * Determine minimum value of the input based on neighboring theshold values.
   * @param  {Number} threshold Threshold for this group.
   * @return {Number}           Minimum value for group, or null of first group.
   */
  inputMin: function(threshold){
    var i = this.props.werk.axes.color.domain.indexOf(threshold);
    return i > 0 ?
      this.props.werk.axes.color.domain[i-1] + this.offset()
      : this.minCeil();
  },

  /**
   * Change a quantile threshold via input change.
   * @param  {Integer} i Index of threshold
   * @param  {Object} e event with target value
   * @return {void}
   */
  changeThreshold: function(i, e){
    var actions = this.props.actions,
        thresholds = this.props.werk.axes.color.domain;
    thresholds[i] = Number(e.target.value);
    this.setQuantizeDomain(thresholds);
  },

  /**
   * Change a quantile threshold via drag on viz.
   * @param  {Integer} i Index of threshold
   * @param  {Float} v New threshold value
   * @return {void}
   */
  dragThreshold: function(i,v){
    var actions = this.props.actions,
        thresholds = this.props.werk.axes.color.domain;
    thresholds[i] = Number(v);
    this.setQuantizeDomain(thresholds);
  },

  /**
   * Add quantile group, up to 8 groups.
   * @return {void}
   */
  addGroup: function(){
    var actions = this.props.actions,
        quantizeProps = this.props.werk.axes.color.quantizeProps;

    if(quantizeProps.groups >= 8){
      return;
    }
    var groups = quantizeProps.groups + 1;
    this.setQuantizeRange(groups);
    actions.setQuantizeGroups(groups);
  },

  /**
   * Remove quantile group, down to 2 groups.
   * @return {void}
   */
  removeGroup: function(){
    var actions = this.props.actions,
        quantizeProps = this.props.werk.axes.color.quantizeProps;

    if(quantizeProps.groups <= 2){
      return;
    }
    var groups = quantizeProps.groups - 1;
    this.setQuantizeRange(groups);
    actions.setQuantizeGroups(groups);
  },

  /**
   * Set groupings
   * @param  {String} transform A type of transform to do on groups
   * @return {void}
   */
  setGroups: function(transform){
    var actions = this.props.actions,
        quantizeProps = this.props.werk.axes.color.quantizeProps;

    switch(transform){
      case 'log':
        this.setQuantizeDomain(this.logGroups(quantizeProps.groups));
        break;
      case 'sqr':
        this.setQuantizeDomain(this.sqrGroups(quantizeProps.groups));
        break;
      case 'sqt':
        this.setQuantizeDomain(this.sqtGroups(quantizeProps.groups));
        break;
      case 'jnk':
        this.setQuantizeDomain(this.jnkGroups(quantizeProps.groups));
        break;
      default:
        this.setQuantizeDomain(this.equalGroups(quantizeProps.groups));
    };
    return ;
  },

  /**
   * Reverse the color range.
   * @return {void}
   */
  reverseColor: function(){
    var actions = this.props.actions,
        quantizeProps = this.props.werk.axes.color.quantizeProps;

    actions.setQuantizeReverse();

    actions.setQuantizeRange(
      this.equidistantColors(quantizeProps.groups)
    );
  },


  /**
   * Determine active/inactive button states.
   * @param  {String} type Type of input to check.
   * @return {String}      Disabled class or null.
   */
  activeButton: function(type){
    var classed,
        werk = this.props.werk,
        quantizeProps = werk.axes.color.quantizeProps;
    switch(type){
      case 'max':
        classed = quantizeProps.groups >= 8 ? "disabled" : null;
        break;
      case 'min':
        classed = quantizeProps.groups <= 2 ? "disabled" : null;
        break;
      case 'eql':
        classed = _.isEqual(werk.axes.color.domain, this.equalGroups(quantizeProps.groups)) ?
          "disabled": null;
        break;
      case 'sqr':
        classed = _.isEqual(werk.axes.color.domain, this.sqrGroups(quantizeProps.groups)) ?
          "disabled": null;
        break;
      case 'sqt':
        classed = _.isEqual(werk.axes.color.domain, this.sqtGroups(quantizeProps.groups)) ?
          "disabled": null;
        break;
      case 'log':
        var data = this.props.data;
        // Log scales also can't have a domain that spans 0.
        classed = _.isEqual(werk.axes.color.domain, this.logGroups(quantizeProps.groups)) ||
          ((data.extent[0] > 0 && data.extent[1] <= 0) ||
              (data.extent[0] < 0 && data.extent[1] >= 0)) ?
          "disabled": null;
        break;
      case 'jnk':
        classed = _.isEqual(werk.axes.color.domain, this.jnkGroups(quantizeProps.groups)) ?
          "disabled": null;
        break;
    }
    return classed;
  },

  /**
   * Remove quantize column (ie, ask user to pick data series again)
   * @return {void}
   */
  resetSeries: function(){
    this.props.actions.unsetQuantizeColumn();
  },

  render: function(){
    var werk = this.props.werk,
        thresholds = werk.axes.color.domain,
        quantizeProps = werk.axes.color.quantizeProps;

    var groupInputs = _.map(thresholds,function(n, i){
      return (
        <div key={i}>
          <input
            type="number"
            className="form-control"
            value={n}
            min={this.inputMin(n)}
            max={this.inputMax(n)}
            onChange={this.changeThreshold.bind(this, i)}
          />
        </div>
      );
    }.bind(this))

    var reSelectSeries = werk.datamap.series.length > 1 ?
        <i
          className="fa fa-times"
          title="Choose a different data series"
          onClick={this.resetSeries}
        ></i> : null;

    return (
        <div>
          <h4>
            Quantize thresholds <span className="column-label">
              {ellipsize(werk.axes.color.quantizeProps.column, 12)}
            </span> {reSelectSeries}
          </h4>
          <small>
            Add or remove quantize groups. While in most cases the default
            quantize thresholds should be used, you can adjust them in the
            boxes below or by dragging the threshold borders in the chart.
            The strokes above the chart represent the distribution of your data.
          </small>

          <QuantizerViz
            werk={werk}
            thresholds={thresholds}
            colorRange={this.equidistantColors(quantizeProps.groups)}
            dragThreshold={ this.dragThreshold }
          />
          <table>
            <tbody>
            <tr>
              <td>
                <ReactCSSTransitionGroup
                  transitionName="slide"
                  transitionEnterTimeout={250}
                  transitionLeaveTimeout={250}
                >
                  <h5>Thresholds</h5>
                  {groupInputs}
                </ReactCSSTransitionGroup>
              </td>
              <td>
                <div className="quantize-group-buttons clearfix">
                  <h5>Groups</h5>
                  <div onClick={this.addGroup} className={this.activeButton('max')}>
                    <i className="fa fa-plus" aria-hidden="true"></i>
                  </div>
                  <div onClick={this.removeGroup} className={this.activeButton('min')}>
                    <i className="fa fa-minus" aria-hidden="true"></i>
                  </div>
                  <div onClick={this.reverseColor}>Reverse</div>
                </div>
                <div className="quantize-group-buttons clearfix">
                  <h5>Calculate thresholds</h5>
                  <div
                    onClick={this.setGroups.bind(this,'eql')}
                    className={this.activeButton('eql')}
                  >Equal</div>
                  <div
                    onClick={this.setGroups.bind(this,'log')}
                    className={this.activeButton('log')}
                  >Log</div>
                  <div
                    onClick={this.setGroups.bind(this,'sqr')}
                    className={this.activeButton('sqr')}
                  >Squared</div>
                </div>
                <div className="quantize-group-buttons clearfix">
                  <div
                    onClick={this.setGroups.bind(this,'sqt')}
                    className={this.activeButton('sqt')}
                  >Square root</div>
                  <div
                    onClick={this.setGroups.bind(this,'jnk')}
                    className={this.activeButton('jnk')}
                  >Natural breaks</div>
                </div>
              </td>
            </tr>
            </tbody>
          </table>

        </div>
    );
  },

})
