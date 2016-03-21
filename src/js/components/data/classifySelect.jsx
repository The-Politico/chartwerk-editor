var React = require('react');
var ReactDOM = require('react-dom');
var Select = require('react-select');





module.exports = React.createClass({

    getInitialState: function() {
        return {
            value:'',
            options: this.props.options
        };
    },

    render: function(){

        function changeValue(value){
            this.setState({value:value});
            this.props.onChange(value);
        }


        return (
            <tr>
            <td className="column-label">{this.props.column}</td>
            <td>
            <Select
                name={this.props.column}
                value={this.state.value}
                options={this.props.options}
                onChange={changeValue.bind(this)}
                searchable={false}
                placeholder="Choose one"
            />
            </td>
            </tr>
        )
    }
});
