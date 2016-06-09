import React from 'react';

import Margin from './../../components/layout/Margin.jsx';

const Layout = (props) => (
  <div role="tabpanel" className="tab-pane" id="layout">
    <Margin {...props} />
  </div>
);

Layout.propTypes = {
  actions: React.PropTypes.object,
  werk: React.PropTypes.object,
};

export default Layout;
