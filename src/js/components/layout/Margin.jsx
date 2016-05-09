"use strict";
var React           = require('react');
var MarginViz       = require('./MarginViz.jsx');

module.exports = React.createClass({

  propTypes: {
      actions: React.PropTypes.object,
      werk: React.PropTypes.object,
  },

  getInitialState: function(){
    return {
      mirrorOpts: true,
      activeOpts: 'single'
    }
  },

  /**
   * Enable independent double-column options.
   * @return {void}
   */
  enableOpts: function(){
    if(this.state.mirrorOpts){
      this.setState({mirrorOpts: false});
    }
  },

  /**
   * Switch between single and double-column opts.
   * @param  {String} size Ie, 'single' or 'double'
   * @return {void}
   */
  switchOpts: function(size){
    switch(size){
      case 'single':
        this.setState({
          activeOpts: 'single'
        })
        break;
      case 'double':
        this.setState({
          mirrorOpts: false,
          activeOpts: 'double'
        });
        break;
    }
  },

  /**
   * Determine whether size selector is active.
   * @param  {String} size Ie, 'single' or 'double'
   * @return {String}   Class names
   */
  activeClass: function(size){
    return size == this.state.activeOpts ? 'active' : null;
  },

  dragMargin: function(percent, margin){
    var actions = this.props.actions,
        activeOpts = this.state.activeOpts,
        mirrorOpts = this.state.mirrorOpts;
    switch(margin){
      case 'left':
        if(activeOpts === 'single' && mirrorOpts){
          actions.setMarginSingleLeft(percent);
          actions.setMarginDoubleLeft(percent);
        }else if(activeOpts === 'single'){
          actions.setMarginSingleLeft(percent);
        }else{
          actions.setMarginDoubleLeft(percent);
        }
        break;
      case 'right':
        if(activeOpts === 'single' && mirrorOpts){
          actions.setMarginSingleRight(percent);
          actions.setMarginDoubleRight(percent);
        }else if(activeOpts === 'single'){
          actions.setMarginSingleRight(percent);
        }else{
          actions.setMarginDoubleRight(percent);
        }
        break;
      case 'top':
        if(activeOpts === 'single' && mirrorOpts){
          actions.setMarginSingleTop(percent);
          actions.setMarginDoubleTop(percent);
        }else if(activeOpts === 'single'){
          actions.setMarginSingleTop(percent);
        }else{
          actions.setMarginDoubleTop(percent);
        }
        break;
      case 'bottom':
        if(activeOpts === 'single' && mirrorOpts){
          actions.setMarginSingleBottom(percent);
          actions.setMarginDoubleBottom(percent);
        }else if(activeOpts === 'single'){
          actions.setMarginSingleBottom(percent);
        }else{
          actions.setMarginDoubleBottom(percent);
        }
        break;
    }
  },

  render: function(){
    return (
      <div className="inline-exclusive-format clearfix">
        <h4>Margins</h4>
        <small>Drag the interior box below to adjust the margins around the chart
          until all text and chart elements are seen clearly. Margins for
          the single-column chart are used for the double-column chart by default.
          Click the double-column options to set margins independently.
        </small>
        <div className="form-group size-switch">
          <label>Size</label>
          <img
            onClick={this.switchOpts.bind(this,'single')}
            src="img/icons/singleColumn.png"
            title="Single column"
            className={this.activeClass('single')}
          />
          <img
            onClick={this.switchOpts.bind(this,'double')}
            src="img/icons/doubleColumn.png"
            title="Double column"
            className={this.activeClass('double')}
          />
        </div>
        <div>
          <MarginViz
            werk={this.props.werk}
            actions={this.props.actions}
            size={this.state.activeOpts}
            dragMargin={this.dragMargin}
          />
        </div>
      </div>
    );
  }
});
