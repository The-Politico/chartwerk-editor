import React from 'react';
import colors from '../../constants/colors';
import _ from 'lodash';
import Select from 'react-select';
import Quantizer from './Quantizer';


export default React.createClass({

  propTypes: {
    actions: React.PropTypes.object,
    werk: React.PropTypes.object,
    changeScheme: React.PropTypes.func,
  },

  getInitialState() {
    const scheme = this.props.werk.axes.color.scheme;
    return {
      schemesVisible: !(scheme === 'categorical.default'),
    };
  },

  /**
   * Set whether schemes opts should be visible.
   * @return {void}
   */
  setVisibility() {
    this.setState({ schemesVisible: !this.state.schemesVisible });
  },

  /**
   * Sets user selected color scheme.
   * @param  {Obj} e User-selected option.
   * @return {void}
   */
  setScheme(e) {
    const actions = this.props.actions;
    actions.setColorScheme(e.target.value);
  },

  /**
   * Creates object with JSX returned for each color scheme set in
   * colors constant.
   * @return {Obj} Categorical, sequential and diverging color schemes.
   */
  parseSchemes() {
    function enumarateScheme(colorArray) {
      return colorArray.map((color, i) => {
        const divStyle = {
          backgroundColor: color,
        };
        return (
          <div className="schemekey-square" style={divStyle} key={i}></div>
        );
      });
    }

    const categorical = Object.keys(colors.categorical).map((key, i) =>
      (<div className="radio" key={i}>
        <label>
          <input
            onClick={this.setScheme}
            type="radio"
            name="colorScheme"
            value={`categorical.${key}`}
            checked={this.props.werk.axes.color.scheme === `categorical.${key}`}
          />
          <i className="fa fa-circle-thin"></i><i className="fa fa-check"></i>
          {enumarateScheme(colors.categorical[key])}
        </label>
      </div>)
    );

    const sequential = Object.keys(colors.sequential).map((key, i) =>
      (<div className="radio" key={i}>
        <label>
          <input
            onClick={this.setScheme}
            type="radio"
            name="colorScheme"
            value={`sequential.${key}`}
            checked={this.props.werk.axes.color.scheme === `sequential.${key}`}
          />
          <i className="fa fa-circle-thin"></i><i className="fa fa-check"></i>
          {enumarateScheme(colors.sequential[key])}
        </label>
      </div>)
      );

    const diverging = Object.keys(colors.diverging).map((key, i) =>
      (<div className="radio" key={i}>
        <label>
          <input
            onClick={this.setScheme}
            type="radio"
            name="colorScheme"
            value={`diverging.${key}`}
            checked={this.props.werk.axes.color.scheme === `diverging.${key}`}
          />
          <i className="fa fa-circle-thin"></i><i className="fa fa-check"></i>
          {enumarateScheme(colors.diverging[key])}
        </label>
      </div>)
    );

    return {
      categorical,
      sequential,
      diverging,
    };
  },

  /**
   * Sets or unsets quantized color axis after user selects option.
   * @return {void}
   */
  setQuantize() {
    const actions = this.props.actions;
    if (this.props.werk.axes.color.quantize) {
      actions.resetColor();
      actions.unsetQuantize();
    } else {
      actions.setQuantize();
    }
  },

  /**
   * Returns data attributes for Quantizer props.
   * @return {Obj} Object with series and extent properties.
   */
  getQuantizeData() {
    const werk = this.props.werk;
    const series = _.map(werk.data, werk.axes.color.quantizeProps.column);
    const extent = [
      _.min(series),
      _.max(series),
    ];
    return {
      series,
      extent,
    };
  },

  /**
   * Set quantize column.
   * @param  {[type]} selection Option selected with value that is the name
   *                            	of a data series column.
   * @return {void}
   */
  setQuantizeSeries(selection) {
    this.props.actions.setQuantizeColumn(selection.value);
  },

  /**
   * Renders Quantizer.
   * @return {JSX} Quantizer or further options.
   */
  renderQuantizer() {
    const werk = this.props.werk;
    const actions = this.props.actions;

    // Instructions
    if (!werk.axes.color.quantize) {
      return null;
    }

    if (!werk.axes.color.quantizeProps.column) {
      // If no data series selected, give warning.
      if (werk.datamap.series.length === 0) {
        return (
          <div className="alert alert-fail">
            <strong>No data series:</strong> You must have at least one data series column above.
          </div>
        );
      }

      // If only one data series selected, set that one to quantize column
      if (werk.datamap.series.length === 1) {
        actions.setQuantizeColumn(werk.datamap.series[0]);
        return null;
      }

      // If more than one, make user pick.
      const seriesOpts = _.map(werk.datamap.series, (obj) => ({
        value: obj,
        label: obj,
      }));

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

  render() {
    const werk = this.props.werk;

    const schemes = this.parseSchemes();

    const quantizer = this.renderQuantizer();

    const quantize = werk.axes.color.scheme.substring(0, 11) !== 'categorical' ?
                  (<div className="quantize-select">
                    <label className="section">
                      Should colors represent numeric values in a data series?
                      <input
                        type="checkbox"
                        checked={this.props.werk.axes.color.quantize}
                        onChange={this.setQuantize}
                      />
                      <i className="fa fa-square-o"></i>
                      <i className="fa fa-check-square-o"></i>
                    </label>
                    {quantizer}
                  </div>
                  ) : null;

    const schemeSelect = this.state.schemesVisible ?
        (<div>
          <h4>Color schemes</h4>
          <small>For most charts, you shouldn't change the default
          color scheme. If you want to use color to show the relative difference
          in values within a data series, then you may want to use a sequential
          or diverging scheme.</small>
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
        </div>) : '';

    return (
      <div className="colorscheme-container clearfix">
        <label className="section">
          Do you need to change the color scheme?
          <input type="checkbox" onClick={this.setVisibility} />
          <i className="fa fa-square-o"></i>
          <i className="fa fa-check-square-o"></i>
        </label>
        {schemeSelect}
      </div>
    );
  },
});
