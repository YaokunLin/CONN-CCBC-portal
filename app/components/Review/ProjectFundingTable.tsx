import {
  formatRow,
  StyledTable,
  StyledColLeft,
  StyledColRight,
  StyledH4,
  StyledTitleRow,
} from './Table';

import formatMoney from '../../utils/formatMoney';

const ProjectFundingTable = ({ formData, subschema }: any) => {
  const rows = Object.keys(subschema.properties);

  return (
    <StyledTable>
      {rows.map((row, i) => {
        const title = subschema.properties[row].title;
        const value = formatRow(formData[row]);
        return (
          <>
            {i === 0 && (
              <tr>
                <StyledTitleRow colSpan={2}>
                  <StyledH4>Amount requested under CCBC</StyledH4>
                </StyledTitleRow>
              </tr>
            )}
            {i === 6 && (
              <tr>
                <StyledTitleRow colSpan={2}>
                  <StyledH4>Amount applicant will contribute</StyledH4>
                </StyledTitleRow>
              </tr>
            )}
            {i === 12 && (
              <tr>
                <StyledTitleRow colSpan={2}>
                  <StyledH4>
                    Amount requested under Canadian Infrastructure Bank
                  </StyledH4>
                </StyledTitleRow>
              </tr>
            )}
            <tr key={i}>
              <StyledColLeft>{title}</StyledColLeft>
              <StyledColRight>{formatMoney(value)}</StyledColRight>
            </tr>
          </>
        );
      })}
    </StyledTable>
  );
};

export default ProjectFundingTable;
