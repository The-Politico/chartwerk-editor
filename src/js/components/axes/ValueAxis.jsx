import React from 'react';

import NumericFormat from './NumericFormat.jsx';
import ShadedRegions from './ShadedRegions';

const ValueAxis = (props) => {
  if (props.werk.datamap.series < 1 &&
    !props.werk.datamap.value) {
    return (
      <div>
        <h4>No value axis or data series selected on the Data tab.</h4>
        <hr />
      </div>
    );
  }

  return (
    <div>
      <h4>Value axis</h4>
      <NumericFormat {...props} type="value" />
      <ShadedRegions {...props} axis="value" />
      <hr />
    </div>
  );
};

ValueAxis.propTypes = {
  actions: React.PropTypes.object,
  werk: React.PropTypes.object,
};

export default ValueAxis;
