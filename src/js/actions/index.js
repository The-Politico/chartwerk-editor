var dataActions   = require('./data');
var axisActions   = require('./axis');
var marginActions = require('./margin');

var _ = require('lodash');

module.exports = _.assign({},
  dataActions,
  axisActions,
  marginActions
);
