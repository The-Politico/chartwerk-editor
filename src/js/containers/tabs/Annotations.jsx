import React from 'react';

import Editor from './../../components/annotations/Editor';

const Annotations = (props) => (
  <div role="tabpanel" className="tab-pane" id="annotations">
    <Editor {...props} />
  </div>
);

Annotations.propTypes = {
  actions: React.PropTypes.object,
  werk: React.PropTypes.object,
};

export default Annotations;
