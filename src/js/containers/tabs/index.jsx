"use strict";
var React = require('react');

// Components
var DataTab = require('./Data.jsx');
var AxesTab = require('./Axes.jsx');
var LayoutTab = require('./Layout.jsx');
var TextTab = require('./Text.jsx');
var AnnotationsTab = require('./Annotations.jsx');
var CodeTab = require('./Code.jsx');


module.exports = React.createClass({
  propTypes: {
      actions: React.PropTypes.object,
      werk: React.PropTypes.object
  },

  render: function() {

    return (
      <div className="tab-content">
        <DataTab {...this.props} />
        <AxesTab {...this.props} />
        <LayoutTab {...this.props} />
        <TextTab {...this.props} />
        <AnnotationsTab {...this.props} />
        <CodeTab {...this.props} />
      </div>
    );
  }

});
