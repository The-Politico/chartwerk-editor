import React from 'react';

import BaseAxis from '../../components/axes/BaseAxis';
import ValueAxis from '../../components/axes/ValueAxis';
import ScaleAxis from '../../components/axes/ScaleAxis';

const Axes = (props) => (
  <div role="tabpanel" className="tab-pane" id="axes">
    <BaseAxis {...props} />
    <ValueAxis {...props} />
    <ScaleAxis {...props} />
  </div>
);

Axes.propTypes = {
  actions: React.PropTypes.object,
  werk: React.PropTypes.object,
};

export default Axes;
