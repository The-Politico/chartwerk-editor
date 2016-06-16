import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Actions from './../actions/';

import Editor from './panes/Editor.jsx';
import Preview from './panes/Preview.jsx';

const App = (props) => {
  const actions = bindActionCreators(Actions, props.dispatch);
  return (
    <div className="clearfix">
      <Preview werk={props.werk} actions={actions} />
      <Editor werk={props.werk} actions={actions} />
    </div>
  );
};

App.propTypes = {
  dispatch: React.PropTypes.object,
  actions: React.PropTypes.object,
  werk: React.PropTypes.object,
};

const mapStateToProps = state => ({
  werk: state,
});

export default connect(mapStateToProps)(App);
