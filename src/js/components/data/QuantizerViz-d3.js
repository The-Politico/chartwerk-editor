"use strict";
var d3 = require('d3');
var _  = require('lodash');

module.exports = {

  create: function(el, props, state, that){

    var margin = props.margin,
        width = props.width - margin.left - margin.right,
        height = props.height - margin.top - margin.bottom;

    var data = state.data,
        thresholds = state.thresholds,
        colorRange = state.colorRange;

    var svg = d3.select(el)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("class", "quant-chart")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg
        .append("g")
        .attr("class", "quant-axis");

    this.update(el, props, state, that);

  },

  update: function(el, props, state, that){

    var data = state.data,
        thresholds = state.thresholds,
        colorRange = state.colorRange;

    var scales = this._scales(el, props, data, thresholds, colorRange);

    this._draw(el, props, scales, data, thresholds, that);

  },

  _scales: function(el, props, data, thresholds, colorRange){
    var width = props.width - props.margin.right - props.margin.left;

    var x = d3.scale.linear()
      .domain(d3.extent(data))
      .range([0,width]);

    var color = d3.scale.threshold()
        .domain(_.slice(thresholds,1)) // Without min point
        .range(colorRange);

    return {
      x: x,
      color: color
    };
  },

  _draw: function(el, props, scales, data, thresholds, that){

    // http://blog.magnetiq.com/post/497605344/rounding-to-a-certain-significant-figures-in
    function sigFigs(n, sig) {
        var mult = Math.pow(10,
            sig - Math.floor(Math.log(n) / Math.LN10) - 1);
        return Math.round(n * mult) / mult;
    }

    var width = props.width;
    var height = props.height - props.margin.top - props.margin.bottom;

    var chartThresholds = _.slice(thresholds,1);

    var drag = d3.behavior.drag()
              .on('drag', function(d,i) {

                var I = thresholds.indexOf(d),
                    next = I < thresholds.length - 1 ?
                            thresholds[I + 1] : null,
                    prev = I > 1 ?
                            thresholds[I - 1] :  null;

                var extent = d3.extent(data);
                var offset = (extent[1] - extent[0]) * 0.02; // 2% offest minimum
                var x = d3.event.x;

                var newX;

                // Limit values be neighboring threshold and minimum offsets
                if(next && prev){
                  if(scales.x.invert(x) <= prev + offset){
                    newX = scales.x(prev +  offset);
                  }else if(scales.x.invert(x) >= next - offset){
                    newX = scales.x(next - offset);
                  }else{
                    newX = x;
                  }
                }else if(next){
                  newX =  scales.x.invert(x) < next - offset ?
                  x : scales.x(next - offset);
                }else{
                  newX =  scales.x.invert(x) < prev + offset ?
                  scales.x(prev +  offset) : x;
                }

                // No values past data max or min
                if(scales.x.invert(newX) < extent[0] + offset){
                  newX = scales.x(extent[0] + offset);
                }else if(scales.x.invert(newX) > extent[1] - offset){
                  newX = scales.x(extent[1] - offset);
                }

                d3.select(this)
                .attr("x1", newX)
                .attr("x2", newX);
                that.dragThreshold(i, sigFigs(scales.x.invert(newX),4));
               });

    var svg = d3.select(el).select(".quant-chart");

    var xAxis = d3.svg.axis()
      .scale(scales.x)
      .ticks(5)
      .tickPadding(10)
      .orient("top");

    var bars = svg.selectAll(".quant-bars")
      .data(thresholds);

    bars.enter().append("rect")
      .attr("class","quant-bars");

    bars
      .attr({
        "x": function(d){
          return scales.x(d);
        },
        "height": height,
        "width": function(d, i){
          var max = i + 1 < thresholds.length ?
                    scales.x(thresholds[i+1]) : scales.x.range()[1];
          return max - scales.x(d);
        },
        "fill": function(d){
          return scales.color(d);
        }
      });

    bars.exit().remove();

    var delimiters = svg.selectAll(".quant-lines")
        .data(chartThresholds);

    delimiters.enter().append("line")
      .attr("class", "quant-lines");

    delimiters
      .attr({
        "class": "quant-lines",
        "y1": 0,
        "y2": height,
        "x1": function(d){
          return scales.x(d);
        },
        "x2": function(d){
          return scales.x(d);
        }
      })
      .call(drag);

      delimiters.exit().remove();

      var distribs = svg.selectAll(".quant-distribs")
        .data(data);

      distribs.enter().append("line")
        .attr("class", "quant-distribs");

      distribs
        .attr({
          "y1": -2,
          "y2": -12,
          "x1": function(d){
            return scales.x(d);
          },
          "x2": function(d){
            return scales.x(d);
          }
        });

      distribs.exit().remove();

      d3.select(".quant-axis")
        .call(xAxis);

  }
};
