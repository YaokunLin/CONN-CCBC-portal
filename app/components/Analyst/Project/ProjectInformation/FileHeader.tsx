import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledContainer = styled('div')`
  color: #757575;

  & svg {
    margin-right: 8px;
  }
`;

interface Props {
  title: string;
  icon: any;
}
const FileHeader: React.FC<Props> = ({ icon, title }) => {
  return (
    <StyledContainer>
      <FontAwesomeIcon icon={icon} />
      {title}
    </StyledContainer>
  );
};

export default FileHeader;
