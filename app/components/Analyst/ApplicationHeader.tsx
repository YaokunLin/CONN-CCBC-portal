import styled from 'styled-components';
import { graphql, useFragment } from 'react-relay';
import AssignLead from 'components/Analyst/AssignLead';
import ChangeStatus from './ChangeStatus';

const StyledCallout = styled.div`
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  border-left: 4px solid ${(props) => props.theme.color.links};
`;

const StyledH1 = styled.h1`
  font-size: 24px;
  margin: 8px 0;
`;
const StyledH2 = styled.h2`
  margin: 0;
  font-size: 16px;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 220px;
`;

interface Props {
  query: any;
}

const ApplicationHeader: React.FC<Props> = ({ query }) => {
  const queryFragment = useFragment(
    graphql`
      fragment ApplicationHeader_query on Query {
        applicationByRowId(rowId: $rowId) {
          analystLead
          organizationName
          ccbcNumber
          projectName
          rowId
        }
        ...AssignLead_query
        ...ChangeStatus_query
      }
    `,
    query
  );

  const { applicationByRowId } = queryFragment;
  const { analystLead, ccbcNumber, organizationName, projectName, rowId } =
    applicationByRowId;

  return (
    <StyledCallout>
      <div>
        <StyledH2>{ccbcNumber}</StyledH2>
        <StyledH1>{projectName}</StyledH1>
        <StyledH2>{organizationName}</StyledH2>
      </div>
      <StyledDiv>
        <ChangeStatus query={queryFragment} />
        <AssignLead
          label="Lead"
          applicationId={rowId}
          lead={analystLead}
          query={queryFragment}
        />
      </StyledDiv>
    </StyledCallout>
  );
};

export default ApplicationHeader;
