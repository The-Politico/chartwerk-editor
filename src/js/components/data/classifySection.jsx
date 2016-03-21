var React = require('react');
var ReactDOM = require('react-dom');

var ClassifySelect = require('./classifySelect.jsx');

module.exports = React.createClass({

    render: function(){

        function selectionValidation(value){
            // Validate to disable base and group selections on other column opts
            console.log(value);
        }

        var classifySelects = this.props.columns.map(function(column, i) {

            var options = [
                { value: 'base', label: 'Base axis', disabled: false },
                { value: 'series', label: 'Data series' },
                { value: 'group', label: 'Grouping column', disabled: false },
                { value: 'annotation', label: 'Annotation column' },
                { value: 'ignore', label: 'Ignore column' }
            ];


            return (
                <ClassifySelect column={column} key={i} onChange={selectionValidation} options={options} />
            );
        });


        return (
            <div id="classify-container">
                <h4>Classify and color columns in your data
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
