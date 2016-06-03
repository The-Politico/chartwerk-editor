"use strict";
var React           = require('react');
var ReactDOM        = require('react-dom');
var _               = require('lodash');
var $               = require('jquery');
var marked = require('./../../misc/utils').marked;



module.exports = React.createClass({

  propTypes: {
      actions: React.PropTypes.object,
      werk: React.PropTypes.object,
  },


  componentDidMount: function(){
    this.renderEditable();
  },

  componentDidUpdate : function(){
    if($("#chart").length){
      this.renderEditable();
    }else{
      console.log("WAITS");
      setTimeout(() => this.renderEditable(), 500)
    }
  },

  renderEditable: function(){
    var werk = this.props.werk;

    var chart = $("#chart");

    chart.css({'position':'relative'});

    $("#chart .annotation.label").remove();

    werk.text.annotations.map((d,i) => {

      if(
        (d.size === 's' && werk.ui.size === 'double') ||
        (d.size === 'd' && werk.ui.size === 'single')
      ){
        return;
      }

      var text = d.text === '' ? 'Add text' :
          marked.inlineLexer(d.text, []);


      var editable =
      `<div class="annotation label" data-id="`+i+`">
        <div class="inner center">
          <p>` + text + `</p>
          <div class="handle"></div>
        </div>
      </div>`;

      $(editable)
        .css({
          'position': 'absolute',
          'left': d.x,
          'top': d.y,
          'width': d.w,
          'height': 'auto'
        })
        .addClass(function(){
          var cls = d.align + ' ' + d.fontSize;
          cls = d.background ? cls + ' bg' : cls;
          return cls;
        })
        .appendTo(chart);

    });

    this.dragMove();
    this.resize();

  },


  dragMove: function(div){

    var actions = this.props.actions;

    $(".annotation.label .inner").on('mousedown', function(e) {

        e.stopPropagation();
        if (e.button > 0) return;

        var div = $(this).parent(".annotation.label"),
            id = div.data("id"),
            x = parseInt(div.css("left"), 10),
            y = parseInt(div.css("top"), 10),
            width = div.width(),
            height = div.height(),
            chart_w = $("#chart").width(),
            chart_h = $("#chart").height();

        var o_x = x, o_y = y,
            s_x = e.pageX, s_y = e.pageY;

        $(document).on('mousemove.drag', function(e) {
            e.stopPropagation();
            x = Math.max(Math.min(o_x + (e.pageX - s_x), chart_w - width), 0);
            y = Math.max(Math.min(o_y + (e.pageY - s_y), chart_h - height), 0);
            div.css({ left: x, top: y });
        });

        $(document).one('mouseup', function() {
            $(document).off('mousemove.drag');
            actions.changeAnnotationPosition(id,x,y);
        });
        return false;
    });
  },

  resize: function(){
      var actions = this.props.actions;

      $(".handle").on('mousedown', function(e) {

          e.stopPropagation();
          if (e.button > 0) return;

          var div = $(this).closest(".annotation.label"),
              id = div.data("id"),
              x = parseInt(div.css("left"), 10),
              width = div.width(),
              height = div.height(),
              max_width = $("#chart").width() - x,
              min_width = 20,
              w;

          var o_x = e.pageX;

          $(document).on('mousemove.drag', function(e) {
              e.stopPropagation();
              w = Math.max(Math.min(max_width, width + (e.pageX - o_x)), min_width);
              div.css({ width: w });
          });

          $(document).one('mouseup', function() {
              $(document).off('mousemove.drag');
              actions.changeAnnotationDimensions(id, w);
          });
          return false;
      });

  },

  addAnnotation: function(){
    var werk = this.props.werk,
        actions = this.props.actions;
    var newNote = {
          size: werk.ui.size === 'single' ? 's' : 'd',
          w:150,
          x:0.0,
          y:0.0,
          align: 'l',
          fontSize: 'm',
          background: true,
          text: ''
        };

    actions.addAnnotation(newNote);

  },

  focusNote: function(i){
    $(".annotation.label").removeClass("editing");
    $(".annotation-formats").slideUp(250);
    $(".annotation.label[data-id='"+i+"']").addClass("editing");
    $("#annotation-editor-"+i+" .annotation-formats").slideDown(250);
  },



  getSizeClass: function(){

  },


  render: function(){


    var werk = this.props.werk,
        actions = this.props.actions;

    var notes = werk.text.annotations.map(function(d,i){
      return (<div key={i} id={"annotation-editor-"+i} className="annotation-editor">
        <div>
          <input
            type="text"
            className="form-control annotation-text"
            placeholder="Text here"
            onChange={(e) => actions.changeAnnotationText(i, e.target.value)}
            onFocus={() => this.focusNote(i)}
            value={d.text}
          />
        <i className="fa fa-times" onClick={() => actions.removeAnnotation(i)} title="Remove"></i>
        </div>
        <div className="annotation-formats">
          <div className="btn-group" role="group" aria-label="Alignment">
            <button type="button" className="btn btn-sm btn-secondary" title="Align left"
              onClick={()=> actions.changeAnnotationAlign(i,'l')}
            >
              <i className="fa fa-align-left" aria-hidden="true"></i>
            </button>
            <button type="button" className="btn btn-sm btn-secondary" title="Align center"
              onClick={() => actions.changeAnnotationAlign(i,'c')}
            >
              <i className="fa fa-align-center" aria-hidden="true"></i>
            </button>
            <button type="button" className="btn btn-sm btn-secondary" title="Align right"
              onClick={() => actions.changeAnnotationAlign(i,'r')}
            >
              <i className="fa fa-align-right" aria-hidden="true"></i>
            </button>
          </div>
          <div className="btn-group" role="group" aria-label="Size" >
            <button type="button" className="btn btn-sm btn-secondary" title="Small font"
              onClick={() => actions.changeAnnotationFontSize(i,'s')}
            >
              <i className="fa fa-font" aria-hidden="true"></i>
            </button>
            <button type="button" className="btn btn-sm btn-secondary" title="Regular font"
              onClick={() => actions.changeAnnotationFontSize(i,'m')}
            >
              <i className="fa fa-font fa-lg" aria-hidden="true"></i>
            </button>
          </div>
          <div className="btn-group" role="group" aria-label="Size">
            <button type="button" className="btn btn-sm btn-secondary" title="Background"
              onClick={() => actions.changeAnnotationBackground(i)}
            >
              <i className="fa fa-square-o fa-lg" aria-hidden="true"></i>
            </button>
          </div>
          <div className="form-group size-switch">
            <img
              src="img/icons/singleColumn.png"
              title="Single column"
              className={(() => d.size === 's' ? 'active' : 'inactive')()}
              onClick={() => actions.changeAnnotationSize(i, 's')}
            />
            <img
              src="img/icons/doubleColumn.png"
              title="Double column"
              className={(() => d.size === 'd' ? 'active' : 'inactive')()}
              onClick={() => actions.changeAnnotationSize(i, 'd')}
            />
          </div>
          <span>
            <em>_italic_</em> <strong>**bold**</strong>
          </span>
        </div>
      </div>);
    }.bind(this));

    return (
      <div>
        <h1>Annotations</h1>
        <button className="btn btn-sm" onClick={this.addAnnotation}>Add +</button>
        <div className="annotations">
          {notes}
        </div>

      </div>
    );

  }


})
