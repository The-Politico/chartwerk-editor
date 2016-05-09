"use strict";
var React           = require('react');
var ReactDOM        = require('react-dom');
var viz             = require('./MarginViz-d3');


module.exports = React.createClass({

  propTypes: {
      actions: React.PropTypes.object,
      werk: React.PropTypes.object
  },

  getInitialState: function(){
    return {

    };
  },

  /**
   * Gets data needed for d3 scales
   * @return {Object} Margins
   */
  getChartState: function() {
    var werk = this.props.werk;
    return this.props.size === 'single' ?
        {
          top: werk.margins.single.top,
          right: werk.margins.single.right,
          bottom: werk.margins.single.bottom,
          left: werk.margins.single.left,
          width: 200,
          height: 120
        } :
        {
          top: werk.margins.double.top,
          right: werk.margins.double.right,
          bottom: werk.margins.double.bottom,
          left: werk.margins.double.left,
          width: 200,
          height: 120
        };
  },

  /**
   * After first render, chart SVG els for chart.
   * @return {void}
   */
  componentDidMount: function(){
    var el = ReactDOM.findDOMNode(this);
    viz.create(
      el,
      this.getChartState(),
      this
    )
  },

  /**
   * On subsequent renders, update SVG els.
   * @return {void}
   */
  componentDidUpdate: function(){
      var el = ReactDOM.findDOMNode(this);
      viz.update(
        el,
        this.getChartState(),
        this
      );
  },


  dragMargin: _.throttle(function(percent, margin){
    this.props.dragMargin(parseFloat(percent),margin);
  }, 100),

  render: function(){
    return (
      <div id="margin-viz"></div>
    );
  }
});
