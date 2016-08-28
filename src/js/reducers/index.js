import { combineReducers } from 'redux';
import axes from './axis';
import data from './data';
import datamap from './datamap';
import margins from './margin';
import scripts from './script';
import template from './template';
import text from './text';
import ui from './ui';

export default combineReducers({
  axes,
  data,
  datamap,
  margins,
  scripts,
  template,
  text,
  ui,
});
