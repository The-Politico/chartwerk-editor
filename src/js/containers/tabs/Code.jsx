import React from 'react';

import Editor from './../../components/code/Editor.jsx';

const Code = (props) => (
  <div role="tabpanel" className="tab-pane" id="code">
    <Editor {...props} />
  </div>
);

Code.propTypes = {
  actions: React.PropTypes.object,
  werk: React.PropTypes.object,
};

export default Code;
