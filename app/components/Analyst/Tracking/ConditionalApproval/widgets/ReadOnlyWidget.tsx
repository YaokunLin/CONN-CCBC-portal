import { WidgetProps } from '@rjsf/core';
import styled from 'styled-components';

export const StyledValue = styled('div')`
  padding: 8px 0;
  min-width: 196px;
  min-height: 22px;
`;

const ReadOnlyWidget: React.FC<WidgetProps> = ({ value }) => (
  <StyledValue>{value}</StyledValue>
);

export default ReadOnlyWidget;
