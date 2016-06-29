import React from 'react';

import Inputs from './../../components/text/Inputs';


const Text = (props) => (
  <div role="tabpanel" className="tab-pane" id="text">
    <Inputs {...props} />
  </div>
);

Text.propTypes = {
  actions: React.PropTypes.object,
  werk: React.PropTypes.object,
};

export default Text;
