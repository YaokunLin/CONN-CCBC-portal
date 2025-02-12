import React, { useState } from 'react';
import styled from 'styled-components';
import schema from 'formSchema/schema';
import { dashboardQuery$data } from '__generated__/dashboardQuery.graphql';
import Tooltip from '@mui/material/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';
import Row from './Row';

const StyledFontAwesome = styled(FontAwesomeIcon)`
  margin-left: 4px; ;
`;

const StyledTable = styled('table')`
  margin-bottom: 0px;
`;

const StyledTableHead = styled('thead')``;

const StyledTableHeadCell = styled('th')`
  padding: 12px;

  background: rgba(49, 49, 50, 0.1);
  &:first-child {
    padding: 12px;
  }
  &:last-child {
    padding: 12px;
    box-shadow: none;
  }
  font-weight: bold;

  box-shadow: inset -2px 0px white;
`;

type Props = {
  applications: Pick<dashboardQuery$data, 'allApplications'>;
};

const Table = ({ applications }: Props) => {
  const [withdrawId, setWithdrawId] = useState<null | number>(null);

  const applicationNodes = applications.allApplications.nodes;

  const formPages = Object.keys(schema.properties);

  const reviewPage = formPages.indexOf('review') + 1;
  return (
    <>
      <StyledTable>
        <StyledTableHead>
          <tr>
            <StyledTableHeadCell>
              CCBC ID
              <Tooltip title="A CCBC ID will be assigned when you submit the application">
                <StyledFontAwesome
                  icon={faCircleInfo}
                  fixedWidth
                  size="sm"
                  color="#345FA9"
                />
              </Tooltip>
            </StyledTableHeadCell>
            <StyledTableHeadCell>Intake</StyledTableHeadCell>
            <StyledTableHeadCell>Project title</StyledTableHeadCell>
            <StyledTableHeadCell>Status</StyledTableHeadCell>
            <StyledTableHeadCell>Actions</StyledTableHeadCell>
          </tr>
        </StyledTableHead>
        <tbody>
          {applicationNodes.map((application) => {
            return (
              <Row
                application={application}
                key={application.owner}
                formPages={formPages}
                reviewPage={reviewPage}
                setWithdrawId={setWithdrawId}
              />
            );
          })}
        </tbody>
      </StyledTable>

      <Modal id={withdrawId} />
    </>
  );
};

export default Table;
