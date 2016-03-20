var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');


var DataInput = React.createClass({

    getInitialState: function() {
        return {data: '', format:''};
    },

    handleDataChange: function(e){

        var data = e.target.value;
        var Converter = require("csvtojson").Converter;
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
         * @param  {type} data User-pasted data
         */
        function typeCheck(data){
            // Try JSON data
            try{
                this.setState({data: JSON.parse(data), format: 'JSON data' });
            } catch(e){
                // Try TSV
                if(data.indexOf('	') > -1){ // If tab in data...
                    this.setState({format:'Tab-separated data'});
                    tsvConverter.fromString(data);
                // CSV
                }else{
                    this.setState({format:'Comma-separated data'});
                    csvConverter.fromString(data);
                }
            }
        };

        typeCheck.bind(this)(data);


        /**
         * parse - Sets state from obj returned from converter
         *
         * @param  {type} jsonObj Obj returned by TSV or CSV converter
         */
        function parse(jsonObj){
            this.setState({data: jsonObj});
        }

        csvConverter.on("end_parsed",parse.bind(this));
        tsvConverter.on("end_parsed",parse.bind(this));

    },

    componentWillUpdate: function(nextProps, nextState){
            console.log(nextState);
    },

    render: function(){
        var format = this.state.format;

        return (
            <div>
            <textarea
                rows="7"
                className="form-control"
                placeholder="Paste data here"
                onChange={this.handleDataChange}
            ></textarea>
            <p className="format-confirm">{format}</p>
            </div>
        )
    }
});


ReactDOM.render(
    <DataInput/>,
    document.getElementById('data-input')
);
