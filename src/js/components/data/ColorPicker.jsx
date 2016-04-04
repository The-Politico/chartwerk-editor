"use strict";
var React           = require('react');
var colors          = require('../../constants/colors');
var actionCreators  = require('../../actions');
var _               = require('lodash');

module.exports = React.createClass({

    propTypes: {
        actions: React.PropTypes.object,
        column: React.PropTypes.string
    },

    getInitialState: function(){
            var werk = this.props.werk;
            var scheme = _.get(colors, werk.axes.color.scheme);
            var initialColor = scheme[0];

            // Set initial color
            this.props.actions.setColor(
                this.props.column,
                initialColor
            );

            return {
                selectedColor: initialColor,
                pickerVisible: false
            }
    },

    showPicker: function(){
        this.setState({pickerVisible: true});
    },

    selectColor: function(e){
        var actions = this.props.actions,
            color = e.target.getAttribute('color');
        actions.setColor(this.props.column, color);
        this.setState({pickerVisible: false, selectedColor: color});
    },

    render: function(){
        var werk = this.props.werk;
        var choices = _.get(colors, werk.axes.color.scheme).map(function(color,i){
            var divStyle = {
                backgroundColor: color
            };
            return (<div className="color-square" color={color} style={divStyle} onClick={this.selectColor} key={i}></div>)
        }.bind(this));

        var picker = this.state.pickerVisible ?
            <div className="colorpicker-panel clearfix">
                {choices}
            </div> : "";

        var divStyle = {
            backgroundColor: this.state.selectedColor
        };

        return (<div className="colorpicker">
            <div className="color-square" style={divStyle} onClick={this.showPicker}></div>
            {picker}
        </div>)
    }
})
