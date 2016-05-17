"use strict";
var React           = require('react');
var AceEditor       = require('react-ace').default;
var ace             = require('brace');
var Modal           = require('react-modal');
var Toggle          = require('react-toggle');
var _               = require('lodash');

require('brace/mode/javascript');
require('brace/mode/scss');
require('brace/mode/html');
require('brace/theme/monokai');

module.exports = React.createClass({

  propTypes: {
      actions: React.PropTypes.object,
      werk: React.PropTypes.object,
  },

  getInitialState: function(){
    var werk = this.props.werk;
    return {
      modalIsOpen: false,
      editHelper: false,
      editing: 'JS',
      scripts: {
        draw: werk.scripts.draw,
        helper: werk.scripts.helper,
        styles: werk.scripts.styles,
        html: werk.scripts.html
      }
    };
  },

  componentDidMount: function(){
    var scripts = this.state.scripts;
    eval.apply(null, [scripts.draw, scripts.helper]);
  },

  /**
   * This is an antipattern for the sake of accomodating the API, which needs
   * to re-seed state after fetching a ChartWerk object.
   * https://facebook.github.io/react/tips/props-in-getInitialState-as-anti-pattern.html
   * @param  {[type]} nextProps [description]
   * @return {[type]}           [description]
   */
  componentWillReceiveProps: function(nextProps){
    if(nextProps.werk.scripts != this.state.scripts){
      this.setState({
        scripts: nextProps.werk.scripts
      });
    }
  },

  onChange: function(script){
    switch(this.state.editing){
      case 'CSS':
        this.setState({
          scripts: {
            styles: script
          }
        });
        break;
      case 'JS':
        if(this.state.editHelper){
          this.setState({
            scripts: {
              helper: script
            }
          });
        }else{
          this.setState({
            scripts: {
              draw: script
            }
          });
        }
        break;
      case 'HTML':
        this.setState({
          scripts: {
            html: script
          }
        });
        break;
    }
  },

  openModal: function(){
    this.setState({modalIsOpen:true});
  },

  closeModal: function(){
    this.setState({modalIsOpen:false});
  },

  editHelper: function(){
    this.setState({
      editHelper: !this.state.editHelper
    });
  },

  applyScript: function(){
    var actions = this.props.actions,
        werk = this.props.werk,
        scripts = this.state.scripts;

    var styleEl = document.getElementById("injected-chart-styles");
    var chartWerkEl = document.getElementById("chartWerk");

    function addStyleEl(){
      var node = document.createElement('style');
      node.id = 'injected-chart-styles';
      document.head.appendChild(node);
      return node;
    }

    function addStyleString(str){
        if(!styleEl){
          styleEl = addStyleEl();
        }
        styleEl.innerHTML = str;
    }

    switch(this.state.editing){
      case 'CSS':
        actions.setStyles(scripts.styles);
        console.log("CSS>>",JSON.stringify(werk.scripts.styles));
        addStyleString(scripts.styles);
        break;
      case 'JS':
        if(this.state.editHelper){
          actions.setHelperScript(scripts.helper);
        }else{
          actions.setDrawScript(scripts.draw);
        }
        var script = this.state.editHelper ?
          werk.scripts.helper : werk.scripts.draw;
        console.log("JS>>",JSON.stringify(script));
        eval.apply(null, [script]);
        break;
      case 'HTML':
        actions.setHTML(scripts.html);
        console.log("HTML>>",JSON.stringify(scripts.html));
        chartWerkEl.innerHTML = scripts.html;
        break;
    }
  },

  activeClass: function(type){
    return this.state.editing === type ?
      'btn script-switch active' : 'btn script-switch';
  },

  switchScript: function(type){
    this.setState({
      editing: type
    });
  },

  getEditor: function(type){
    var werk = this.props.werk,
        name = type + "-code-editor",
        height = type === 'panel' ? "600px" : "80%",
        scripts = this.state.scripts,
        jsScript = this.state.editHelper ?
          scripts.helper : scripts.draw;

    var editor;
    switch(this.state.editing){
      case 'JS':
        editor = (<AceEditor
          mode='javascript'
          theme="monokai"
          value={jsScript}
          onChange={this.onChange}
          highlightActiveLine={true}
          enableBasicAutocompletion={true}
          fontSize={16}
          wrapEnabled={true}
          name={name}
          width="100%"
          height={height}
          editorProps={{$blockScrolling: true}}
        />);
      break;
      case 'CSS':
        editor = (<AceEditor
          mode='scss'
          theme="monokai"
          value={scripts.styles}
          onChange={this.onChange}
          highlightActiveLine={true}
          enableBasicAutocompletion={true}
          fontSize={16}
          wrapEnabled={true}
          name={name}
          width="100%"
          height={height}
          editorProps={{$blockScrolling: true}}
        />);
        break;
      case 'HTML':
        editor = (<AceEditor
          mode='html'
          theme="monokai"
          value={scripts.html}
          onChange={this.onChange}
          highlightActiveLine={true}
          enableBasicAutocompletion={true}
          fontSize={16}
          wrapEnabled={true}
          name={name}
          width="100%"
          height={height}
          editorProps={{$blockScrolling: true}}
        />);
        break;
    }

    return editor;
  },

  getJSSwitch: function(){
    var editing = this.state.editHelper ? "helper object" : "draw function";
    return this.state.editing !== 'JS' ? null :
      <div className="right-align clearfix editing">
        <small>{editing}</small>
        <Toggle
          defaultChecked={this.state.editHelper}
          aria-label="No label"
          onChange={this.editHelper}
        />
      </div>;
  },

  render: function(){

    var modalStyles = {
      overlay : {
         position           : 'fixed',
         top                : 0,
         left               : 0,
         right              : 0,
         bottom             : 0,
         backgroundColor    : 'rgba(255, 255, 255, 0.65)',
         zIndex             : 9
      },
      content : {
        maxWidth              : '1200px',
        margin                : 'auto',
        backgroundColor       : 'white'
      }
    };


    return (
      <div>

        <div className="alert alert-danger" role="alert">
          <i className="fa fa-diamond first"></i> This feature is for advanced users.
        </div>

        <div className="right-align clearfix">
          <small>Customize scripts and styles.</small>

          <button
            className={this.activeClass('JS')}
            onClick={this.switchScript.bind(this, 'JS')}
          >JS</button>
          <button
            className={this.activeClass('CSS')}
            onClick={this.switchScript.bind(this, 'CSS')}
          >CSS</button>
          <button
            className={this.activeClass('HTML')}
            onClick={this.switchScript.bind(this, 'HTML')}
          >HTML</button>

          <button className='btn btn-sm' onClick={this.applyScript}>
            <i className="fa fa-play" aria-hidden="true"></i> Apply
          </button>
          <button className='btn btn-sm' onClick={this.openModal}>
            <i className="fa fa-arrows-alt" aria-hidden="true"></i>
          </button>
        </div>

        {this.getEditor('panel')}

        {this.getJSSwitch()}

        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={modalStyles} >

          <h4><span className="display">ChartWerk</span> Editor</h4>

          <i className="fa fa-times" onClick={this.closeModal}></i>

            {this.getEditor('modal')}



            <div className="left inline">

              <button className='btn btn-sm' onClick={this.applyScript}>
                <i className="fa fa-play" aria-hidden="true"></i> Apply
              </button>

              <button
                className={this.activeClass('JS')}
                onClick={this.switchScript.bind(this, 'JS')}
              >JS</button>
              <button
                className={this.activeClass('CSS')}
                onClick={this.switchScript.bind(this, 'CSS')}
              >CSS</button>
              <button
                className={this.activeClass('HTML')}
                onClick={this.switchScript.bind(this, 'HTML')}
              >HTML</button>

            </div>

            {this.getJSSwitch()}

        </Modal>
      </div>
    );

  }

});
