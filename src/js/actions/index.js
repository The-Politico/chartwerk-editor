import * as dataActions from './data';
import * as axisActions from './axis';
import * as marginActions from './margin';
import * as textActions from './text';
import * as templateActions from './template';
import * as scriptActions from './script';
import * as apiActions from './api';
import * as uiActions from './ui';
import * as embedActions from './embed';

import _ from 'lodash';

export default _.assign({},
  dataActions,
  axisActions,
  marginActions,
  textActions,
  scriptActions,
  apiActions,
  templateActions,
  uiActions,
  embedActions
);
