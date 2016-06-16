import * as types from '../constants/actions';
import assign from 'object-assign';
import _ from 'lodash';

/**
 * text reducer
 * @param {Object} texts        Previous redux store state tree.
 * @param {Object} action       Action contains type and payload for reducer.
 *                              See actions/index.js for descriptions of
 *                              action params.
 * @returns {Object} nextState  Next redux store state tree.
 */
export default (texts, action) => {
  const initialState = {
    headline: '',
    chatter: '',
    footnote: '',
    source: '',
    author: '',
    annotations: [],
  };

  if (typeof texts === 'undefined') {
    return initialState;
  }

  let nextState = assign({}, texts);
  switch (action.type) {
    case types.API_TEXT:
      nextState = _.merge({}, nextState, action.texts);
      break;
    case types.SET_HEADLINE:
      nextState.headline = action.headline;
      break;
    case types.SET_CHATTER:
      nextState.chatter = action.chatter;
      break;
    case types.SET_FOOTNOTE:
      nextState.footnote = action.footnote;
      break;
    case types.SET_DATASOURCE:
      nextState.source = action.source;
      break;
    case types.SET_AUTHOR:
      nextState.author = action.author;
      break;
    case types.ADD_ANNOTATION:
      nextState.annotations.push(action.annotation);
      break;
    case types.REMOVE_ANNOTATION:
      nextState.annotations.splice(action.index, 1);
      break;
    case types.CHANGE_ANNOTATION:
      nextState.annotations[action.index] = action.annotation;
      break;
    case types.CHANGE_ANNOTATION_TEXT:
      nextState.annotations[action.index].text = action.text;
      break;
    case types.CHANGE_ANNOTATION_POSITION:
      nextState.annotations[action.index].x = action.x;
      nextState.annotations[action.index].y = action.y;
      break;
    case types.CHANGE_ANNOTATION_DIMENSIONS:
      nextState.annotations[action.index].w = action.width;
      break;
    case types.CHANGE_ANNOTATION_ALIGN:
      nextState.annotations[action.index].align = action.align;
      break;
    case types.CHANGE_ANNOTATION_FONT_SIZE:
      nextState.annotations[action.index].fontSize = action.size;
      break;
    case types.CHANGE_ANNOTATION_BACKGROUND:
      nextState
        .annotations[action.index]
        .background = !nextState
        .annotations[action.index]
        .background;
      break;
    case types.CHANGE_ANNOTATION_SIZE:
      nextState.annotations[action.index].size = action.size;
      break;
    case types.CHANGE_ANNOTATION_COLOR:
      nextState.annotations[action.index].color = action.color;
      break;
    default:
      return texts;
  }

  return nextState;
};
