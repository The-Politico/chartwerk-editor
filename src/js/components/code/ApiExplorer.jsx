import React from 'react';
import { Typeahead } from 'react-typeahead';
import _ from 'lodash';
import copy from 'copy-to-clipboard';
import ellipsize from 'ellipsize';


export default React.createClass({

  propTypes: {
    werk: React.PropTypes.object,
  },

  getInitialState() {
    return {
      value: 'chartWerk',
      options: this.drawMap(),
    };
  },

  drawMap() {
    const werk = this.props.werk;
    const opts = [];

    function traverse(prefix, parseObj) {
      const keys = Object.keys(parseObj);
      keys.map(key => {
        const subPrefix = prefix.substring(10);
        const Obj = subPrefix === '' ?
          _.get(werk, `${key}`) : _.get(werk, `${subPrefix}.${key}`);
        const newKey = `${prefix}.${key}`;

        opts.push(newKey);

        if (typeof Obj === 'object' && !Array.isArray(Obj) && !!Obj) {
          traverse(newKey, Obj);
        }

        return false;
      });
    }


    traverse('chartWerk', werk);
    console.log(opts);
    return opts;
  },

  onChange(e) {
    this.setState({ value: e.target.value });
  },

  onSelect(selection) {
    this.setState({ value: selection });
  },

  endPoint() {
    return _.includes(this.state.options, this.state.value);
  },

  copyVal() {
    copy(this.state.value);
  },

  currentValue() {
    if (!this.endPoint()) {
      return null;
    }
    return ellipsize(
      JSON.stringify(
        _.get(this.props.werk, this.state.value.substring(10))
      ), 70
    );
  },

  render() {
    return (
      <div className="apiExplorer">
        <h5>API</h5>
        <Typeahead
          options={this.state.options}
          onChange={this.onChange}
          onOptionSelected={this.onSelect}
          value={this.state.value}
        />
        <i
          className="fa fa-check"
          hidden={!this.endPoint()}
        ></i>
        <button
          className="btn btn-sm copy-btn"
          onClick={this.copyVal}
          disabled={!this.endPoint()}
        >
          <i className="fa fa-clipboard" aria-hidden="true"></i>
        </button>
        <div className="current-value">
          {this.currentValue()}
        </div>
      </div>
    );
  },

});
