import { faExclamation, faMap } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const StyledContainer = styled.section`
  background: ${(props) => props.theme.color.backgroundGrey};
  border: 1.5px solid ${(props) => props.theme.color.components};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 16px;
  padding-top: 56px;

  overflow-x: scroll;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;

  .breakpoint-labels {
    display: block;
  }

  ${(props) => props.theme.breakpoint.largeUp} {
    flex-direction: row;
    padding-top: 40px;
    padding-right: 32px;

    & table:first-child {
      margin-right: 16px;
    }

    .breakpoint-labels {
      display: none;
    }
  }

  ${(props) => props.theme.breakpoint.extraLargeUp} {
    padding-right: 128px;
  }
`;

const StyledTable = styled.table`
  max-width: 540px;
  th {
    font-weight: 700;
    vertical-align: bottom;
    border-bottom: 0;

    & div {
      font-weight: 400;
    }
  }

  td {
    text-align: right;
    border-bottom: 0;
    white-space: nowrap;
  }

  th,
  td {
    padding: 4px 8px;
  }
`;

const StyledTHead = styled.thead`
  white-space: nowrap;

  th {
    text-align: right;
    border-bottom: 1px solid #757575;
  }

  & th:first-child {
    border-bottom: none;
  }
`;

const StyledSecondTHead = styled(StyledTHead)`
  th {
    text-align: center;
  }
`;

const StyledLastUpdated = styled.div`
  position: absolute;
  top: 8px;

  ${(props) => props.theme.breakpoint.smallUp} {
    left: none;
    right: 8px;
  }
`;

const StyledInput = styled.input`
  padding: 4px 8px;
  width: 91px;
  height: 28px;
  background: #ffffff;
  border: 2px solid #606060;
  border-radius: 4px;
`;

interface Props {
  gisData: any;
}

const ApplicationGisData: React.FC<Props> = ({ gisData }) => {
  // const [eligible, setEligible] = useState();
  // const [eligibleIndigenous, setEligibleIndigenous] = useState();
  const {
    GIS_PERCENT_OVERBUILD,
    GIS_PERCENT_OVERLAP,
    GIS_TOTAL_ELIGIBLE_HH,
    GIS_TOTAL_ELIGIBLE_INDIG_HH,
    GIS_TOTAL_HH,
    GIS_TOTAL_INDIG_HH,
    GIS_TOTAL_INELIGIBLE_HH,
  } = gisData;

  return (
    <StyledContainer>
      <StyledTable>
        <StyledTHead>
          <th aria-hidden />
          <th>
            Eligible <div>(Underserved)</div>
          </th>
          <th>
            Ineligible <div>(Pending & Served)</div>
          </th>
          <th>Total</th>
        </StyledTHead>
        <tr>
          <td>GIS Analysis</td>
          <td>{GIS_TOTAL_ELIGIBLE_HH && GIS_TOTAL_ELIGIBLE_HH.toFixed(2)}</td>
          <td>
            {GIS_TOTAL_INELIGIBLE_HH && GIS_TOTAL_INELIGIBLE_HH.toFixed(2)}
          </td>
          <td>{GIS_TOTAL_HH && GIS_TOTAL_HH.toFixed(2)}</td>
        </tr>
        <tr>
          <td>In application</td>
          <td>
            <span
              className="fa-layers fa-fw"
              style={{ marginRight: '16px' }}
              title="Applicant is contesting map"
            >
              <FontAwesomeIcon icon={faMap} size="lg" color="#C38A00" />
              <FontAwesomeIcon
                icon={faExclamation}
                size="sm"
                transform="right-1"
                color="#FFFFFF"
              />
            </span>
            <span>0</span>
          </td>
          <td />
          <td />
        </tr>
        <tr>
          <td>Assessment HH</td>
          <td>
            <StyledInput type="text" />
          </td>
          <td />
          <td />
        </tr>
      </StyledTable>
      <StyledTable>
        <StyledSecondTHead>
          <th aria-hidden className="breakpoint-labels" />
          <th>
            Eligible <br />
            Indigenous
          </th>
          <th>
            Total <br />
            Indigenous
          </th>
          <th>Overbuild</th>
          <th>Overlap</th>
        </StyledSecondTHead>
        <tr>
          <td className="breakpoint-labels">GIS Analysis</td>
          <td>{GIS_TOTAL_ELIGIBLE_INDIG_HH}</td>
          <td>{GIS_TOTAL_INDIG_HH}</td>
          <td>{GIS_PERCENT_OVERBUILD}</td>
          <td>{GIS_PERCENT_OVERLAP}</td>
        </tr>
        <tr>
          <td className="breakpoint-labels">In application</td>
          <td />
          <td>placeholder</td>
          <td />
          <td />
        </tr>
        <tr>
          <td className="breakpoint-labels">Assessment HH</td>
          <td>
            <StyledInput type="text" />
          </td>
          <td />
          <td />
          <td />
        </tr>
      </StyledTable>
      <StyledLastUpdated>
        GIS analysis last updated: <br />
        2023-03-01 12:00:00
      </StyledLastUpdated>
    </StyledContainer>
  );
};

export default ApplicationGisData;
