"use strict";
var React = require('react');
// Components
var Margin = require('./../../components/layout/Margin.jsx');


module.exports = React.createClass({

  propTypes: {
      actions: React.PropTypes.object,
      werk: React.PropTypes.object
  },

  render: function() {

    return (
      <div role="tabpanel" className="tab-pane" id="layout">
        <Margin {...this.props} />
      </div>
    );
  },

});
