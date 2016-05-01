"use strict";
var React   = require('react');
var colors  = require('../../constants/colors');

var Quantizer = require('./Quantizer.jsx');


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

    setQuantize: function(e){
      var actions = this.props.actions;
      if(this.props.werk.axes.color.quantize){
        actions.resetColor();
        actions.unsetQuantize();
      }else{
        actions.setQuantize();
      }
    },

    render: function(){
        var werk = this.props.werk;

        var schemes = this.parseSchemes();

        var quantizeInstruct = werk.axes.color.quantize ?
                  werk.datamap.series.length != 1 ?
                    (
                      <div className="alert alert-fail">
                          <strong>One data series:</strong> You must have one and only one data series column above.
                      </div>
                    ) :
                      <Quantizer werk={this.props.werk} actions={this.props.actions} />
                  :
                    (
                      <div>
                        <small>Quantizing a data series reduces your data
                        to color buckets that range from low to high values. This is
                        used for choropleth maps.</small>
                      </div>
                    );

        var quantize = werk.axes.color.scheme.substring(0,11) != 'categorical' ?
                      (
                        <div className="quantize-select">
                          <label>
                            Quantize a data series?
                            <input type="checkbox" checked={this.props.werk.axes.color.quantize} onChange={this.setQuantize} />
                            <i className="fa fa-square-o"></i>
                            <i className="fa fa-check-square-o"></i>
                          </label>
                          {quantizeInstruct}
                        </div>
                      ) : null;

        var schemeSelect = this.state.schemesVisible ?
            (
                <div>
                    <table>
                      <thead>
                        <tr>
                            <th>Categorical</th>
                            <th>Sequential</th>
                            <th>Diverging</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                            <td>{schemes.categorical}</td>
                            <td>{schemes.sequential}</td>
                            <td>{schemes.diverging}</td>
                        </tr>
                      </tbody>
                    </table>
                    {quantize}
                </div>
            ) : "";

        return (
            <div className="colorscheme-container clearfix">
                <button className='btn btn-sm' onClick={this.setVisibility}>
                    <i className="fa fa-tint" ></i> Color scheme
                </button> <span
                    className="glyphicon glyphicon-info-sign helper"
                    data-toggle="modal"
                    data-target=".help-modal"
                    aria-hidden="true">
                </span>
                {schemeSelect}
            </div>
        )
    }
})
