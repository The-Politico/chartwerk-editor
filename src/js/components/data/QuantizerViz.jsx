import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import viz from './QuantizerViz-d3';


export default React.createClass({

  propTypes: {
    werk: React.PropTypes.object,
    thresholds: React.PropTypes.array,
    colorRange: React.PropTypes.array,
    dragThreshold: React.PropTypes.func,
  },


  getInitialState() {
    return {
      chartProps: {
        margin: {
          top: 30,
          right: 10,
          bottom: 10,
          left: 10,
        },
        width: 450,
        height: 60,
      },
    };
  },

  /**
   * Gets data needed for d3 scales
   * @return {Object} Data array, thresholds array (including min value)
   *                       and color range array
   */
  getChartState() {
    const data = _.map(
      this.props.werk.data,
      this.props.werk.axes.color.quantizeProps.column
    );

    const dataMin = _.min(data);

    return {
      data,
      thresholds: [dataMin].concat(this.props.thresholds),
      colorRange: this.props.colorRange,
    };
  },

  /**
   * After first render, chart SVG els for chart.
   * @return {void}
   */
  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);
    viz.create(
      el,
      this.state.chartProps,
      this.getChartState(),
      this
    );
  },

  /**
   * On subsequent renders, update SVG els.
   * @return {void}
   */
  componentDidUpdate() {
    const el = ReactDOM.findDOMNode(this);
    viz.update(
      el,
      this.state.chartProps,
      this.getChartState(),
      this
    );
  },

  /**
   * Change a quantile threshold via drag on viz.
   * Passed up to parent component.
   * @param  {Integer} i Index of threshold
   * @param  {Float} v New threshold value
   * @return {void}
   */
  dragThreshold: _.debounce(
    function(i, v){ // eslint-disable-line
      this.props.dragThreshold(i, v);
    }, 100
  ),

  /**
   * Renders SVG container.
   * @return {JSX} Chart container.
   */
  render() {
    return (
      <div id="quantize-viz"></div>
    );
  },

});
