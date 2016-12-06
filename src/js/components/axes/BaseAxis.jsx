import React from 'react';

import DateFormat from './DateFormat';
import NumericFormat from './NumericFormat';
import ShadedRegions from './ShadedRegions';

const BaseAxis = (props) => {
  const baseLabel = props.werk.ui.datamap.filter(d => d.class === 'base')[0].alias;

  if (!props.werk.datamap.base) {
    return (
      <div>
        <h4>Waiting for a {baseLabel} from the Data tab.</h4>
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

  const shadedOpts = props.werk.axes.base.type === 'categorical' ?
    null : (<ShadedRegions {...props} axis="base" />);

  return (
    <div>
      <h4>{baseLabel}: <span className="basename">{props.werk.datamap.base}</span></h4>
      {baseAxis}
      {shadedOpts}
      <hr />
    </div>
  );
};

BaseAxis.propTypes = {
  actions: React.PropTypes.object,
  werk: React.PropTypes.object,
};

export default BaseAxis;
