import React from 'react';
import _ from 'lodash';

export default React.createClass({
  propTypes: {
    actions: React.PropTypes.object,
    werk: React.PropTypes.object,
  },

  getInitialState() {
    const werk = this.props.werk;
    const aliasValues = [];

    werk.ui.datamap.forEach(d => {
      aliasValues[d.class] = d.alias;
    });

    return {
      aliasValues,
    };
  },

  dispatchAlias(dataClass) {
    this.props.actions.setDataClassAlias(
      dataClass,
      this.state.aliasValues[dataClass]
    );
  },

  componentWillMount() {
    this.dispatchAlias = _.debounce(this.dispatchAlias, 250);
  },

  setAlias(dataClass, alias) {
    const aliasValues = this.state.aliasValues;
    aliasValues[dataClass] = alias;
    this.setState({
      aliasValues,
    });
    this.dispatchAlias(dataClass);
  },

  setAvailable(dataClass) {
    const werk = this.props.werk;
    const actions = this.props.actions;
    /**
     * Only toggle availability if classification is not already set with a column.
     */
    if (
      typeof werk.datamap[dataClass] === 'undefined' ||
      werk.datamap[dataClass].length === 0
    ) {
      actions.setAvailableDataClass(dataClass);
    }
  },

  notEmptyClass(dataClass) {
    const werk = this.props.werk;
    return (werk.datamap[dataClass] || []).length > 0;
  },

  availableClass(d) {
    const baseClass = d.available ? 'fa fa-check' : 'fa fa-times';
    return this.notEmptyClass(d.class) ? `${baseClass} notempty` : baseClass;
  },

  render() {
    const werk = this.props.werk;
    const actions = this.props.actions;

    const defaultOptions = werk.ui.datamap.map(d => (
      <div className="data-class-options">
        <input
          className="form-control data-class"
          type="text"
          value={d.class}
          readOnly={!d.editableValue}
        />
        <input
          className="form-control alias"
          type="text"
          value={this.state.aliasValues[d.class]}
          onChange={(e) => this.setAlias(d.class, e.target.value)}
        />
        <div className="available-switch">
          <i
            className={this.availableClass(d)}
            onClick={this.notEmptyClass(d.class) ? '' :
              () => actions.setAvailableDataClass(d.class)}
            title="Set availability"
          ></i>
        </div>
      </div>
    ));

    return (
      <div className="form-group" id="template-datamap-options">
        <h4>Datamap</h4>
        <small>Create aliases for default data classification options or hide ones unused
          in your template by setting their availability. You can also add custom
          classifications and aliases.
        </small>
        <div id="template-datamap-header">
          <div className="data-class"><small>Data class</small></div>
          <div className="alias"><small>Alias</small></div>
          <div className="remove"><small>Available</small></div>
        </div>
        {defaultOptions}
      </div>
    );
  },
});
