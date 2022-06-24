import * as React from 'react';
import { Card } from '@patternfly/react-core';
import { ListView } from '@openshift/dynamic-plugin-sdk-utils';
import './WorkspaceList.scss';
import type { WorkspaceRowData } from './WorkspaceListConfig';
import { WorkspaceRow, workspaceColumns, workspaceFilters, defaultErrorText } from './WorkspaceListConfig';

const WorkspaceList: React.FC = () => {
  const mockData: WorkspaceRowData[] = [{
    name: 'demo-ws',
    labels: ['label1=value1', 'label2=value2'],
  }, {
    name: 'demo-ws2',
    labels: ['label3=value3', 'label4=value4'],
  }];
  const [listData,] = React.useState<WorkspaceRowData[]>([...mockData]);

  return (
    <Card style={{ margin: '40px' }}>
      <ListView
        columns={workspaceColumns}
        data={listData}
        loaded={true}
        loadErrorDefaultText={false ? defaultErrorText: ''}
        Row={WorkspaceRow}
        filters={workspaceFilters}
        emptyStateDescription='No data was retrieved'
      />
    </Card>
  );
};

export default WorkspaceList;
