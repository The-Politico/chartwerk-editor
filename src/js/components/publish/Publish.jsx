import React from 'react';
import Modal from 'react-modal';
import fetch from 'isomorphic-fetch';
import { locations } from './../../misc/config';


export default React.createClass({
  propTypes: {
    actions: React.PropTypes.object,
    werk: React.PropTypes.object,
  },

  getInitialState() {
    return {
      templateModal: false,
      templateTags: [],
    };
  },

  componentDidMount() {
    fetch(locations.template)
      .then(
        response => response.json()
      )
      .then(
        data => {
          this.setState({ templateTags: data });
        }
      );
  },

  render() {
    const modalStyles = {
      overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.65)',
        zIndex: 9,
      },
      content: {
        maxWidth: '800px',
        margin: 'auto',
        backgroundColor: 'white',
      },
    };

    const templateTags = this.state.templateTags.map((tag, i) => {
      return (
        <div key={i}>
          {tag}
        </div>
      );
    });

    return (
      <div>
        <div>
          <button className="btn btn-lg">Save to ChartWerk</button>
        </div>
        <div>
          <button
            className="btn btn-lg"
            onClick={() => this.setState({ templateModal: true })}
          >Save as template</button>
        </div>
        <Modal
          isOpen={this.state.templateModal}
          onRequestClose={() => this.setState({ templateModal: false })}
          style={modalStyles}
        >
          <i className="fa fa-times" onClick={() => this.setState({ templateModal: false })}></i>
          <h4>Saving as a template</h4>
          <p>Template developers can save charts as templates, which allows other
            users to more easily create similar charts.
          </p>
          {templateTags}
          <div className="form-group">
            <label htmlFor="template-title">What's the title of this template?</label>
            <input
              type="text"
              className="form-control"
              id="template-title"
              placeholder="e.g., Scatterplot with linear trendline"
            />
          </div>
          <div className="form-group">
            <label htmlFor="template-description">Summary of your chart</label>
            <textarea className="form-control" rows="5" id="template-description"></textarea>
          </div>
        </Modal>
      </div>
    );
  },
});
