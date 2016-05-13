"use strict";
var React = require('react');


module.exports = React.createClass({

  propTypes: {
      actions: React.PropTypes.object,
      werk: React.PropTypes.object
  },

  getInitialState: function(){
    return {
      single: true
    }
  },

  changeSize: function(size){
    this.setState({
      single: size === 'single' ? true : false
    });
  },

  getChecked: function(size){
    if(size === 'single'){
      return this.state.single;
    }else{
      return !this.state.single;
    }
  },

  render: function() {
    return (
      <div className="switch-toggle preview-view-toggle">
          <input id="size-mobile" className="rebuild" name="size-select" type="radio" checked={this.getChecked('single')} />
          <label for="size-mobile" onClick={this.changeSize.bind(this,'single')}>Single Column</label>
          <input id="size-desktop" className="rebuild" name="size-select" type="radio" checked={this.getChecked('double')} />
          <label for="size-desktop" onClick={this.changeSize.bind(this,'double')}>Double Column</label>
          <a></a>
      </div>
    );
  }
});
