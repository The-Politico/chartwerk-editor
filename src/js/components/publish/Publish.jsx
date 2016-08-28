import React from 'react';
import Modal from 'react-modal';
import fetch from 'isomorphic-fetch';
import { locations } from './../../misc/config';
import html2canvas from 'html2canvas';
import $ from 'jquery';
import Cookies from 'js-cookie';
import urljoin from 'url-join';
import SimpleMDE from 'react-simplemde-editor';


export default React.createClass({
  propTypes: {
    actions: React.PropTypes.object,
    werk: React.PropTypes.object,
  },

  getInitialState() {
    return {
      templateModal: false,
      screenshotChatter: false,
      templateTags: [],
      newTemplate: false,
    };
  },

  componentDidMount() {
    // Get template tag options
    // Template tags are expected to be formated as objects like
    // {slug: 'some-tag', property: 'Some tag'}
    console.log('TEMPLATE TAG API', locations.templateTag);
    fetch(locations.templateTag)
      .then(
        response => response.json()
      )
      .then(
        data => {
          console.log('TEMPLATE TAG DATA', data);
          this.setState({ templateTags: data.map(d => ({
            slug: d.slug,
            property: d.property,
          })) });
        }
      );

    // For Django use, we intercept the csrf cookie and set
    // the header for AJAX requests
    const csrftoken = Cookies.get('csrftoken');

    function csrfSafeMethod(method) {
      return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    if (csrftoken) {
      $.ajaxSetup({
        beforeSend(xhr, settings) {
          if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader('X-CSRFToken', csrftoken);
          }
        },
      });
    }
  },

  saveChart() {
    function reset() {
      $('#save-chart-check').show();
      $('#save-chart-spinner').hide();
    }

    // If updating an existing chart
    if (window.chartwerkConfig.chart_id) {
      $('#save-chart-check').hide();
      $('#save-chart-spinner').show();
      $.ajax({
        url: locations.chart,
        data: JSON.stringify({
          title: this.props.werk.text.title,
          data: this.props.werk,
        }),
        type: 'PATCH',
        contentType: 'application/json',
      })
      .done((data) => {
        console.log('Successful save.', data);
        reset();
        $('#chart-save-alerts .alert-success').slideDown();
        setTimeout(() => {
          $('#chart-save-alerts .alert-success').slideUp();
        }, 3500);
      })
      .fail(() => {
        reset();
        $('#chart-save-alerts .alert-danger').slideDown();
        setTimeout(() => {
          $('#chart-save-alerts .alert-danger').slideUp();
        }, 3500);
      });
    // If creating a new chart
    } else {
      $('#save-chart-check').hide();
      $('#save-chart-spinner').show();
      $.ajax({
        url: locations.chart,
        data: JSON.stringify({
          title: this.props.werk.text.title,
          data: this.props.werk,
        }),
        type: 'POST',
        contentType: 'application/json',
      })
      .done((data) => {
        console.log('Successful save.', data);
        window.chartwerkConfig.chart_id = data.slug;
        locations.chart = `${urljoin(
          window.chartwerkConfig.chart_api,
          window.chartwerkConfig.chart_id
        )}/`; // Have to add trailing slash, cf. https://github.com/jfromaniello/url-join/issues/10
        reset();
        $('#chart-save-alerts .alert-success').slideDown();
        setTimeout(() => {
          $('#chart-save-alerts .alert-success').slideUp();
        }, 4000);
      })
      .fail(() => {
        reset();
        $('#chart-save-alerts .alert-danger').slideDown();
        setTimeout(() => {
          $('#chart-save-alerts .alert-danger').slideUp();
        }, 2500);
      });
    }
  },

  saveTemplate() {
    function reset() {
      $('#save-template-check').show();
      $('#save-template-spinner').hide();
    }

    const data = JSON.stringify({
      title: this.props.werk.template.title,
      description: this.props.werk.template.description,
      template_properties: this.props.werk.template.tags.map(tag => ({
        slug: tag,
      })),
      data: this.props.werk,
    });

    // If updating an existing template
    if (window.chartwerkConfig.template_id && !this.state.newTemplate) {
      $('#save-template-check').hide();
      $('#save-template-spinner').show();
      $.ajax({
        url: locations.template,
        data,
        type: 'PATCH',
        contentType: 'application/json',
      })
      .done((response) => {
        console.log('Successful save.', response);
        reset();
        $('#template-save-alerts .alert-success').slideDown();
        setTimeout(() => {
          $('#template-save-alerts .alert-success').slideUp();
        }, 3500);
      })
      .fail(() => {
        reset();
        $('#template-save-alerts .alert-danger').slideDown();
        setTimeout(() => {
          $('#template-save-alerts .alert-danger').slideUp();
        }, 3500);
      });
    // If creating a new template
    } else {
      $('#save-template-check').hide();
      $('#save-template-spinner').show();
      $.ajax({
        url: window.chartwerkConfig.template_api,
        data: JSON.stringify({
          title: this.props.werk.template.title,
          description: this.props.werk.template.description,
          template_properties: this.props.werk.template.tags.map(tag => ({
            slug: tag,
          })),
          data,
        }),
        type: 'POST',
        contentType: 'application/json',
      })
      .done((response) => {
        console.log('Successful save.', response);
        window.chartwerkConfig.template_id = response.slug;
        locations.template = `${urljoin(
          window.chartwerkConfig.template_api,
          window.chartwerkConfig.template_id
        )}/`; // Have to add trailing slash, cf. https://github.com/jfromaniello/url-join/issues/10
        reset();
        $('#template-save-alerts .alert-success').slideDown();
        setTimeout(() => {
          $('#template-save-alerts .alert-success').slideUp();
        }, 4000);
      })
      .fail(() => {
        reset();
        $('#template-save-alerts .alert-danger').slideDown();
        setTimeout(() => {
          $('#template-save-alerts .alert-danger').slideUp();
        }, 2500);
      });
    }
  },

  saveTemplateImage() {

  },

  screenshot() {
    const selector = this.state.screenshotChatter ? '#chartWerk' : '#chart';
    html2canvas($(selector),
      {
        onrendered(canvas) {
          const a = document.createElement('a');
          a.href = canvas
            .toDataURL('image/jpeg')
            .replace('image/jpeg', 'image/octet-stream');
          a.download = 'chartwerk.jpg';
          a.click();
          a.remove();
        },
      }
    );
  },

  render() {
    const werk = this.props.werk;
    const actions = this.props.actions;
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
      const active = werk.template.tags.indexOf(tag.slug) > -1 ? 'active' : '';
      return (
        <div
          key={i}
          className={`template-tag-option ${active}`}
          onClick={() => {
            if (werk.template.tags.indexOf(tag.slug) > -1) {
              actions.removeTemplateTag(tag.slug);
            } else {
              actions.addTemplateTag(tag.slug);
            }
          }}
        >
          {tag.property}
        </div>
      );
    });

    return (
      <div>
        <div id="chart-save-alerts">
          <div className="alert alert-success" hidden>
            <strong>Nice werk!</strong> Successfully saved your chart.
          </div>
          <div className="alert alert-danger" hidden>
            <strong>Ack!</strong> There was an error and your chart wasn't saved. Try again?
          </div>
        </div>
        <div>
          <div>
            <h4>Save to Chartwerk</h4>
            <small>
              Ready to publish? Save your chart before collecting an
              embed code below, download a shareable image of your chart or
              save this chart as a template for others to use.
            </small>
          </div>
          <div className="form-group">
            <label>Title</label>
            <input
              className="form-control"
              placeholder="What will we call it?"
              maxLength="100"
              type="text"
              value={werk.text.title}
              onChange={(e) => actions.setChartTitle(e.target.value)}
            />
          </div>
          <button
            className="btn btn-lg btn-huge"
            onClick={this.saveChart}
            disabled={!werk.text.title}
          >
            <i id="save-chart-check" className="fa fa-check-circle-o" aria-hidden="true"></i>
            <i id="save-chart-spinner" className="fa fa-circle-o-notch fa-spin" hidden></i>
            &nbsp;Save chart
          </button>
        </div>
        <div className="fifty-fifty">
          <h4>Download an image</h4>
          <button
            className="btn btn-lg"
            onClick={this.screenshot}
          >
            <i className="fa fa-camera" aria-hidden="true"></i>
            &nbsp;Screenshot
          </button>
          <div>
            <label className="section section-option">
              Include chatter?
              <input
                type="checkbox"
                checked={this.state.screenshotChatter}
                onClick={() => this.setState({ screenshotChatter: !this.state.screenshotChatter })}
              />
              <i className="fa fa-square-o"></i>
              <i className="fa fa-check-square-o"></i>
            </label>
          </div>
        </div>
        <div className="fifty-fifty">
          <div>
            <h4>Save as a template</h4>
          </div>
          <button
            className="btn btn-lg"
            onClick={() => this.setState({ templateModal: true })}
          >Save template</button>
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
          <div className="form-group">
            <label htmlFor="template-title">What's the title of this template?</label>
            <input
              type="text"
              className="form-control"
              id="template-title"
              placeholder="e.g., Scatterplot with linear trendline"
              value={werk.template.title}
              onChange={(e) => { actions.setTemplateTitle(e.target.value); }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="template-description">
              Add a detailed description of your template.
            </label>
            <SimpleMDE
              id="template-description"
              onChange={(value) => { actions.setTemplateDescription(value); }}
              value={werk.template.description}
              options={{
                autofocus: true,
                spellChecker: false,
                initialValue: werk.template.description,
              }}
            />
          </div>
          <div className="form-group">
            <label>Add all appropriate tags for this template.</label>
            <div>
              {templateTags}
            </div>
          </div>
          <div id="template-save-alerts">
            <div className="alert alert-success" hidden>
              <strong>Nice werk!</strong> Successfully saved your template.
            </div>
            <div className="alert alert-danger" hidden>
              <strong>Ack!</strong> There was an error and your template wasn't saved. Try again?
            </div>
          </div>
          <div className="form-group">
            <div>
              <label className="section section-option center borderless">
                Save as new template?
                <input
                  type="checkbox"
                  checked={this.state.newTemplate}
                  onClick={() => this.setState({ newTemplate: !this.state.newTemplate })}
                />
                <i className="fa fa-square-o"></i>
                <i className="fa fa-check-square-o"></i>
              </label>
            </div>
            <button
              className="btn btn-huge"
              disabled={!werk.template.title}
              onClick={this.saveTemplate}
            >
              <i id="save-template-check" className="fa fa-check-circle-o" aria-hidden="true"></i>
              <i id="save-template-spinner" className="fa fa-circle-o-notch fa-spin" hidden></i>
              &nbsp;Save Template
            </button>
          </div>
        </Modal>
      </div>
    );
  },
});
