import { LoginForm } from '../components';
import { usePreloadedQuery } from 'react-relay/hooks';
import { withRelay, RelayProps } from 'relay-nextjs';
import { graphql } from 'react-relay';
import defaultRelayOptions from '../lib/relay/withRelayOptions';
import { ButtonLink, Layout } from '../components';
import styled from 'styled-components';
import { pagesQuery } from '../__generated__/pagesQuery.graphql';
import { DateTime } from 'luxon';

const StyledOl = styled('ol')`
  max-width: 300px;
`;

const StyledLi = styled('li')`
  display: flex;
  justify-content: space-between;
`;

const StyledDetails = styled('div')`
  color: rgba(45, 45, 45, 0.7);
`;

const getPagesQuery = graphql`
  query pagesQuery {
    session {
      sub
    }
    openIntake {
      openTimestamp
      closeTimestamp
    }
  }
`;

// eslint-disable-next-line @typescript-eslint/ban-types
const Home = ({ preloadedQuery }: RelayProps<{}, pagesQuery>) => {
  const { session, openIntake } = usePreloadedQuery(
    getPagesQuery,
    preloadedQuery
  );

  return (
    <Layout session={session} title="Connecting Communities BC">
      <div>
        <h1>Welcome</h1>
        <h3>Before you begin</h3>
        <p>
          Full information about the Connecting Communities British Columbia
          (CCBC) program can be found at the program webpage.
        </p>
        <ul>
          <li>Please review the Application Guide</li>
          <li>Please review the pdf of application questions</li>
          <li>
            Please review the templates and gather all supporting documents
          </li>
          <li>
            Please review the project zones, underserved pseudo households, and
            connectivity infrastructure projects
          </li>
        </ul>
        <h3>General information</h3>
        <ul>
          <li>
            Applicants can apply for multiple projects and technology types but
            must demonstrate satisfaction of the required qualifications for
            each project.
          </li>
          <li>
            As outlined in the Application Guide, no information which is marked
            Proprietary or Confidential that is submitted by an applicant during
            the application process will be disclosed to a Third Party by the
            Ministry, unless otherwise authorized by the applicant or if
            required to be disclosed by law.
          </li>
          <li>
            Any document or content submitted as part of the application process
            shall be deemed and remain the property of the Province of B.C. and
            is subject to the B.C. Freedom of Information and Protection of
            Privacy Act.
          </li>
          <li>
            CCBC is a program jointly funded by Canada and British Columbia.
            Applications selected by CCBC may be funded by both the Province and
            Innovation, Science and Economic Development Canada&rsquo;s (ISED)
            UBF. However, ISED does not delegate BC the authority to act on
            behalf of ISED.
          </li>
        </ul>
        <h3>Application form overview</h3>
        <StyledOl>
          <StyledLi>
            Project details <StyledDetails>10 pages</StyledDetails>
          </StyledLi>
          <StyledLi>
            Attachment uploads <StyledDetails>3 pages</StyledDetails>
          </StyledLi>
          <StyledLi>
            Organization details <StyledDetails>5 pages</StyledDetails>
          </StyledLi>
          <StyledLi>
            Acknowledgements <StyledDetails>1 page</StyledDetails>
          </StyledLi>
        </StyledOl>
        <h3>Please note</h3>
        <ul>
          <li>
            Your responses will be autosaved; you may exit and return to the
            Application Form at any time.
          </li>
          <li>All questions are mandatory unless indicated otherwise.</li>
          <li>
            The application intake opens on{' '}
            {openIntake
              ? DateTime.fromISO(openIntake.openTimestamp, {
                  locale: 'en-CA',
                  zone: 'America/Vancouver',
                }).toLocaleString(DateTime.DATETIME_FULL)
              : 'September 7 at 9:00 AM Pacific Time (PT)'}{' '}
            and closes on{' '}
            {openIntake
              ? DateTime.fromISO(openIntake.closeTimestamp, {
                  locale: 'en-CA',
                  zone: 'America/Vancouver',
                }).toLocaleString(DateTime.DATETIME_FULL)
              : 'November 6 at 9:00 AM Pacific Time (PT)'}
            . The CCBC anticipates opening additional future intakes for
            receiving applications and will update this date accordingly.
          </li>
        </ul>
        <h3>Get started</h3>
        <p>
          Login with BCeID Business or BCeID Basic. If you do not have a BCeID,
          please register for a Basic BCeID.
        </p>
        {session?.sub ? (
          <ButtonLink href="/dashboard">Go to dashboard</ButtonLink>
        ) : (
          <LoginForm />
        )}
      </div>
    </Layout>
  );
};

export const withRelayOptions = {
  ...defaultRelayOptions,
  serverSideProps: async () => {
    return {};
  },
};

export default withRelay(Home, getPagesQuery, withRelayOptions);
