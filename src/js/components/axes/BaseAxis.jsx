import React from 'react';

import DateFormat from './DateFormat.jsx';
import NumericFormat from './NumericFormat.jsx';

const BaseAxis = (props) => {
  if (!props.werk.datamap.base) {
    return (
      <div>
        <h4>Waiting for a base axis from the Data tab.</h4>
        <hr />
      </div>
    );
  }

  let baseAxis = null;

  switch (props.werk.axes.base.type) {
    case 'categorical':
      break;
    case 'date':
      baseAxis = (
        <DateFormat
          werk={props.werk}
          actions={props.actions}
        />
      );
      break;
    case 'numerical':
      baseAxis = (
        <NumericFormat
          werk={props.werk}
          actions={props.actions}
          type="base"
        />
      );
      break;
    default:
      break;
  }


  return (
    <div>
      <h4>Base axis: <span className="basename">{props.werk.datamap.base}</span></h4>
      {baseAxis}
      <hr />
    </div>
  );
};

BaseAxis.propTypes = {
  actions: React.PropTypes.object,
  werk: React.PropTypes.object,
};

export default BaseAxis;
