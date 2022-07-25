import { useRouter } from 'next/router';
import { withRelay, RelayProps } from 'relay-nextjs';
import { NextPageContext } from 'next/types';
import defaultRelayOptions from '../lib/relay/withRelayOptions';
import { usePreloadedQuery } from 'react-relay/hooks';
import { isAuthenticated } from '@bcgov-cas/sso-express/dist/helpers';
import type { Request } from 'express';
import { graphql } from 'react-relay';
import StyledGovButton from '../components/StyledGovButton';
import { useCreateApplicationMutation } from '../schema/mutations/application/createApplication';
import { Layout } from '../components';
import { DashboardTable } from '../components/Dashboard';
import { dashboardQuery } from '../__generated__/dashboardQuery.graphql';

const getDashboardQuery = graphql`
  query dashboardQuery($formOwner: ApplicationCondition!) {
    allApplications(condition: $formOwner) {
      nodes {
        id
        rowId
        owner
        referenceNumber
        status
        projectName
      }
    }
    session {
      sub
    }
  }
`;
// eslint-disable-next-line @typescript-eslint/ban-types
const Dashboard = ({ preloadedQuery }: RelayProps<{}, dashboardQuery>) => {
  const { allApplications, session } = usePreloadedQuery(
    getDashboardQuery,
    preloadedQuery
  );
  const trimmedSub: string = session?.sub.replace(/-/g, '');

  const hasApplications = allApplications.nodes.length > 0;

  const router = useRouter();

  const [createApplication] = useCreateApplicationMutation();

  const handleCreateApplication = () => {
    createApplication({
      variables: {
        // input: { application: { owner: session?.sub } },
        input: { application: { owner: trimmedSub } },
      },
      onCompleted: (response) => {
        const applicationId = response.createApplication.application.rowId;
        router.push(`/form/${applicationId}/1`);
      },
      onError: () => {
        // This needs to be removed once application dashboard implemented
        router.push('/dashboard');
      },
    });
  };

  return (
    <Layout session={session} title="Connecting Communities BC">
      <div>
        <h1>Dashboard</h1>
        <p>
          Start a new application; applications can be saved and edited until
          the intake closes on YYYY/MM/DD
        </p>
        <StyledGovButton onClick={handleCreateApplication}>
          New application
        </StyledGovButton>
      </div>
      {hasApplications ? (
        <DashboardTable applications={allApplications} />
      ) : (
        <p>Applications will appear here</p>
      )}
    </Layout>
  );
};

export const withRelayOptions = {
  ...defaultRelayOptions,
  serverSideProps: async (ctx: NextPageContext) => {
    // Server-side redirection of the user to their landing route, if they are logged in
    const request = ctx.req as Request;
    const authenticated = isAuthenticated(request);
    // They're logged in.
    if (authenticated) {
      return {};
    }
    // Handle not logged in
    return {
      redirect: {
        destination: '/',
      },
    };
  },
};

export default withRelay(Dashboard, getDashboardQuery, withRelayOptions);
