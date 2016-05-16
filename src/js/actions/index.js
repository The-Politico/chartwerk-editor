var dataActions   = require('./data');
var axisActions   = require('./axis');
var marginActions = require('./margin');
var textActions   = require('./text');
var scriptActions = require('./script');
var apiActions    = require('./api');

var _ = require('lodash');

module.exports = _.assign({},
  dataActions,
  axisActions,
  marginActions,
  textActions,
  scriptActions,
  apiActions
);
