var React       = require('react');
var ReactDOM    = require('react-dom');
var $           = require('jquery');
var Converter   = require("csvtojson").Converter;
var _           = require("underscore");
var tableify    = require('tableify');

// Components
var ClassifySelects = require('./classifySelects.jsx')

var DataInput = React.createClass({

    getInitialState: function() {
        return {
                data: '',
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
         * @param  {str} data User-pasted data as string.
         */
        function typeCheck(data){
            if(data == ''){
                this.setState(this.getInitialState());
                return;
            }
            // Try JSON data
            try{
                this.setState({data: JSON.parse(data), format: 'JSON', valid: true });
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
         */
        function parse(format, jsonObj){
            this.setState({ data: jsonObj, format: format, valid: true });
        };

        csvConverter.on("end_parsed",parse.bind(this, 'CSV'));
        tsvConverter.on("end_parsed",parse.bind(this, 'TSV'));

        typeCheck.bind(this)(data);
    },

    componentWillUpdate: function(nextProps, nextState){

    },



    render: function(){
        var columns = _.keys(this.state.data[0]);
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
                <ClassifySelects columns={columns} />
                </div>
            );

        // Can probably do this a more declarative way...
        $('#data-preview-modal .modal-body').html(tableify(this.state.data));

        return (
            <div>
            <textarea
                rows="7"
                className="form-control"
                placeholder="Paste data here with header row."
                onChange={this.handleDataChange}
            ></textarea>
            {success}
            </div>
        )
    }
});


ReactDOM.render(
    <DataInput/>,
    document.getElementById('data-input')
);
