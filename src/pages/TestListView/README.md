This POC demonstrates the usage of the ListView component exposed by `@openshift/dynamic-plugin-sdk-utils@1.0.0-alpha13`. This is in preparation to the tasks that will involve displaying workspaces in a list view.

Since we do not have access to a KCP instance via HAC Core this time, this POC watches AppStudio applications and populates them in the ListView.

This can be tested standalone and via HAC Core:

#### To test the list view standalone:
1. `npm install`
2. `npm run start:prod:beta`
3. Access the application in the browser at https://prod.foo.redhat.com:1337/beta/hac/infra

#### To test the list view via HAC Core:
1. Run HAC Core:
   1. Clone the hac-core repo (https://github.com/openshift/hac-core)
   2. run `yarn install`
   3. run `ENVIRONMENT=prod yarn dev`. This will start running HAC Core.
2. In this branch of hac-infra run `npm run start:federated`
3. Access the application in the browser at https://prod.foo.redhat.com:1337/beta/hac/infra

#### Note:
To see the list view populate you will need to create some mock applications via the AppStudio UI.


### Known issues
There are some known issues with column widths (the contents appear squished together as of now) as well as a checkbox that appears on the first column.
Please see https://issues.redhat.com/browse/HAC-1679 where these issues are mentioned and being worked on by the HAC Core team.