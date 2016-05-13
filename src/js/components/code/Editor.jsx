"use strict";
var React           = require('react');
var AceEditor       = require('react-ace').default;
var ace             = require('brace');
var Modal           = require('react-modal');
var Toggle          = require('react-toggle');
var _               = require('lodash');

require('brace/mode/javascript');
require('brace/mode/scss');
require('brace/theme/monokai');

module.exports = React.createClass({

  propTypes: {
      actions: React.PropTypes.object,
      werk: React.PropTypes.object,
  },

  getInitialState: function(){
    return {
      modalIsOpen: false,
      editHelper: false,
      editing: 'JS'
    }
  },

  componentDidMount: function(){
    var werk = this.props.werk;
    eval.apply(null, [werk.scripts.draw, werk.scripts.helper]);
  },

  onChange: _.throttle(function(script){
    var actions = this.props.actions;
    if(this.state.editing === 'CSS'){
      actions.setStyles(script);
      return;
    }
    if(this.state.editHelper){
      actions.setHelperScript(script);
    }else{
      actions.setDrawScript(script);
    }
  }, 150),

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
    var werk = this.props.werk;
    var styleEl = document.getElementById("injected-chart-styles");

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

    if(this.state.editing === 'CSS'){
      addStyleString(werk.scripts.styles);
    }else{
      var script = this.state.editHelper ?
        werk.scripts.helper : werk.scripts.draw;
      eval.apply(null, [script]);
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
        jsScript = this.state.editHelper ?
            werk.scripts.helper :
            werk.scripts.draw;

    return this.state.editing === 'JS' ?
      <AceEditor
        mode='javascript'
        theme="monokai"
        value={jsScript}
        onChange={this.onChange}
        highlightActiveLine={true}
        enableBasicAutocompletion={true}
        fontSize={16}
        name={name}
        width="100%"
        height={height}
        editorProps={{$blockScrolling: true}}
      /> :
      <AceEditor
        mode='scss'
        theme="monokai"
        value={werk.scripts.styles}
        onChange={this.onChange}
        highlightActiveLine={true}
        enableBasicAutocompletion={true}
        fontSize={16}
        name={name}
        width="100%"
        height={height}
        editorProps={{$blockScrolling: true}}
      />;
  },

  getJSSwitch: function(){
    var editing = this.state.editHelper ? "helper object" : "draw function";
    return this.state.editing === 'CSS' ? null :
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
          <small>Customize the chart scripts and styles.</small>
          <button
            className={this.activeClass('JS')}
            onClick={this.switchScript.bind(this, 'JS')}
          >JS</button>
          <button
            className={this.activeClass('CSS')}
            onClick={this.switchScript.bind(this, 'CSS')}
          >CSS</button>
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
            </div>

            {this.getJSSwitch()}

        </Modal>
      </div>
    );

  }

});
