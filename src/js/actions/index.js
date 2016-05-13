var dataActions   = require('./data');
var axisActions   = require('./axis');
var marginActions = require('./margin');
var scriptActions = require('./script');

var _ = require('lodash');

module.exports = _.assign({},
  dataActions,
  axisActions,
  marginActions,
  scriptActions
);
