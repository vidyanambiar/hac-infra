import React from 'react';
import { Helmet } from 'react-helmet';
import { Workspaces } from '../Workspaces';
// import { TestListView } from '../TestListView';

const PluginEntry = () => (
  <>
    <Helmet titleTemplate="%s" />
    {/* <TestListView /> */}
    <Workspaces />
  </>
);

export default PluginEntry;
