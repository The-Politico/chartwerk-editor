"use strict";
var React       = require('react');
var $           = require('jquery');
var Converter   = require("csvtojson").Converter;
var _           = require("underscore");
var tableify    = require('tableify');
var actions     = require('../../actions');


// Components
var DataSelect = require('./DataSelect.jsx');

module.exports = React.createClass({

    propTypes: {
        actions: React.PropTypes.object,
        werk: React.PropTypes.object
    },

    getInitialState: function() {

        return {
                format:'',
                valid: false
            };
    },

    handleDataChange: function(e){
        var data = e.target.value;

        var tsvConverter = new Converter({
            delimiter:'	' // tab-delimited
        });
        var csvConverter = new Converter({
            delimiter:',' // comma-delimited
        });

        /**
         * typeCheck - Checks type of data pasted by user
         * Checks in order: JSON, TSV, CSV
         *
         * @param  {str} data   User-pasted data as string.
         * @return {void}
         */
        function typeCheck(data){
            if(data == ''){
                this.setState(this.getInitialState());
                return;
            }
            // Try JSON data
            try{
                var jsonObj = JSON.parse(data);
                this.props.actions.attachData(jsonObj);
                this.setState({format: 'JSON', valid: true });
            } catch(e){
                // Try TSV
                if(data.indexOf('	') > -1){ // If tab in data...
                    tsvConverter.fromString(data);
                // CSV
                }else{
                    csvConverter.fromString(data);
                }
            }
        };


        /**
         * parse - Sets state from obj returned from converter
         *
         * @param  {str} format 'TSV' or 'CSV'
         * @param  {obj} jsonObj Obj returned by converter
         * @returns {void}
         */
        function parse(format, jsonObj){
            this.props.actions.attachData(jsonObj);
            this.setState({ format: format, valid: true });
        };

        csvConverter.on("end_parsed",parse.bind(this, 'CSV'));
        tsvConverter.on("end_parsed",parse.bind(this, 'TSV'));

        typeCheck.bind(this)(data);

    },


    render: function(){
        var success = !this.state.valid ? "" :
            (
                <div>
                <p className='parse-success'>
                    Successfully parsed {this.state.format} data
                    <button className='btn btn-sm'
                        data-toggle="modal"
                        data-target="#data-preview-modal"
                    >
                        Preview
                    </button>
                </p>
                <DataSelect werk={this.props.werk} actions={this.props.actions}/>
                </div>
            );

        // Can probably do this a more declarative way...
        $('#data-preview-modal .modal-body').html(tableify(this.props.werk.data));

        return (
            <div>
            <textarea
                rows="7"
                className="form-control"
                placeholder="Paste your data here with a header row."
                onChange={this.handleDataChange}
            ></textarea>
            {success}
            </div>
        )
    }
});
