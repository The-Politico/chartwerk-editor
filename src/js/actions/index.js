var dataActions = require('./data');
var axisActions = require('./axis');

var _ = require('lodash');

module.exports = _.assign({},
  dataActions,
  axisActions
);
