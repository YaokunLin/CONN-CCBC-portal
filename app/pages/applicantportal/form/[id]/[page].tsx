import { useRouter } from 'next/router';
import { withRelay, RelayProps } from 'relay-nextjs';
import { graphql } from 'react-relay';
import { usePreloadedQuery } from 'react-relay/hooks';
import Alert from '@button-inc/bcgov-theme/Alert';
import styled from 'styled-components';
import defaultRelayOptions from '../../../../lib/relay/withRelayOptions';
import FormDiv from '../../../../components/FormDiv';
import { Layout, Stepper } from '../../../../components';
import { ApplicationForm, Back } from '../../../../components/Form';
import { PageQuery } from '../../../../__generated__/PageQuery.graphql';

const StyledAlert = styled(Alert)`
  margin-bottom: 32px;
`;

const getPageQuery = graphql`
  query PageQuery($rowId: Int!) {
    applicationByRowId(rowId: $rowId) {
      id
      owner
      status
      ...ApplicationForm_application
    }
    session {
      sub
    }
    ...ApplicationForm_query
  }
`;

const FormPage = ({
  preloadedQuery,
}: RelayProps<Record<string, unknown>, PageQuery>) => {
  const query = usePreloadedQuery(getPageQuery, preloadedQuery);

  const { applicationByRowId, session } = query;
  const { status } = applicationByRowId;
  const router = useRouter();

  const applicationId = Number(router.query.id);

  const pageNumber = Number(router.query.page);

  return (
    <Layout session={session} title="Connecting Communities BC">
      <Stepper />

      <FormDiv>
        {status === 'withdrawn' && (
          <StyledAlert id="review-alert" size="small" variant="warning">
            You can no longer edit this application because it is withdrawn.
          </StyledAlert>
        )}
        {status === 'submitted' && (
          <StyledAlert id="review-alert" size="small" variant="info">
            Edits are automatically saved and submitted.
          </StyledAlert>
        )}
        <Back applicationId={applicationId} pageNumber={pageNumber} />
        <ApplicationForm
          pageNumber={pageNumber}
          application={applicationByRowId}
          query={query}
        />
      </FormDiv>
    </Layout>
  );
};

export const withRelayOptions = {
  ...defaultRelayOptions,

  variablesFromContext: (ctx) => ({
    rowId: parseInt(ctx.query.id.toString(), 10),
  }),
};

export default withRelay(FormPage, getPageQuery, withRelayOptions);
