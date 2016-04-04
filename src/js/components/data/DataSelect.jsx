"use strict";
var React = require('react');
var ReactDOM = require('react-dom');
var Select = require('react-select');
var _ = require('lodash');

// Components
var ColorPicker = require('./ColorPicker.jsx');
var ColorScheme = require('./ColorScheme.jsx');


module.exports = React.createClass({

    propTypes: {
        actions: React.PropTypes.object,
        werk: React.PropTypes.object
    },

    /**
     * Creates an array of nulls, one for each select component.
     * Props is an antipattern here, but...
     * @returns {Obj} Initial state object
     */
    getInitialState: function(){
        var columns = _.keys(this.props.werk.data[0]);
        return {
            selections: columns.map(function(column){
                return {
                    name: column,
                    value: null
                };
            }),
            colorByGroups: false
        };

    },


    componentWillReceiveProps: function(nextProps) {
        /**
         * If data columns change, reset the state selections array to reset
         * the data selections.
         */
        if(
            !_.isEqual(
                _.keys(this.props.werk.data[0]).sort(), // Old props
                _.keys(nextProps.werk.data[0]).sort() // New props
            )
        ){
            this.setState({
                'selections': _.keys(nextProps.werk.data[0]).map(function(column){
                    return {
                        name: column,
                        value: null
                    };
                }),
                colorByGroups: false
            });
            actions.resetColor();
        }
    },

    /**
     * Select component options. Conditional for base and group classifications.
     * @returns {array}     Array of options.
     */
    setOptions: function(){
        var datamap = this.props.werk.datamap;
        var opts = [
                { value: 'base', label: 'Base axis', disabled: false },
                { value: 'series', label: 'Data series' },
                { value: 'group', label: 'Grouping column', disabled: false },
                { value: 'annotation', label: 'Annotation column' },
                { value: 'ignore', label: 'Ignore column' }
            ];

        opts[0].disabled = datamap.base ? true : false;
        opts[2].disabled = datamap.group ? true : false;

        return opts;
    },

    /**
     * Changes value of Select component via setState
     * @param  {integer} i  Index of Select component
     * @param  {string} v   Value selected
     * @returns {void}
     */
    changeValue: function(i,v){
        var select = this.state.selections[i];
        var actions = this.props.actions;

        /**
         * Remove the previously selected value from datamap and do any
         * necessary cleanup.
         */
        switch(select.value){
            case 'base':
                actions.removeBase();
                break;
            case 'group':
                actions.removeGroup();
                actions.resetColor();
                this.setState({colorByGroups: false});
                break;
            case 'series':
                actions.removeSeries(select.name);
                actions.unsetColor(select.name);
                break;
            case 'annotation':
                actions.removeAnnotations(select.name);
                break;
            case 'ignore':
                actions.removeIgnore(select.name);
                break;
        }

        select.value = v.value;

        /**
         * Update datamap store.
         */
        switch(v.value){
            case 'base':
                actions.addBase(select.name);
                break;
            case 'group':
                actions.addGroup(select.name);
                break;
            case 'series':
                actions.addSeries(select.name);
                break;
            case 'annotation':
                actions.addAnnotations(select.name);
                break;
            case 'ignore':
                actions.addIgnore(select.name);
                break;
        }
    },

    colorGroupSwitch: function(column,e){
        if(this.state.colorByGroups){
            this.props.actions.resetColor();
        }
        this.setState({colorByGroups: !this.state.colorByGroups});

    },

    groupColors: function(){
        var werk = this.props.werk;
        var column = werk.datamap.group;
        var groups = _.sortedUniq(werk.data.map(function(datum, i){
            return datum[column];
        }));
        var selects = groups.map(function(group, i){
            return (
                <tr key={i}>
                    <td>
                        {group}
                    </td>
                    <td>
                        <ColorPicker
                            column={group}
                            werk={this.props.werk}
                            actions={this.props.actions}
                        />
                    </td>
                </tr>
            );
        }.bind(this));

        return (
            <div>
                <h4>Groups</h4>
                <table id="group-selects">
                    <tbody>{selects}</tbody>
                </table>
            </div>
        );
    },

    render: function(){

        var columns = _.keys(this.props.werk.data[0]);

        var classifySelects = columns.map(function(column, i) {

            var addOption = this.state.selections[i].value == 'series' && !this.state.colorByGroups ?
                        <ColorPicker column={column} werk={this.props.werk} actions={this.props.actions} /> :
                            this.state.selections[i].value == 'group' ?
                            <label>
                                <input type="checkbox" value="" onChange={this.colorGroupSwitch} />
                                <i className="fa fa-square-o"></i>
                                <i className="fa fa-check-square-o"></i> Color by groups?
                            </label>
                        : null;

            return (
                <tr key={i}>
                <td className="column-label">{column}</td>
                <td>
                <Select
                    name={column}
                    value={this.state.selections[i].value}
                    options={this.setOptions()}
                    onChange={this.changeValue.bind(this,i)}
                    searchable={false}
                    placeholder="Choose one"
                    clearable={false}
                />
                {addOption}
                </td>
                </tr>
            );
        }.bind(this));

        var groups = this.state.colorByGroups ? this.groupColors() : null;


        return (
            <div>
            <hr />
            <div id="classify-container">
                <h4>Classify and color columns in your data&nbsp;
                    <span className="glyphicon glyphicon-info-sign helper" data-toggle="modal" data-target=".help-modal" aria-hidden="true">
                    </span>
                </h4>
                <table id="classify-selects">
                    <tbody>{classifySelects}</tbody>
                </table>
            </div>
            {groups}
            <hr />
            <ColorScheme werk={this.props.werk} actions={this.props.actions} />
            </div>
        )
    }

});
