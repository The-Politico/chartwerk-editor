"use strict";
var React   = require('react');
var colors  = require('../../constants/colors');
var _       = require('lodash');
var Select  = require('react-select');

var Quantizer = require('./Quantizer.jsx');


module.exports = React.createClass({

    propTypes: {
        changeScheme: React.PropTypes.func
    },

    getInitialState: function(){
        var scheme = this.props.werk.axes.color.scheme;
        return {
            schemesVisible: scheme === 'categorical.default' ? false : true
        };
    },

    /**
     * Set whether schemes opts should be visible.
     * @return {void}
     */
    setVisibility: function(){
        this.setState({schemesVisible: !this.state.schemesVisible});
    },

    /**
     * Sets user selected color scheme.
     * @param  {Obj} e User-selected option.
     * @return {void}
     */
    setScheme: function(e){
        var actions = this.props.actions;
        actions.setColorScheme(e.target.value);
    },

    /**
     * Creates object with JSX returned for each color scheme set in
     * colors constant.
     * @return {Obj} Categorical, sequential and diverging color schemes.
     */
    parseSchemes: function(){

        function enumarateScheme(colorArray){
            return colorArray.map(function(color,i){
                var divStyle = {
                    backgroundColor: color
                };
                return (
                    <div className="schemekey-square" style={divStyle} key={i}></div>
                );
            });
        }

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
        };
    },

    /**
     * Sets or unsets quantized color axis after user selects option.
     * @return {void}
     */
    setQuantize: function(){
      var actions = this.props.actions;
      if(this.props.werk.axes.color.quantize){
        actions.resetColor();
        actions.unsetQuantize();
      }else{
        actions.setQuantize();
      }
    },

    /**
     * Returns data attributes for Quantizer props.
     * @return {Obj} Object with series and extent properties.
     */
    getQuantizeData: function(){
      var werk = this.props.werk,
          series = _.map(werk.data, werk.axes.color.quantizeProps.column),
          extent = [
            _.min(series),
            _.max(series)
          ];
      return {
        series: series,
        extent: extent
      };
    },

    /**
     * Set quantize column.
     * @param  {[type]} selection Option selected with value that is the name
     *                            	of a data series column.
     * @return {void}
     */
    setQuantizeSeries: function(selection){
      this.props.actions.setQuantizeColumn(selection.value);
    },

    /**
     * Renders Quantizer.
     * @return {JSX} Quantizer or further options.
     */
    renderQuantizer: function(){
      var werk = this.props.werk,
          actions = this.props.actions;

      // Instructions
      if(!werk.axes.color.quantize){
        return (
          <div>
            <small>Quantizing a data series reduces your data
            to color buckets that range from low to high values. This is
            mostly used for choropleth maps.</small>
          </div>
        );
      }

      if(!werk.axes.color.quantizeProps.column){

        // If no data series selected, give warning.
        if(werk.datamap.series.length === 0){
          return (
            <div className="alert alert-fail">
                <strong>No data series:</strong> You must have at least one data series column above.
            </div>
          );
        }

        // If only one data series selected, set that one to quantize column
        if(werk.datamap.series.length == 1){
          actions.setQuantizeColumn(werk.datamap.series[0]);
          return null;
        }

        // If more than one, make user pick.
        var seriesOpts = _.map(werk.datamap.series,function(obj){
          return {
            value: obj,
            label: obj
          };
        });

        return (
          <div>
            <Select
                name="quant-series-select"
                value={werk.axes.color.quantizeProps.column}
                options={seriesOpts}
                onChange={this.setQuantizeSeries}
                searchable={false}
                placeholder="Choose a data series"
                clearable={false}
            />
          </div>
        );
      }

      // Once quantize column set, render Quantizer component
      return (
        <Quantizer
          werk={this.props.werk}
          actions={this.props.actions}
          data={this.getQuantizeData()}
        />
      );
    },

    render: function(){
        var werk = this.props.werk;

        var schemes = this.parseSchemes();

        var quantizer = this.renderQuantizer();

        var quantize = werk.axes.color.scheme.substring(0,11) != 'categorical' ?
                      (
                        <div className="quantize-select">
                          <label className="section">

                            <input type="checkbox" checked={this.props.werk.axes.color.quantize} onChange={this.setQuantize} />
                            <i className="fa fa-square-o"></i>
                            <i className="fa fa-check-square-o"></i>
                             Quantize a data series?
                          </label>
                          {quantizer}
                        </div>
                      ) : null;

        var schemeSelect = this.state.schemesVisible ?
            (
                <div>
                    <h4>Color schemes</h4>
                    <small>For most charts, you shouldn't change the default
                    color scheme. If you want to use color to show the relative difference
                  in values within a data series, then you may want to use a sequential or diverging scheme.</small>
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
                <label className="section">
                  <input type="checkbox" onClick={this.setVisibility} />
                  <i className="fa fa-square-o"></i>
                  <i className="fa fa-check-square-o"></i>
                    Adjust color scheme?
                </label>
                {schemeSelect}
            </div>
        );
    }
});
