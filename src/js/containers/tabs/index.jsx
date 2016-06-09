import React from 'react';

import DataTab from './Data.jsx';
import AxesTab from './Axes.jsx';
import LayoutTab from './Layout.jsx';
import TextTab from './Text.jsx';
import AnnotationsTab from './Annotations.jsx';
import CodeTab from './Code.jsx';


const Tabs = (props) => (
  <div className="tab-content">
    <DataTab {...props} />
    <AxesTab {...props} />
    <LayoutTab {...props} />
    <TextTab {...props} />
    <AnnotationsTab {...props} />
    <CodeTab {...props} />
  </div>
);

Tabs.propTypes = {
  actions: React.PropTypes.object,
  werk: React.PropTypes.object,
};

export default Tabs;
