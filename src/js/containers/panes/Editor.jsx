"use strict";
var React = require('react');

var Tabs = require('./../tabs/index.jsx');
var Nav = require('./../tabs/Nav.jsx');

module.exports = React.createClass({
  propTypes: {
      actions: React.PropTypes.object,
      werk: React.PropTypes.object,
  },

  render: function() {
    return (
      <div id="editor-pane" className="clearfix" role="tabpanel">
        <Nav />
        <Tabs werk={this.props.werk} actions={this.props.actions} />
      </div>
    );
  }
});
