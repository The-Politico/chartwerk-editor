import { combineReducers } from 'redux';
import datamap from './datamap';
import data from './data';
import axes from './axis';
import margins from './margin';
import text from './text';
import scripts from './script';
import ui from './ui';

export default combineReducers({
  datamap,
  data,
  axes,
  margins,
  text,
  scripts,
  ui,
});
