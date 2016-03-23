var React = require('react');
var ReactDOM = require('react-dom');
var Select = require('react-select');
var _ = require('underscore');


module.exports = React.createClass({

    /**
     * Creates an array of nulls, one for each select component
     */
    getInitialState: function(){
        return {
            'selections': this.props.columns.map(function(column){ return null; }),
        };

    },

    /**
     * Select component options, condition for base and group classifications.
     */
    setOptions: function(){

        var opts = [
                { value: 'base', label: 'Base axis', disabled: false },
                { value: 'series', label: 'Data series' },
                { value: 'group', label: 'Grouping column', disabled: false },
                { value: 'annotation', label: 'Annotation column' },
                { value: 'ignore', label: 'Ignore column' }
            ];

        opts[0].disabled = _.contains(this.state.selections,'base') ? true : false;
        opts[2].disabled = _.contains(this.state.selections,'group') ? true : false;

        return opts;

    },

    /**
     * Changes value of Select component via setState
     * @param  {integer} i Index of Select component
     * @param  {string} v Value selected
     */
    changeValue: function(i, v){
        this.state.selections[i] = v.value;
        this.setState(this.state);
    },

    render: function(){

        var classifySelects = this.props.columns.map(function(column, i) {

            return (
                <tr key={i}>
                <td className="column-label">{column}</td>
                <td>
                <Select
                    name={column}
                    value={this.state.selections[i]}
                    options={this.setOptions()}
                    onChange={this.changeValue.bind(this,i)}
                    searchable={false}
                    placeholder="Choose one"
                    clearable={false}
                />
                </td>
                </tr>
            );
        }.bind(this));


        return (
            <div id="classify-container">
                <h4>Classify and color columns in your data&nbsp; 
                    <span className="glyphicon glyphicon-info-sign helper" data-toggle="modal" data-target=".help-modal" aria-hidden="true">
                    </span>
                </h4>
                <table id="classify-selects">
                    <tbody>{classifySelects}</tbody>
                </table>
            </div>
        )
    }

});
