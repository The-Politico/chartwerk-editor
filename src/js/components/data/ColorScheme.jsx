import React from 'react';
import colors from '../../constants/colors';


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

  render() {
    const schemes = this.parseSchemes();

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
