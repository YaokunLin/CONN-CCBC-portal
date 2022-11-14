import styled from 'styled-components';
import { graphql, useFragment } from 'react-relay';
import NavigationSidebar from 'components/Analyst/NavigationSidebar';
import FormDiv from 'components/FormDiv';
import { AnalystLayout_application$key } from '__generated__/AnalystLayout_application.graphql';
import ApplicationHeader from './ApplicationHeader';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
`;

const StyledFlex = styled.div`
  display: flex;
`;

interface Props {
  children: JSX.Element[] | JSX.Element;
  application: AnalystLayout_application$key;
}

const AnalystLayout: React.FC<Props> = ({
  application: applicationKey,
  children,
}) => {
  const application = useFragment(
    graphql`
      fragment AnalystLayout_application on Application {
        ...ApplicationHeader_application
      }
    `,
    applicationKey
  );

  return (
    <StyledContainer>
      <ApplicationHeader application={application} />
      <StyledFlex>
        <NavigationSidebar />
        <FormDiv>{children}</FormDiv>
      </StyledFlex>
    </StyledContainer>
  );
};

export default AnalystLayout;
