"use strict";
var React = require('react');
// Components
var Editor = require('./../../components/code/Editor.jsx');


module.exports = React.createClass({

  propTypes: {
      actions: React.PropTypes.object,
      werk: React.PropTypes.object
  },

  render: function() {

    return (
      <div role="tabpanel" className="tab-pane" id="code">
        <Editor {...this.props} />
      </div>
    );
  },

});
