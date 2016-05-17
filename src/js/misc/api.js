var _ = require('lodash');
var $ = require('jquery');
var marked = require('./utils').marked;

module.exports.applyScripts = function(scripts){

  function applyCSS(styles){
    var node = document.createElement('style');
        node.id = 'injected-chart-styles';
        document.head.appendChild(node);
    node.innerHTML = styles;
  }

  function applyJS(script){
    eval.apply(null, [script]);
  }

  function applyHTML(html){
    document
      .getElementById("chartWerk")
      .innerHTML = html;
  }

  applyCSS(scripts.styles);
  applyJS(scripts.draw);
  applyJS(scripts.helper);
  applyHTML(scripts.html);

};

module.exports.injectDependencies = function(dependencies){

  _.forEach(dependencies.scripts, function(src){
    var script = document.querySelector('script[src="'+ src +'"]');
    if(!script){
      script = document.createElement("script");
      script.type = "text/javascript";
      script.src = src;
      document.body.appendChild(script);
    }
  });

  _.forEach(dependencies.styles, function(href){
    var stylesheet = document.querySelector('link[href="'+ href +'"]');
    if(!stylesheet){
      stylesheet = document.createElement("link");
      stylesheet.rel = "stylesheet";
      stylesheet.href = href;
      document.head.appendChild(stylesheet);
    }
  });

  var injectedStyles = document.getElementById('injected-chart-styles');
  if(injectedStyles){
    document.head.appendChild(injectedStyles);
  }

};

var redraw = _.throttle(function(){
    var chart = document.getElementById("chart");
    if(chart){ chart.innerHTML = "" };
    draw();
},1000);

module.exports.initialize = function(){

  setTimeout(function(){
    redraw();
    $('#loading-modal').fadeOut(250);
  },3500);

  $("#chartWerk #headline").html(marked.inlineLexer(window.chartWerk.text.headline, []));
  $("#chartWerk #chatter").html(marked.inlineLexer(window.chartWerk.text.chatter, []));
  $("#chartWerk #footnote").html(marked.inlineLexer(window.chartWerk.text.footnote, []));
  $("#chartWerk #source").html(marked.inlineLexer(window.chartWerk.text.source, []));
  $("#chartWerk #author").html(marked.inlineLexer(window.chartWerk.text.author, []));



}

module.exports.redraw = redraw;
