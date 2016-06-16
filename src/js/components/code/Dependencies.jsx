import React from 'react';
import validator from 'validator';
import _ from 'lodash';
import { injectDependencies, removeDependencies } from '../../misc/api';

export default React.createClass({

  propTypes: {
    actions: React.PropTypes.object,
    werk: React.PropTypes.object,
  },

  getInitialState() {
    const werk = this.props.werk;
    const scripts = werk.scripts.dependencies.scripts.slice();
    const styles = werk.scripts.dependencies.styles.slice();
    return {
      scripts,
      styles,
    };
  },

  onChange(e, i, type) {
    if (type === 'script') {
      const scripts = this.state.scripts;
      scripts[i] = e.target.value;
      this.setState({
        scripts,
      });
    } else {
      const styles = this.state.styles;
      styles[i] = e.target.value;
      this.setState({
        styles,
      });
    }
  },

  addDependency(type) {
    const scripts = this.state.scripts;
    const styles = this.state.styles;
    if (type === 'script') {
      scripts.push(null);
      this.setState({
        scripts,
      });
    } else {
      styles.push(null);
      this.setState({
        styles,
      });
    }
  },

  removeDependency(i, type) {
    const scripts = this.state.scripts;
    const styles = this.state.styles;
    if (type === 'script') {
      scripts.splice(i, 1);
      this.setState({
        scripts,
      });
    } else {
      styles.splice(i, 1);
      this.setState({
        styles,
      });
    }
  },

  syncDependencies() {
    const actions = this.props.actions;
    const dependencies = this.props.werk.scripts.dependencies;
    removeDependencies(dependencies);
    injectDependencies(this.state); // Optimistically inject dependencies
    actions.setDependencies(this.state);
  },

  validate(url, type) {
    if (!url) return false;

    let valid = validator.isURL(url, {
      protocols: ['http', 'https'],
      require_protocol: true,
    });

    if (!valid) return valid;

    if (type === 'script') {
      valid = url.slice(-3) === '.js';
    } else {
      valid = url.slice(-4) === '.css';
    }
    return valid;
  },

  displayValid(url, type) {
    const valid = this.validate(url, type);
    return valid ? 'fa fa-check' : 'fa fa-exclamation';
  },

  enableSync() {
    const deps = this.props.werk.scripts.dependencies;
    const invalidScripts = _.includes(
      this.state.scripts.map(url => this.validate(url, 'script')),
      false
    );
    const invalidStyles = _.includes(
      this.state.styles.map(url => this.validate(url, 'style')),
      false
    );

    const same = _.isEqual(this.state.scripts, deps.scripts) &&
      _.isEqual(this.state.styles, deps.styles);

    console.log('SAME', same);
    console.log(this.state.scripts, deps.scripts);
    return !invalidScripts && !invalidStyles && !same ?
      'btn btn-sm sync-btn' : 'btn btn-sm sync-btn disabled';
  },

  render() {
    const scripts = this.state.scripts.map((dep, i) =>
      (<div>
        <input
          type="url"
          className="form-control"
          onChange={(e) => this.onChange(e, i, 'script')}
          value={dep}
          key={i}
        />
        <i className={this.displayValid(dep, 'script')}></i>
        <i
          className="fa fa-times"
          onClick={() => this.removeDependency(i, 'script')}
        ></i>
      </div>)
    );

    const styles = this.state.styles.map((dep, i) =>
      (<div>
        <input
          type="url"
          className="form-control"
          onChange={(e) => this.onChange(e, i, 'style')}
          value={dep}
          key={i}
        />
        <i className={this.displayValid(dep, 'style')}></i>
        <i
          className="fa fa-times"
          onClick={() => this.removeDependency(i, 'style')}
        ></i>
      </div>)
    );

    return (
      <div className="dependencies">
        <h4>
          Scripts
          <div
            className="add-btn"
            onClick={() => this.addDependency('script')}
          >
            Add <i className="fa fa-plus"></i>
          </div>
        </h4>
        {scripts}

        <h4>
          Stylesheets
          <div
            className="add-btn"
            onClick={() => this.addDependency('style')}
          >
            Add <i className="fa fa-plus"></i>
          </div>
        </h4>
        {styles}

        <button className={this.enableSync()} onClick={this.syncDependencies}>
          <i className="fa fa-refresh" aria-hidden="true"></i> Sync
        </button>
      </div>
    );
  },

});
