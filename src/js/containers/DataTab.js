var React = require('react');
var bindActionCreators = require('redux').bindActionCreators;
var connect=require("react-redux").connect;
var DataInput = require('../components/data/DataInput.jsx');
var Actions = require('../actions/');

var DataTab = React.createClass({
  render: function() {

    var dispatch=this.props.dispatch;
    var werk=this.props.werk;
    var actions = bindActionCreators(Actions, dispatch);

    return (
      <div>
        <DataInput werk={werk} actions={actions} />
      </div>
    );
  },

});

function mapStateToProps(state) {
  return {
    werk: state
  };
}


module.exports = connect(mapStateToProps)(DataTab);
