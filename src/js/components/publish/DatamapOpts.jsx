import React from 'react';
import _ from 'lodash';
import string from 'string';
import defaultDatamap from '../../constants/datamap';

export default React.createClass({
  propTypes: {
    actions: React.PropTypes.object,
    werk: React.PropTypes.object,
  },

  getInitialState() {
    const werk = this.props.werk;
    const defaultClasses = defaultDatamap.map(d => d.class);

    // Aliases are only used for default classes
    const aliasValues = {};
    werk.ui.datamap.filter(
      d => defaultClasses.indexOf(d.class) > -1
    ).forEach(d => {
      aliasValues[d.class] = d.alias;
    });

    // Custom classes
    const customClasses = werk.ui.datamap.filter(
      d => defaultClasses.indexOf(d.class) === -1
    ).map(d => ({
      class: d.class,
      alias: d.alias,
    }));

    return {
      aliasValues,
      customClasses,
      uniqueClasses: true,
    };
  },

  /**
   * Debounced function to set data class alias.
   */
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

  /**
   * Check whether a class already has a column associated with it in the datamap.
   */
  notEmptyClass(dataClass) {
    const werk = this.props.werk;
    return (werk.datamap[dataClass] || []).length > 0;
  },

  /**
   * Availability can only be set on default classes.
   */
  availableClass(d) {
    const baseClass = d.available ? 'fa fa-check' : 'fa fa-times';
    return this.notEmptyClass(d.class) ? `${baseClass} notempty` : baseClass;
  },

  addBlankCustom() {
    const customClasses = this.state.customClasses.slice();
    customClasses.push({
      class: '',
      alias: '',
    });
    this.setState({ customClasses });
  },

  deleteCustom(i) {
    const customClasses = this.state.customClasses.slice();
    customClasses.splice(i, 1);
    this.setState({ customClasses });
  },

  /**
   * Compare class input to make sure it's unique, both within the datamap
   * already synced and the custom classes to be synced.
   */
  changeCustomClass(e, i) {
    const camelClass = string(e.target.value).camelize().s;
    const checkClasses = this.props.werk.ui.datamap.map(d => d.class);
    const customClasses = this.state.customClasses.slice();
    customClasses[i].class = camelClass;
    const compareClasses = customClasses.map(d => d.class);
    if (
      checkClasses.indexOf(customClasses[i].class) > -1 ||
      _.uniq(compareClasses).length !== compareClasses.length
    ) {
      this.setState({ uniqueClasses: false });
    } else {
      this.setState({
        uniqueClasses: true,
        customClasses,
      });
    }
  },

  changeCustomAlias(e, i) {
    const customClasses = this.state.customClasses.slice();
    customClasses[i].alias = e.target.value;
    this.setState({ customClasses });
  },

  /**
   * Disable Sync button in these cases:
   * 1) uniqueClasses is false
   * 2) Either class or alias on input is blank
   * 3) There are no class/alias combo differences between component state
   *    and app state.
   */
  disabledSync() {
    const emptyclasses = _.filter(this.state.customClasses,
      d => d.class === '' || d.alias === ''
    );
    const checkClasses = defaultDatamap.map(d => d.class);
    const customDataMap = this.props.werk.ui.datamap.slice().filter(
      d => checkClasses.indexOf(d.class) === -1
    ).map(d => ({
      class: d.class,
      alias: d.alias,
    }));
    if (!this.state.uniqueClasses) {
      return true;
    }
    if (emptyclasses.length > 0) {
      return true;
    }
    if (
      _.isEqual(
        this.state.customClasses,
        customDataMap
      )
    ) {
      return true;
    }
    return false;
  },

  /**
   * Set keys on datamap custom object.
   * By default we reset the values of the props to empty strings.
   */
  syncClasses() {
    const actions = this.props.actions;
    actions.syncCustomClasses(this.state.customClasses);
    const keys = {};
    this.state.customClasses.forEach(d => {
      keys[d.class] = '';
    });
    actions.setCustomKeys(keys);
  },

  render() {
    const werk = this.props.werk;
    const actions = this.props.actions;

    // Exclude custom classes
    const checkClasses = defaultDatamap.map(d => d.class);
    const defaultClasses = werk.ui.datamap.filter(
      d => checkClasses.indexOf(d.class) > -1
    );

    const defaultOptions = defaultClasses.map(d => (
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
        <div className="click-opts">
          <i
            className={this.availableClass(d)}
            onClick={this.notEmptyClass(d.class) ? '' :
              () => actions.setAvailableDataClass(d.class)}
            title="Set availability"
          ></i>
        </div>
      </div>
    ));

    const customOptions = this.state.customClasses.map((d, i) => (
      <div className="data-class-options">
        <input
          className="form-control data-class"
          type="text"
          value={d.class}
          placeholder="Class"
          onChange={(e) => this.changeCustomClass(e, i)}
        />
        <input
          className="form-control alias"
          type="text"
          value={d.alias}
          placeholder="Alias"
          onChange={(e) => this.changeCustomAlias(e, i)}
        />
        <div className="click-opts">
          <i
            className="fa fa-times"
            onClick={() => this.deleteCustom(i)}
            title="Delete"
          ></i>
        </div>
      </div>
    ));

    return (
      <div className="form-group clearfix" id="template-datamap-options">
        <h4>Datamap</h4>
        <small>Create aliases for default data classification options or hide ones unused
          in your template by setting their availability. You can also add custom
          classifications and aliases.
        </small>
        <div id="template-datamap-default">
          <h5>Default classifications</h5>
          <div className="template-datamap-header">
            <div className="data-class"><small>Data class</small></div>
            <div className="alias"><small>Alias</small></div>
            <div className="remove"><small>Available</small></div>
          </div>
          {defaultOptions}
        </div>
        <div id="template-datamap-custom">
          <h5>Custom classifications</h5>
          <div
            className="template-datamap-header"
            hidden={this.state.customClasses.length === 0}
          >
            <div className="data-class"><small>Data class</small></div>
            <div className="alias"><small>Alias</small></div>
          </div>
          {customOptions}
          <div
            className="alert alert-danger"
            hidden={this.state.uniqueClasses}
          >
            <b>Warning:</b> Class names must be unique!
          </div>
          <button
            className="btn btn-sm btn-add"
            onClick={this.addBlankCustom}
          >Add +</button>
          <button
            className="btn btn-blue btn-sm btn-sync"
            disabled={this.disabledSync()}
            onClick={this.syncClasses}
          >Sync</button>
        </div>
      </div>
    );
  },
});
