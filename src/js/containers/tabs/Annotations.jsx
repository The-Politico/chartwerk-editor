"use strict";
var React = require('react');
// Components



module.exports = React.createClass({

  propTypes: {
      actions: React.PropTypes.object,
      werk: React.PropTypes.object
  },

  render: function() {

    return (
      <div role="tabpanel" className="tab-pane" id="annotations">
        <h1>Annotations</h1>
      </div>
    );
  },

});
