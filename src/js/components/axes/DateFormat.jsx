"use strict";
var React           = require('react');
var Select          = require('react-select');
var _               = require('lodash');
var moment          = require('moment');
// Add additional datetimes to constants/datetime.
var datetime        = require('../../constants/datetime');

module.exports = React.createClass({

  propTypes: {
      actions: React.PropTypes.object,
      werk: React.PropTypes.object
  },

  render: function(){
    var dateOptions = [
      { value: 'Y', label: 'Year'         },
      { value: 'y', label: 'Short year'   },
      { value: 'M', label: 'Month'        },
      { value: 'm', label: 'Short month'  },
      { value: 'W', label: 'Week'         },
      { value: 'w', label: 'Short week'   },
      { value: 'D', label: 'Date'         },
    ]

    return (
      <div>
        <div className="form-group">
          <label for="dateTickFormat-double">Format:</label>
          <Select
              name="dateTickFormat-double"
              options={dateOptions}
              searchable={false}
              placeholder="Tick format"
              clearable={false}
          />
        </div>
        <div className="form-group">
            <label for="dateTickFrequency-double">Frequency:</label>
            <input name="dateTickFrequency-double" type="number" className="form-control" />
        </div>
      </div>
    );

  }


});
