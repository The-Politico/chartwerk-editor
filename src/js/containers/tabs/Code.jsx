import React from 'react';

import Editor from './../../components/code/Editor';

const Code = (props) => (
  <div role="tabpanel" className="tab-pane" id="code">
    <img src={`${window.chartwerkConfig.static_prefix}img/icons/danger.png`}
      id="advanced-users" alt="feature for advanced users"
    />
    <Editor {...props} />
  </div>
);

Code.propTypes = {
  actions: React.PropTypes.object,
  werk: React.PropTypes.object,
};

export default Code;
