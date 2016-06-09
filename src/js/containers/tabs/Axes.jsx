import React from 'react';

import BaseAxis from '../../components/axes/BaseAxis.jsx';
import ValueAxis from '../../components/axes/ValueAxis.jsx';

const Axes = (props) => (
  <div role="tabpanel" className="tab-pane" id="axes">
    <BaseAxis {...props} />
    <ValueAxis {...props} />
  </div>
);

Axes.propTypes = {
  actions: React.PropTypes.object,
  werk: React.PropTypes.object,
};

export default Axes;
