"use strict";
var React = require('react');

// Components
var DataTab = require('./Data.jsx');
var AxesTab = require('./Axes.jsx');
var LayoutTab = require('./Layout.jsx');
var CodeTab = require('./Code.jsx');


module.exports = React.createClass({
  propTypes: {
      actions: React.PropTypes.object,
      werk: React.PropTypes.object
  },

  render: function() {

    return (
      <div className="tab-content">
        <DataTab werk={this.props.werk} actions={this.props.actions} />
        <AxesTab werk={this.props.werk} actions={this.props.actions} />
        <LayoutTab werk={this.props.werk} actions={this.props.actions} />
        <CodeTab werk={this.props.werk} actions={this.props.actions} />
      </div>
    );
  }

});
