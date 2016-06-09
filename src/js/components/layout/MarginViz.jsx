import React from 'react';
import ReactDOM from 'react-dom';
import viz from './MarginViz-d3';
import _ from 'lodash';


export default React.createClass({

  propTypes: {
    actions: React.PropTypes.object,
    werk: React.PropTypes.object,
    dragMargin: React.PropTypes.func,
    size: React.PropTypes.string,
  },


  /**
   * Gets data needed for d3 scales
   * @return {Object} Margins
   */
  getChartState() {
    const werk = this.props.werk;
    return this.props.size === 'single' ?
      {
        top: werk.margins.single.top,
        right: werk.margins.single.right,
        bottom: werk.margins.single.bottom,
        left: werk.margins.single.left,
        width: 200,
        height: 120,
      } :
      {
        top: werk.margins.double.top,
        right: werk.margins.double.right,
        bottom: werk.margins.double.bottom,
        left: werk.margins.double.left,
        width: 200,
        height: 120,
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
      this.getChartState(),
      this
    );
  },


  dragMargin: _.throttle(function(percent, margin){ // eslint-disable-line
    this.props.dragMargin(parseFloat(percent), margin);
  }, 100),

  render() {
    return (
      <div id="margin-viz"></div>
    );
  },
});
