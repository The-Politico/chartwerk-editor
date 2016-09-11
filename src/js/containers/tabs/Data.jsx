import React from 'react';

import DataInput from '../../components/data/DataInput';

const Data = (props) => (
  <div role="tabpanel" className="tab-pane active clearfix" id="data">
    <h4>
      Paste <b>clean</b> data
    </h4>

    <img src={`${window.chartwerkConfig.static_prefix}img/icons/disallowed.png`} alt="disallowed" />
    <small>
      No commas, currency symbols, percent signs or
      other textual notations on numbers. Your data <b>must</b> have a header row.
    </small>

    <DataInput {...props} />
  </div>
);

Data.propTypes = {
  actions: React.PropTypes.object,
  werk: React.PropTypes.object,
};

export default Data;
