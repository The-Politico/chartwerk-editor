var types = require('../constants/actions.js');

module.exports.apiText = function(texts){
    return {
      type: types.API_TEXT,
      texts: texts
    };
};

module.exports.setHeadline = function(headline){
  return {
    type: types.SET_HEADLINE,
    headline: headline
  };
};

module.exports.setChatter = function(chatter){
  return {
    type: types.SET_CHATTER,
    chatter: chatter
  };
};

module.exports.setFootnote = function(footnote){
  return {
    type: types.SET_FOOTNOTE,
    footnote: footnote
  };
};

module.exports.setDataSource = function(source){
  return {
    type: types.SET_DATASOURCE,
    source: source
  };
};

module.exports.setAuthor = function(author){
  return {
    type: types.SET_AUTHOR,
    author: author
  };
};

module.exports.addAnnotation = function(annotation){
  return {
    type: types.ADD_ANNOTATION,
    annotation: annotation
  };
};

module.exports.removeAnnotation = function(index){
  return {
    type: types.REMOVE_ANNOTATION,
    index: index
  };
};

module.exports.changeAnnotation = function(index, annotation){
  return {
    type: types.CHANGE_ANNOTATION,
    index: index,
    annotation: annotation
  };
};

module.exports.changeAnnotationText = function(index, text){
  return {
    type: types.CHANGE_ANNOTATION_TEXT,
    index: index,
    text: text
  };
};

module.exports.changeAnnotationPosition = function(index, x, y){
  return {
    type: types.CHANGE_ANNOTATION_POSITION,
    index: index,
    x: x,
    y: y
  };
};

module.exports.changeAnnotationDimensions = function(index, width){
  return {
    type: types.CHANGE_ANNOTATION_DIMENSIONS,
    index: index,
    width: width
  };
};

module.exports.changeAnnotationAlign = function(index, align){
  return {
    type: types.CHANGE_ANNOTATION_ALIGN,
    index: index,
    align: align
  };
};

module.exports.changeAnnotationFontSize = function(index, size){
  return {
    type: types.CHANGE_ANNOTATION_FONT_SIZE,
    index: index,
    size: size
  };
};

module.exports.changeAnnotationBackground = function(index){
  return {
    type: types.CHANGE_ANNOTATION_BACKGROUND,
    index: index
  };
};

module.exports.changeAnnotationSize = function(index, size){
  return {
    type: types.CHANGE_ANNOTATION_SIZE,
    index: index,
    size: size
  };
};
