/* eslint-disable no-console */
import * as React from 'react';
import { Td } from '@patternfly/react-table';
import { Card, Title, Chip } from '@patternfly/react-core';
import { useK8sWatchResource, ListView } from '@openshift/dynamic-plugin-sdk-utils';
import './ResourceList.scss';

type ResourceListProps = {
  namespace: string;
};

type ApplicationRow = {
  name: string,
  kind: string,
  labels: string[]
};

export type RowProps<ApplicationRow> = {
  obj: ApplicationRow;
};

// Define the elements and style for each cell of a row in the list view
export const Row: React.FC<RowProps<ApplicationRow>> = ({ obj }) => {
  return (
    <>
      <Td dataLabel='name'>{obj.name}</Td>
      <Td dataLabel='kind'>{obj.kind}</Td>
      <Td dataLabel='labels'>
        {obj.labels.map((label) => <Chip isReadOnly>{label}</Chip>)}
      </Td>
    </>
  );
};

// Specify properties and style for column headers
const columns = [
  {
    title: 'Name',
    id: 'name',
    props: {
      className: 'pf-u-info-color-100',   // Class names specified here will be applied to the column header
    },
  },
  {
    title: 'Kind',
    id: 'kind',
    props: {
      className: '',
    },
  },
  {
    title: 'Labels',
    id: 'labels',
    props: {
      className: '',
    },
  },
];

const defaultErrorText = 'An error occured when fetching the data';

// This component displays watched applications in a list
const ResourceList: React.FC<ResourceListProps> = ({ namespace }) => {
  // Resource to watch as a list (AppStudio applications)
  const watchedResource = {
    isList: true,
    groupVersionKind: {
      group: 'appstudio.redhat.com',
      version: 'v1alpha1',
      kind: 'Application',
    },
    namespace,
  };

  const [listData, setListData] = React.useState<ApplicationRow[]>([]);
  const [applications, loaded, error] = useK8sWatchResource(watchedResource);

  React.useMemo(() => {
      // Construct data for the list
      let tmp:ApplicationRow[] = [];
      if (loaded && Array.isArray(applications)) {
        applications.forEach((application) => {
          let labels: string[] = [];
          if (application.metadata?.labels) {
            labels = Object.entries(application.metadata?.labels).map(([key, value]) => `${key}=${value}`);
          }
          tmp = [
            ...tmp,
            {
              name: application.metadata?.name ?? '',
              kind: application.kind,
              labels: labels
            }
          ];
        });
        setListData([...tmp] as ApplicationRow[]);
      }
  }, [applications, loaded, error]);

  console.log('listData: ', listData);

  return (
      <>
        <Title headingLevel="h2" size="xl">
          Watch Applications
        </Title>
        <Card style={{ margin: '40px' }}>
          <ListView
            columns={columns}
            data={listData}
            loaded={loaded}
            loadErrorDefaultText={error ? defaultErrorText: ''}
            Row={Row}
            filters={[
              {
                id: 'name',
                label: 'name...'
              }
            ]}
            emptyStateDescription='No data was retrieved'
          />
        </Card>
      </>
    );
};

export default ResourceList;