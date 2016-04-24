"use strict";
var React           = require('react');
var Select          = require('react-select');
var actionCreators  = require('../../actions');
var _               = require('lodash');
var moment          = require('moment');
// Add additional datetimes to constants/datetime.
var datetime        = require('../../constants/datetime');

module.exports = React.createClass({

  propTypes: {
      actions: React.PropTypes.object,
      werk: React.PropTypes.object
  },

  getInitialState: function(){
    var werk = this.props.werk,
        base = werk.datamap.base;

    /**
     * Sniff data type of first data object's base property.
     * @return {String} The data type sniffed
     */
    function typeSniffer(){
      if(
        moment(
          werk.data[0][base],
          _.map(datetime, 'moment'), // An array of datetime formats
          true
        ).isValid()
      ){
        return 'date';
      }
      else if(
        typeof werk.data[0][base] === 'number'
      ){
        return 'numerical';
      }
      else {
        return 'categorical';
      }
    }

    return {
      type: typeSniffer.bind(this)()
    };
  },

  componentDidMount: function(){

    this.props.actions.setBaseType(
      this.state.type
    );

    if(this.state.type == 'date'){
      this.setDateFormat();
    }
  },


  /**
   * Sniff for date format using moment.js.
   * @return {Integer} Index of object in datetime array.
   */
  dateSniffer: function(){
    if(this.state.type != 'date'){
      return null;
    }

    var werk = this.props.werk,
        base = werk.datamap.base,
        valid = false,
        i = 0,
        momentFormats = _.map(datetime, 'moment');

    /**
     * Check that datetime format parses all row-wise data.
     * @param  {string} format  A moment.js datetime format.
     * @return {Integer}        If dateformat parses all data,
     *                             the index of the datetime
     *                             object.
     */
    function rowCheck(format){
      var valid = true,
          i = 0;
      while(valid && i< this.props.werk.data.length){
        valid = moment(
          this.props.werk.data[i][base],
          format,
          true
        ).isValid();
        i++;
      }
      return valid;
    }

    while(!valid && i <= momentFormats.length){
      valid = rowCheck.bind(this)(momentFormats[i]);
      i = valid ? i : i + 1;
    };

    return valid ? i : null;
  },

  /**
   * Pass d3-friendly date format string back to state tree.
   */
  setDateFormat: function(){
    var i = this.dateSniffer();
    this.props.actions.setDateFormat(
      _.map(datetime, 'd3')[i]
    );
  },

  changeType: function(e){
        this.props.actions.setBaseType(e.value);
        this.setState({type: e.value});
        if(e.value == 'date'){
          this.setDateFormat();
        }else{
          this.props.actions.unsetDateFormat();
        }
  },

  render: function(){

    var typeOptions = [
      { value: 'categorical', label: 'Categorical' },
      { value: 'numerical', label: 'Numerical' },
      { value: 'date', label: 'Date' }
    ];

    var i = null; // Index for datetime array
    if(this.state.type == 'date'){
      i = this.dateSniffer();
    }

    /**
     * If dateSniffer returned a valid datetime format, ie, the index
     * of a datetime object, add humanized label. If it didn't but date
     * format was picked, add parse error. Otherwise, null.
     */
    var dateLabel = i ?
        ( <div className="dateformat">
            Format: {_.map(datetime, 'human')[i]}
          </div>
        )
      : this.state.type == 'date' ?
        (
          <div className="dateformat error">
            Date parse error!
          </div>
        )
      : null;

    return (
      <div className='base-type'>
      <Select
        name='base'
        value={this.state.type}
        options={typeOptions}
        searchable={false}
        onChange={this.changeType}
        placeholder="What data type?"
        clearable={false}
      />
      {dateLabel}
      </div>
    );

  }

})
