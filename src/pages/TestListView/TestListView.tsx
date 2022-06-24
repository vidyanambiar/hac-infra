/* eslint-disable no-console */
import * as React from 'react';
import { PageSection } from '@patternfly/react-core';
import ResourceList from './ResourceList';
import DetermineNamespace from './DetermineNamespace';

const TestK8s: React.FC = () => {
  const [namespace, setNamespace] = React.useState<string>();

  return (
    <PageSection>
      <DetermineNamespace namespace={namespace} setNamespace={setNamespace} />
      {namespace && (
        <>
          <hr style={{ margin: 20 }} />
          <ResourceList namespace={namespace} />
          <hr style={{ margin: 20 }} />
        </>
      )}
    </PageSection>
  );
};

export default TestK8s;
