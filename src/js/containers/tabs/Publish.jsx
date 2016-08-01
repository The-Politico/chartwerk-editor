import React from 'react';

import Publish from './../../components/publish/Publish';

const PublishTab = (props) => (
  <div role="tabpanel" className="tab-pane" id="publish">
    <Publish {...props} />
  </div>
);

PublishTab.propTypes = {
  actions: React.PropTypes.object,
  werk: React.PropTypes.object,
};

export default PublishTab;
