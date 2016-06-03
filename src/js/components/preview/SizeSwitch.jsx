"use strict";
var React = require('react');


module.exports = React.createClass({

  propTypes: {
      actions: React.PropTypes.object,
      werk: React.PropTypes.object
  },

  changeSize: function(size){
    var actions = this.props.actions;
    actions.changePreview(size);
  },

  getChecked: function(size){
    return size === this.props.werk.ui.size ?
      true : false;
  },

  render: function() {
    return (
      <div className="switch-toggle preview-view-toggle">
          <input id="size-mobile" className="rebuild" name="size-select" type="radio" checked={this.getChecked('single')} />
          <label for="size-mobile" onClick={() => this.changeSize('single')}>Single Column</label>
          <input id="size-desktop" className="rebuild" name="size-select" type="radio" checked={this.getChecked('double')} />
          <label for="size-desktop" onClick={() => this.changeSize('double')}>Double Column</label>
          <a></a>
      </div>
    );
  }
});
