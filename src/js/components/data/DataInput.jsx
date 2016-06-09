import React from 'react';
import $ from 'jquery';
import { Converter } from 'csvtojson';
import tableify from 'tableify';

import DataSelect from './DataSelect.jsx';

export default React.createClass({

  propTypes: {
    actions: React.PropTypes.object,
    werk: React.PropTypes.object,
  },

  getInitialState() {
    return {
      format: null,
    };
  },


  handleDataChange(e) {
    const data = e.target.value;
    const actions = this.props.actions;

    actions.setRawData(data);

    const tsvConverter = new Converter({
      delimiter: '	', // tab-delimited
    });
    const csvConverter = new Converter({
      delimiter: ',', // comma-delimited
    });

    /**
     * typeCheck - Checks type of data pasted by user
     * Checks in order: JSON, TSV, CSV
     *
     * @param  {str} data   User-pasted data as string.
     * @return {void}
     */
    function typeCheck(localData) {
      if (localData === '') {
        this.setState(this.getInitialState());
        return;
      }
      // Try JSON data
      try {
        const jsonObj = JSON.parse(localData);
        actions.attachData(jsonObj);
        this.setState({ format: 'JSON' });
      } catch (error) {
        // Try TSV
        if (localData.indexOf('	') > -1) { // If tab in data...
          tsvConverter.fromString(localData);
        // CSV
        } else {
          csvConverter.fromString(localData);
        }
      }
    }


    /**
     * parse - Sets state from obj returned from converter
     *
     * @param  {str} format 'TSV' or 'CSV'
     * @param  {obj} jsonObj Obj returned by converter
     * @returns {void}
     */
    function parse(format, jsonObj) {
      actions.attachData(jsonObj);
      this.setState({ format });
    }

    csvConverter.on('end_parsed', parse.bind(this, 'CSV'));
    tsvConverter.on('end_parsed', parse.bind(this, 'TSV'));

    typeCheck.bind(this)(data);
  },

  render() {
    const success = this.props.werk.data.length < 1 ? '' :
        (<div>
          <p className="parse-success">
            Successfully parsed {this.state.format} data
            <button className="btn btn-sm"
              data-toggle="modal"
              data-target="#data-preview-modal"
            >
                Preview
            </button>
          </p>
          <DataSelect werk={this.props.werk} actions={this.props.actions} />
        </div>);

      // Can probably do this a more declarative way...
    $('#data-preview-modal .modal-body').html(tableify(this.props.werk.data));

    return (
      <div>
        <textarea
          rows="7"
          className="form-control"
          placeholder="Paste your data here with a header row."
          value={this.props.werk.ui.rawData}
          onChange={this.handleDataChange}
        ></textarea>
        {success}
      </div>
    );
  },
});
