require('es6-promise').polyfill();

import fetch from 'isomorphic-fetch';
import { locations } from './../misc/config';

import * as uiActions from './ui';
import * as dataActions from './data';
import * as axisActions from './axis';
import * as marginActions from './margin';
import * as scriptActions from './script';
import * as textActions from './text';


export function fetchWerk() {
  return dispatch => fetch(locations.werk)
    .then(
      response => response.json()
    )
    .then(
      data => {
        // Dispatch API actions for data props
        if (data.data) {
          dispatch(dataActions.apiData(data.data));
        }
        if (data.scripts) {
          dispatch(scriptActions.apiScripts(data.scripts));
        }
        if (data.axes) {
          dispatch(axisActions.apiAxes(data.axes));
        }
        if (data.datamap) {
          dispatch(dataActions.apiDatamap(data.datamap));
        }
        if (data.margins) {
          dispatch(marginActions.apiMargins(data.margins));
        }
        if (data.ui) {
          dispatch(uiActions.apiUI(data.ui));
        }
        if (data.text) {
          dispatch(textActions.apiText(data.text));
        }
      }
    )
    .catch(error => {
      console.log('API ERROR', error);
      console.log('ERROR STACK', error.stack);
    });
}
