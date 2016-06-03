require('es6-promise').polyfill();
var fetch = require('isomorphic-fetch');

var types = require('../constants/actions.js');

var uiActions    = require('./ui');
var dataActions   = require('./data');
var axisActions   = require('./axis');
var marginActions = require('./margin');
var scriptActions = require('./script');
var textActions = require('./text');


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
          if(data.data){
            dispatch(dataActions.apiData(data.data));
          }
          if(data.scripts){
            dispatch(scriptActions.apiScripts(data.scripts));
          }
          if(data.axes){
            dispatch(axisActions.apiAxes(data.axes));
          }
          if(data.datamap){
            dispatch(dataActions.apiDatamap(data.datamap));
          }
          if(data.margins){
            dispatch(marginActions.apiMargins(data.margins));
          }

          if(data.ui){
            dispatch(uiActions.apiUI(data.ui));
          }
          if(data.text){
            dispatch(textActions.apiText(data.text));
          }
        }
      ).catch(function(error){
        console.log("API ERROR", error);
        console.log("ERROR STACK", error.stack);
      });
  };
};
