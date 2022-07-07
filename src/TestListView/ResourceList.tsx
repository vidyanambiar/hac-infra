/* eslint-disable no-console */
import * as React from 'react';
import { Td } from '@patternfly/react-table';
import { Card } from '@patternfly/react-core';
import { Title, TextContent, Text, TextVariants } from '@patternfly/react-core';
import { useK8sWatchResource, TableView } from '@openshift/dynamic-plugin-sdk-utils';

type ResourceListProps = {
  namespace: string;
};

export type RowProps<D> = {
  obj: D;
};

export const Row: React.FC<RowProps<Record<string, string>>> = ({ obj }) => {
  return (
    <>
      <Td dataLabel={obj.name}>{obj.name}</Td>
      <Td dataLabel={obj.kind}>{obj.kind}</Td>
      <Td dataLabel={obj.labels}>{obj.labels}</Td>
    </>
  );
};

const ResourceList: React.FC<ResourceListProps> = ({ namespace }) => {
  // Resource to watch (AppStudio applications)
  const watchedResource = {
    isList: true,
    groupVersionKind: {
      group: 'appstudio.redhat.com',
      version: 'v1alpha1',
      kind: 'Application',
    },
    namespace,
  };

  const [listData, setListData] = React.useState<Record<string, string>[]>([]);
  const [applications, loaded, error] = useK8sWatchResource(watchedResource);

  React.useMemo(() => {
      // Construct data for table
      let tmp:Record<string, string>[] = [];
      if (loaded && Array.isArray(applications)) {
        // Construct data for table
        applications.forEach((application) => {
          let labels = '';
          if (application.metadata?.labels) {
            Object.entries(application.metadata?.labels).forEach(([key, value]) => labels += `${key}: ${value}, `);
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
        setListData([...tmp] as Record<string, string>[]);
      }
  }, [applications, loaded, error]);

  console.log('listData: ', listData);

  const columns = [
    {
      title: 'Name',
      id: 'name',
      props: {
        className: '',
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

  return (
      <>
        <Title headingLevel="h2" size="xl">
          Watch Applications
        </Title>
        <TextContent>
          <Text component={TextVariants.p}>Resource loaded</Text>
        </TextContent>
        <Card style={{ margin: '40px' }}>
          <TableView
            columns={columns}
            data={listData}
            loaded={loaded}
            loadErrorDefaultText={error ? defaultErrorText: ''}
            Row={Row}
            filters={[
              {
                id: 'name',
                label: 'Name',
              },
              {
                id: 'kind',
                label: 'Kind',
              },
              {
                id: 'labels',
                label: 'Labels',
              },
            ]}
            emptyStateDescription='No data was retrieved'
          />
        </Card>
      </>
    );
};

export default ResourceList;