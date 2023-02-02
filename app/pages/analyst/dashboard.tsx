import { usePreloadedQuery } from 'react-relay/hooks';
import { withRelay, RelayProps } from 'relay-nextjs';
import { graphql } from 'react-relay';
import { DashboardTabs, AnalystRow } from 'components/AnalystDashboard';
import { TextFilter, NumberFilter } from 'components/Table/Filters';
import Table from 'components/Table';
import styled from 'styled-components';
import defaultRelayOptions from 'lib/relay/withRelayOptions';
import { Layout } from 'components';
import { dashboardAnalystQuery } from '__generated__/dashboardAnalystQuery.graphql';
import { useRouter } from 'next/router';

const tableFilters = [
  new TextFilter('CCBC ID', 'ccbcNumber'),
  new TextFilter('Status', 'statusOrder'),
  new TextFilter('Project title', 'projectName'),
  new TextFilter('Organization', 'organizationName'),
  new TextFilter('Lead', 'analystLead'),
  new NumberFilter('Package', '', { sortable: false, filterable: false }),
];

// will probably have to change to cursor for pagination/infinte scroll
const getDashboardAnalystQuery = graphql`
  query dashboardAnalystQuery(
    $offset: Int
    $pageSize: Int
    $orderBy: [ApplicationsOrderBy!]
  ) {
    session {
      sub
      ...DashboardTabs_query
    }
    # ...AnalystTable_query
    ...AnalystRow_query
    allApplications(first: $pageSize, offset: $offset, orderBy: $orderBy) {
      totalCount
      edges {
        node {
          id
          ...AnalystRow_application
        }
      }
    }
  }
`;

const StyledDashboardContainer = styled.div`
  width: 100%;
`;

const StyledSortText = styled.button`
  color: #3f5986;
  margin-bottom: 24px;
  cursor: pointer;
`;

const AnalystDashboard = ({
  preloadedQuery,
}: RelayProps<Record<string, unknown>, dashboardAnalystQuery>) => {
  const query = usePreloadedQuery(getDashboardAnalystQuery, preloadedQuery);
  const router = useRouter();
  const { session, allApplications } = query;

  const handleClearSorting = () => {
    const url = {
      pathname: router.pathname,
      query: {
        ...router.query,
        orderBy: 'PRIMARY_KEY_ASC',
      },
    };
    router.replace(url, url, { shallow: true });
  };

  return (
    <Layout session={session} title="Connecting Communities BC">
      <StyledDashboardContainer>
        <DashboardTabs session={session} />
        <StyledSortText onClick={handleClearSorting}>
          Clear sorting
        </StyledSortText>
        <Table
          pageQuery={getDashboardAnalystQuery}
          paginated={false}
          filters={tableFilters}
          totalRowCount={allApplications.totalCount}
          disableFiltering
        >
          {allApplications.edges.map(({ node }) => (
            <AnalystRow key={node.id} query={query} application={node} />
          ))}
        </Table>
      </StyledDashboardContainer>
    </Layout>
  );
};

export default withRelay(
  AnalystDashboard,
  getDashboardAnalystQuery,
  defaultRelayOptions
);
