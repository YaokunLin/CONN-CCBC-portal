import { useRouter } from 'next/router';
import { graphql, useFragment } from 'react-relay';
import styled from 'styled-components';
import { AnalystRow_application$key } from '__generated__/AnalystRow_application.graphql';

interface Props {
  application: AnalystRow_application$key;
}

const StyledRow = styled('tr')`
  max-width: 1170px;
  padding: 16px 8px;

  &:hover {
    background: #f2f2f2;
    cursor: pointer;
  }
`;

const StyledBaseCell = styled('td')`
  padding: 16px 8px;
`;

const StyledCcbdIdCell = styled(StyledBaseCell)`
  width: 9.7%;
  padding-left: 12px !important;
`;

const StyledStatusCell = styled(StyledBaseCell)`
  width: 16.24%;
`;

const StyledProjectNameCell = styled(StyledBaseCell)`
  width: 21.03%;
`;

const StyledOrganizationNameCell = styled(StyledBaseCell)`
  width: 16.76%;
`;

const StyledLeadCell = styled(StyledBaseCell)`
  width: 11.97%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const StyledPackageCell = styled(StyledBaseCell)`
  width: 5.81%;
`;

const PillSpan = styled.span`
  background-color: #1a5a96;
  color: #ffffff;
  border-radius: 16px;
  padding: 4px 12px;
  text-transform: capitalize;
`;

const AnalystRow: React.FC<Props> = ({ application }) => {
  const { rowId, status, projectName, ccbcNumber, organizationName } =
    useFragment(
      graphql`
        fragment AnalystRow_application on Application {
          rowId
          status
          projectName
          ccbcNumber
          organizationName
        }
      `,
      application
    );

  const router = useRouter();

  const handleOnClick = () => {
    router.push(`/analyst/application/${rowId}`);
  };

  return (
    <StyledRow onClick={handleOnClick}>
      <StyledCcbdIdCell>{ccbcNumber}</StyledCcbdIdCell>
      <StyledStatusCell>
        <PillSpan>{status}</PillSpan>
      </StyledStatusCell>
      <StyledProjectNameCell>{projectName}</StyledProjectNameCell>
      <StyledOrganizationNameCell>
        {organizationName}
      </StyledOrganizationNameCell>
      {/* Filled in later when these columns are implemented on backend */}
      <StyledLeadCell />
      <StyledPackageCell />
    </StyledRow>
  );
};

export default AnalystRow;
