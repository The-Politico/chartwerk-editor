"use strict";
var React   = require('react');
var colors  = require('../../constants/colors');


module.exports = React.createClass({

    propTypes: {
        changeScheme: React.PropTypes.func
    },

    getInitialState: function(){
        return {
            schemesVisible: false,
        }
    },

    setVisibility: function(){
        this.setState({schemesVisible: !this.state.schemesVisible});
    },

    setScheme: function(e){
        var actions = this.props.actions;
        actions.setColorScheme(e.target.value);
    },

    parseSchemes: function(){

        function enumarateScheme(colorArray){
            return colorArray.map(function(color,i){
                var divStyle = {
                    backgroundColor: color
                };
                return (
                    <div className="schemekey-square" style={divStyle} key={i}></div>
                );
            })
        };

        var categorical = Object.keys(colors.categorical).map(function(key, i){
            return (
                <div className="radio" key={i}>
                    <label>
                        <input
                            onClick={this.setScheme}
                            type="radio"
                            name="colorScheme"
                            value={"categorical." + key}
                            checked={this.props.werk.axes.color.scheme == "categorical." + key}
                        />
                        <i className="fa fa-circle-thin"></i><i className="fa fa-check"></i>
                        {enumarateScheme(colors.categorical[key])}
                    </label>
                </div>
            );
        }.bind(this));
        var sequential = Object.keys(colors.sequential).map(function(key, i){
            return (
                <div className="radio" key={i}>
                    <label>
                        <input
                            onClick={this.setScheme}
                            type="radio"
                            name="colorScheme"
                            value={"sequential." + key}
                            checked={this.props.werk.axes.color.scheme == "sequential." + key}
                        />
                        <i className="fa fa-circle-thin"></i><i className="fa fa-check"></i>
                        {enumarateScheme(colors.sequential[key])}
                    </label>
                </div>
            );
        }.bind(this));
        var diverging = Object.keys(colors.diverging).map(function(key, i){
            return (
                <div className="radio" key={i}>
                    <label>
                        <input
                            onClick={this.setScheme}
                            type="radio"
                            name="colorScheme"
                            value={"diverging." + key}
                            checked={this.props.werk.axes.color.scheme == "diverging." + key}
                        />
                        <i className="fa fa-circle-thin"></i><i className="fa fa-check"></i>
                        {enumarateScheme(colors.diverging[key])}
                    </label>
                </div>
            );
        }.bind(this));

        return {
            categorical: categorical,
            sequential: sequential,
            diverging: diverging
        }
    },

    render: function(){
        var schemes = this.parseSchemes();
        var schemeSelect = this.state.schemesVisible ?
            (
                <div>
                    <h4>Categorical</h4>
                    <label><b>Use this scheme for most charts.</b> Categorical schemes do not imply a numeric difference between groups in your data. Instead, colors represent simple categories.</label>
                        {schemes.categorical}
                    <h4>Sequential</h4>
                    <label> Sequential schemes help represent data that run from low to high values. Light colors represent low data values, while dark colors emphasize high data values.</label>
                        {schemes.sequential}
                    <h4>Diverging</h4>
                    <label>Diverging schemes emphasize extremes at both ends of the data range. Values in the middle of the data range are represented with light colors, while low and high extremes are emphasized with dark colors.</label>
                        {schemes.diverging}
                </div>
            ) : "";

        return (
            <div className="colorscheme-container clearfix">
                <button className='btn btn-sm' onClick={this.setVisibility}>
                    <i className="fa fa-tint" ></i> Color scheme
                </button>
                {schemeSelect}
            </div>
        )
    }
})
