"use strict";
var d3 = require('d3');
var _  = require('lodash');

module.exports = {

  create: function(el, props, that){

    var margin = this._margins(props);


    var svg = d3.select(el)
      .append("svg")
      .attr("width", props.width + 40 + 40)
      .attr("height", props.height + 20 + 20)
      .append("g")
      .attr("class", "margin-chart")
      .attr("transform", "translate(" + 40 + "," + 20 + ")");

    svg
      .append('rect')
        .attr({
          width: props.width,
          height: props.height,
          x: 0,
          y: 0,
          class: 'margin-background'
        });

    svg
      .append('text')
      .attr({
        class: 'margin-label top',
        'text-anchor': 'middle',
        x: props.width / 2,
        y: -6
      });
    svg
      .append('text')
      .attr({
        class: 'margin-label bottom',
        'text-anchor': 'middle',
        x: props.width / 2,
        y: props.height + 20
      });
    svg
      .append('text')
      .attr({
        class: 'margin-label left',
        'text-anchor': 'end',
        x: -6,
        y: props.height / 2 + 6
      });
    svg
      .append('text')
      .attr({
        class: 'margin-label right',
        'text-anchor': 'start',
        x: props.width + 6,
        y: props.height / 2 + 6
      });

    svg
      .append('rect')
        .attr({class: 'margin-foreground'});
    svg
      .append('rect')
      .attr({class: 'margin-handle top'});
    svg
      .append('rect')
      .attr({class: 'margin-handle bottom'});
    svg
      .append('rect')
      .attr({class: 'margin-handle right'});
    svg
      .append('rect')
      .attr({class: 'margin-handle left'});



    this.update(el, props, that);

  },

  update: function(el, props, that){

    var scales = this._scales(props);

    this._draw(el, props, scales, that);

  },

  _margins: function(props){
    return {
          top: props.top * props.height,
          bottom: props.bottom * props.height,
          right: props.right * props.width,
          left: props.left * props.width,
        };
  },

  _scales: function(props){

    var x = d3.scale.linear()
      .domain([0,1])
      .range([0, props.width]);
    var y = d3.scale.linear()
      .domain([0,1])
      .range([0, props.height]);


    return {
      x: x,
      y: y
    };
  },

  _draw: function(el, props, scales, that){

    var rect = d3.select(el).select(".margin-foreground"),
        handleLeft = d3.select(el).select(".margin-handle.left"),
        handleRight = d3.select(el).select(".margin-handle.right"),
        handleTop = d3.select(el).select(".margin-handle.top"),
        handleBottom = d3.select(el).select(".margin-handle.bottom"),
        labelTop = d3.select(el).select(".margin-label.top"),
        labelBottom = d3.select(el).select(".margin-label.bottom"),
        labelLeft = d3.select(el).select(".margin-label.left"),
        labelRight = d3.select(el).select(".margin-label.right"),
        margin = this._margins(props),
        innerWidth = props.width - margin.left - margin.right,
        innerHeight = props.height - margin.top - margin.bottom;

    var dragLeft = d3.behavior.drag()
        .on("drag", ldrag);
    var dragRight = d3.behavior.drag()
        .on("drag", rdrag);
    var dragTop = d3.behavior.drag()
        .on("drag", tdrag);
    var dragBottom = d3.behavior.drag()
        .on("drag", bdrag);

    labelTop
      .text( Math.round(props.top * 100).toString() + "%");
    labelBottom
      .text( Math.round(props.bottom * 100).toString() + "%");
    labelLeft
      .text( Math.round(props.left * 100).toString() + "%");
    labelRight
      .text( Math.round(props.right * 100).toString() + "%");

    rect
      .attr({
        width: innerWidth,
        height: props.height - margin.top - margin.bottom,
        x: margin.left,
        y: margin.top
      });

    var thick = 16;

    handleLeft
      .attr({
        width: thick,
        height: innerHeight - thick * 2,
        x: margin.left,
        y: margin.top + thick
      })
      .call(dragLeft);

    handleRight
      .attr({
        width: thick,
        height: innerHeight - thick * 2,
        x: props.width - margin.right - thick,
        y: margin.top + thick
      })
      .call(dragRight);

    handleTop
      .attr({
        width: innerWidth,
        height: thick,
        x: margin.left,
        y: margin.top
      })
      .call(dragTop);

    handleBottom
      .attr({
        width: innerWidth,
        height: thick,
        x: margin.left,
        y: props.height - margin.bottom - thick
      })
      .call(dragBottom);



    function ldrag() {
      var x = scales.x.invert(d3.event.x);
      var newX = d3.max([0, d3.min([x,0.25])]).toFixed(2);
      that.dragMargin(newX,'left');
    }

    function rdrag() {
      var x = scales.x.invert(d3.event.x);
      var newX = d3.max([0.75, d3.min([x,1])]).toFixed(2);
      that.dragMargin(1-newX,'right');
    }

    function tdrag() {
      var y = scales.y.invert(d3.event.y);
      var newY = d3.max([0, d3.min([y,0.25])]).toFixed(2);
      that.dragMargin(newY,'top');
    }

    function bdrag() {
      var y = scales.y.invert(d3.event.y);
      var newY = d3.max([0.75, d3.min([y,1])]).toFixed(2);
      that.dragMargin(1-newY,'bottom');
    }



  }
};
