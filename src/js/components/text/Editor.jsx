"use strict";
var React = require('react');
var ReactDOM = require('react-dom');
var Draft = require('draft-js');
var Editor = Draft.Editor;
var EditorState = Draft.EditorState;
var ContentState = Draft.ContentState;
var draftExport = require('draft-js-export-html').stateToHTML;

// Components



module.exports = React.createClass({

  propTypes: {
      actions: React.PropTypes.object,
      werk: React.PropTypes.object
  },

  getInitialState: function(){
    return {
      editorState: Draft.EditorState.createEmpty()
    };
  },

  onChange: function(editorState){
    this.setState({
      editorState: editorState
    });
    var state = editorState.getCurrentContent();
    console.log("STATE", draftExport(state));
    return ;
  },

  handleKeyCommand: function(command) {
    var newState = Draft.RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  },

  onItalicClick: function() {
    this.onChange(Draft.RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
    setTimeout(this.refs.editor.focus,1);
  },

  render: function(){
    return (
      <div className="simpleText-editor-container clearfix">
        <Editor
          ref="editor"
          placeholder="Text me!"
          spellCheck={true}
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange} />
        <div className="format-opt" onClick={this.onItalicClick} title="Italicize text">
          <i className="fa fa-italic" aria-hidden="true"></i>
        </div>

      </div>

    );
  }

});
