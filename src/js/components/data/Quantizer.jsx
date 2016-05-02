"use strict";
var React           = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var _               = require('lodash');
var d3              = require('d3');
var chroma          = require('chroma-js');
var colors          = require('../../constants/colors');
var ellipsize       = require('ellipsize');

var QuantizerViz    = require('./QuantizerViz.jsx');

module.exports = React.createClass({

  getInitialState: function(){
    return {
      groups: 4,
      thresholds: this.equalGroups(4)
    }
  },

  /**
   * Set initial state tree
   * @return {void}
   */
  componentDidMount: function(){
    this.setQuantizeDomain(this.state.thresholds);
    this.setQuantizeRange(this.state.groups);
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
   * [function description]
   * @param  {Number} groups Number of quantize groups
   * @return {Array}        Array of thresholds of length groups - 1.
   */
  equalGroups: function(groups){
    // Consider implementing other quantize methods, e.g. chroma-js
    // k-means, log, etc.
    // https://github.com/gka/chroma.js/blob/f1b7ca5cc4156f7d766e45e13ed6496c7b8ff7da/src/limits.coffee#L46-L168

    var werk = this.props.werk,
        series = _.map(werk.data,werk.datamap.series[0]),
        extent = d3.extent(series),
        range = extent[1] - extent[0],
        band = range / groups;

    return _.map(new Array( groups - 1 ), function(k,i){
          return parseFloat((extent[0] + (band * (i+1))).toPrecision(2))
        });
  },

  /**
   * Creates a color range of equidistant hues from lightest and darkest
   * color in scheme.
   * @param  {Number} groups Number of quantize groups.
   * @return {Array}        Array of hex colors interpolated for each
   *                        quantize group.
   */
  equidistantColors: function(groups){
    var color = this.props.werk.axes.color,
        scheme = _.get(colors, color.scheme),
        minHex = scheme[0],
        maxHex = scheme[scheme.length-1];

    /**
     * Diverging schemes should define a midpoint in chroma scale
     */
    if(color.scheme.slice(0,1) === 'd'){

      /**
       * If scheme has even number of members, take a midpoint interpolated
       * between the two middle colors. Otherwise take the middle color.
       */
      if(scheme.length % 2 == 0){
        var midHex = chroma.scale([
          scheme[scheme.length / 2],
          scheme[(scheme.length / 2) - 1]
        ]).mode('lab')(0.5).hex();
      }else{
        var midHex = scheme[Math.floor(scheme.length / 2)];
      }

      var scale = chroma.scale([minHex, midHex, maxHex]).classes(groups).colors();

    }else{
      var scale = chroma.scale([minHex, maxHex]).classes(groups).colors();
    }

    return scale;
  },

  /**
   * Return 2% offset, which serves as min size of group.
   * @return {Float} 2% offset
   */
  offset: function(){
    var werk = this.props.werk,
        series = _.map(werk.data,werk.datamap.series[0]),
        extent = d3.extent(series);
    return (extent[1] - extent[0]) * 0.02 // 2% offset minimum
  },

  /**
   * Get max input value, offset by 2% of data extent.
   * @return {Float} Max input value
   */
  maxCeil: function(){
    var werk = this.props.werk,
        series = _.map(werk.data,werk.datamap.series[0]),
        extent = d3.extent(series),
        offset = (extent[1] - extent[0]) * 0.02;
    return extent[1] - offset;
  },

  /**
   * Get min input value, offset by 2% of data extent.
   * @return {Float} Min input value
   */
  minCeil: function(){
    var werk = this.props.werk,
        series = _.map(werk.data,werk.datamap.series[0]),
        extent = d3.extent(series),
        offset = (extent[1] - extent[0]) * 0.02;
    return extent[0] + offset;
  },

  /**
   * Determine maximum value of the input based on neighboring theshold values.
   * @param  {Number} threshold Threshold for this group.
   * @return {Number}           Maximum value for group, or null of last group.
   */
  inputMax: function(threshold){
    var i = this.state.thresholds.indexOf(threshold);
    return i < this.state.thresholds.length - 1 ?
      this.state.thresholds[i+1] - this.offset()
      : this.maxCeil();
  },

  /**
   * Determine minimum value of the input based on neighboring theshold values.
   * @param  {Number} threshold Threshold for this group.
   * @return {Number}           Minimum value for group, or null of first group.
   */
  inputMin: function(threshold){
    var i = this.state.thresholds.indexOf(threshold);
    return i > 0 ?
      this.state.thresholds[i-1] + this.offset()
      : this.minCeil();
  },

  /**
   * Change a quantile threshold via input change.
   * @param  {Integer} i Index of threshold
   * @param  {Object} e event with target value
   * @return {void}
   */
  changeThreshold: function(i, e){
    var thresholds = this.state.thresholds;
    thresholds[i] = Number(e.target.value);
    this.setState({thresholds: thresholds});
    this.setQuantizeDomain(thresholds);
  },

  /**
   * Change a quantile threshold via drag on viz.
   * @param  {Integer} i Index of threshold
   * @param  {Float} v New threshold value
   * @return {void}
   */
  dragThreshold: function(i,v){
    var thresholds = this.state.thresholds;
    thresholds[i] = Number(v);
    this.setState({thresholds: thresholds});
    this.setQuantizeDomain(thresholds);
  },

  /**
   * Add quantile group, up to 8 groups.
   * @return {void}
   */
  addGroup: function(){
    if(this.state.groups >= 8){
      return;
    }
    this.setQuantizeRange(this.state.groups + 1);
    this.setState({
      groups: this.state.groups + 1,
      thresholds: this.equalGroups(this.state.groups + 1)
    });

  },

  /**
   * Remove quantile group, down to 2 groups.
   * @return {void}
   */
  removeGroup: function(){
    if(this.state.groups<=2){
      return;
    }
    this.setQuantizeRange(this.state.groups - 1);
    this.setState({
      groups: this.state.groups - 1,
      thresholds: this.equalGroups(this.state.groups - 1)
    });

  },

  /**
   * Reset to equidistant quantile thresholds.
   * @return {void}
   */
  resetGroups: function(){
    this.setState({
      thresholds: this.equalGroups(this.state.groups)
    });
    this.setQuantizeDomain(this.equalGroups(this.state.groups));
  },

  /**
   * Utility to determine active/inactive button state.
   * @param  {String} type Type of input to check.
   * @return {String}      Disabled class or null.
   */
  activeButton: function(type){
    if(type === 'max'){
      return this.state.groups >= 8 ? "disabled" : null;
    } else if(type === 'min'){
      return this.state.groups <= 2 ? "disabled" : null;
    }else if(type === 'reset'){
      return _.isEqual(this.state.thresholds, this.equalGroups(this.state.groups)) ?
        "disabled" : null;
    }
    return null;
  },

  render: function(){
    var thresholds = this.state.thresholds;
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

    return (
        <div>
          
          <h4>
            Quantize thresholds <span className="column-label">
              {ellipsize(this.props.werk.datamap.series[0],12)}
            </span>
          </h4>
          <small>
            Add or remove quantize groups. While in most cases the default
            quantize thresholds should be used, you can adjust them in the
            boxes below or by dragging the threshold borders in the chart.
            The strokes above the chart represent the distribution of your data.
          </small>

          <QuantizerViz
            werk={this.props.werk}
            thresholds={this.state.thresholds}
            colorRange={this.equidistantColors(this.state.groups)}
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
                  {groupInputs}
                </ReactCSSTransitionGroup>
              </td>
              <td>
                <div className="quantize-group-buttons clearfix">
                  <div onClick={this.addGroup} className={this.activeButton('max')}>
                    <i className="fa fa-plus" aria-hidden="true"></i>
                  </div>
                  <div onClick={this.removeGroup} className={this.activeButton('min')}>
                    <i className="fa fa-minus" aria-hidden="true"></i>
                  </div>
                  <div onClick={this.resetGroups} className={this.activeButton('reset')}>Reset</div>
                </div>
              </td>
            </tr>
            </tbody>
          </table>

        </div>
    );
  },

})
