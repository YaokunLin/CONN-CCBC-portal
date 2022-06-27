import styled from 'styled-components';
import {
  formatRow,
  StyledTable,
  StyledColLeft,
  StyledColRight,
  StyledTitleRow,
  StyledH4,
} from './Table';

const StyledSubtitle = styled('h6')`
  padding: 16px !important;
  border-left: 0;
  font-weight: 600;
  margin: 0;
`;

import formatMoney from '../../utils/formatMoney';

const OtherFundingSourcesTable = ({ formData, subschema }: any) => {
  const schema =
    subschema.dependencies.otherFundingSources.oneOf[1].properties
      .otherFundingSourcesArray.items;

  const rows = Object.keys(schema.properties);

  const moneyFields = [
    'requestedFundingPartner2223',
    'requestedFundingPartner2324',
    'requestedFundingPartner2425',
    'requestedFundingPartner2526',
    'requestedFundingPartner2627',
    'totalRequestedFundingPartner',
  ];

  return (
    <>
      {formData &&
        formData.map((item: any, i: number) => {
          return (
            <StyledTable key={i}>
              <thead>
                <tr>
                  <StyledTitleRow colSpan={2}>
                    <StyledH4>{i + 1}. Funding source</StyledH4>
                  </StyledTitleRow>
                </tr>
              </thead>
              {rows.map((row, y) => {
                const title = schema.properties[row]?.title;
                const value = formatRow(item[row]);
                const isMoneyField = moneyFields.includes(row);

                return (
                  <tbody key={row}>
                    {y === 5 && (
                      <tr>
                        <td>
                          <StyledSubtitle>
                            Amount requested under source:
                          </StyledSubtitle>
                        </td>
                      </tr>
                    )}
                    <tr>
                      <StyledColLeft>{title}</StyledColLeft>
                      <StyledColRight>
                        {isMoneyField ? formatMoney(value) : value}
                      </StyledColRight>
                    </tr>
                  </tbody>
                );
              })}
            </StyledTable>
          );
        })}
    </>
  );
};

export default OtherFundingSourcesTable;
