require('es6-promise').polyfill();
var fetch = require('isomorphic-fetch');

var types = require('../constants/actions.js');

var dataActions   = require('./data');
var axisActions   = require('./axis');
var marginActions = require('./margin');
var scriptActions = require('./script');


module.exports.fetchWerk = function () {
  return function(dispatch){
    return fetch('./testAPI.json')
      .then(
        function(response){
          return response.json();
        }
      )
      .then(
        function(data){
          // Dispatch API actions for data props
          if(data.scripts){
            dispatch(scriptActions.apiScripts(data.scripts));
          }
          if(data.axes){
            dispatch(axisActions.apiAxes(data.axes));
          }
          if(data.datamap){
            dispatch(dataActions.apiDatamap(data.datamap));
          }
          if(data.data){
            dispatch(dataActions.apiData(data.data));
          }
          if(data.margins){
            dispatch(marginActions.apiMargins(data.margins));
          }
        }
      ).catch(function(error){
        console.log("API ERROR", error);
      });
  };
};

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
