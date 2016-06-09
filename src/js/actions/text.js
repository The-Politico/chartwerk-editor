import * as types from '../constants/actions.js';

export const apiText = texts => ({
  type: types.API_TEXT,
  texts,
});

export const setHeadline = headline => ({
  type: types.SET_HEADLINE,
  headline,
});

export const setChatter = chatter => ({
  type: types.SET_CHATTER,
  chatter,
});

export const setFootnote = footnote => ({
  type: types.SET_FOOTNOTE,
  footnote,
});

export const setDataSource = source => ({
  type: types.SET_DATASOURCE,
  source,
});

export const setAuthor = author => ({
  type: types.SET_AUTHOR,
  author,
});

export const addAnnotation = annotation => ({
  type: types.ADD_ANNOTATION,
  annotation,
});

export const removeAnnotation = index => ({
  type: types.REMOVE_ANNOTATION,
  index,
});

export const changeAnnotation = (index, annotation) => ({
  type: types.CHANGE_ANNOTATION,
  index,
  annotation,
});

export const changeAnnotationText = (index, text) => ({
  type: types.CHANGE_ANNOTATION_TEXT,
  index,
  text,
});

export const changeAnnotationPosition = (index, x, y) => ({
  type: types.CHANGE_ANNOTATION_POSITION,
  index,
  x,
  y,
});

export const changeAnnotationDimensions = (index, width) => ({
  type: types.CHANGE_ANNOTATION_DIMENSIONS,
  index,
  width,
});

export const changeAnnotationAlign = (index, align) => ({
  type: types.CHANGE_ANNOTATION_ALIGN,
  index,
  align,
});

export const changeAnnotationFontSize = (index, size) => ({
  type: types.CHANGE_ANNOTATION_FONT_SIZE,
  index,
  size,
});

export const changeAnnotationBackground = index => ({
  type: types.CHANGE_ANNOTATION_BACKGROUND,
  index,
});

export const changeAnnotationSize = (index, size) => ({
  type: types.CHANGE_ANNOTATION_SIZE,
  index,
  size,
});