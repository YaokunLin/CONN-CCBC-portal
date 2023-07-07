import { useState } from 'react';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import FileHeader from 'components/Analyst/Project/ProjectInformation/FileHeader';
import DownloadLink from 'components/DownloadLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faFileContract,
  faFileExcel,
  faMap,
  faPen,
} from '@fortawesome/free-solid-svg-icons';

const StyledGrid = styled.div`
  ${(props) => props.theme.breakpoint.mediumUp} {
    display: grid;
    grid-template-columns: 20% 40% 15% 15% 8% 4%;
  }

  margin-bottom: 16px;
`;

const StyledH3 = styled.h3`
  margin-bottom: 4px;
  button {
    margin-left: 8px;
  }

  ${(props) => props.theme.breakpoint.mediumUp} {
    button {
      display: none;
    }
  }
`;

const StyledColumn = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;

  & a {
    display: flex;
  }
`;

const StyledIconBtn = styled.button`
  border-radius: 0;
  appearance: none;
  height: fit-content;

  & svg {
    color: ${(props) => props.theme.color.links};
    padding-right: 8px;
  }

  &:hover {
    opacity: 0.7;
  }
`;

const StyledHideButton = styled.div`
  display: none;
  margin-left: 8px;

  ${(props) => props.theme.breakpoint.mediumUp} {
    display: block;
  }
`;

const StyledToggleSection = styled.div<ToggleProps>`
  display: grid;
  grid-template-columns: 1fr 3fr 3fr;
  overflow: hidden;
  max-height: ${({ isShowMore }) => (isShowMore ? '600px' : '0px')};
  transition: all 0.5s;
  margin-bottom: 16px;

  h4 {
    margin-bottom: 4px;
    font-size: 14px;
    font-weight: 400;
    color: #757575;
  }

  span {
    min-height: 20px;
  }

  div:not(:last-child) {
    margin-right: 8px;
  }
`;

interface ToggleProps {
  isShowMore: boolean;
}

const StyledArrowButton = styled.button<ToggleProps>`
  color: ${(props) => props.theme.color.links};
  font-weight: 700;

  & svg {
    transform: ${({ isShowMore }) =>
      isShowMore ? 'rotate(90deg)' : 'rotate(0deg)'};
    transition: transform 0.3s;
  }
`;

const StyledContent = styled.div`
  margin-bottom: 16px;
`;

const IconButton = ({ onClick }) => {
  return (
    <StyledIconBtn onClick={onClick} data-testid="project-form-edit-button">
      <FontAwesomeIcon icon={faPen} size="xs" />
    </StyledIconBtn>
  );
};

interface Props {
  additionalComments?: string;
  date?: string;
  dateRequested?: string;
  fundingAgreement?: any;
  levelOfAmendment?: string;
  map?: any;
  onFormEdit?: any;
  isChangeRequest?: boolean;
  isFormEditMode?: boolean;
  sow?: any;
  title: string;
  wirelessSow?: any;
}

const ReadOnlyView: React.FC<Props> = ({
  additionalComments,
  date,
  dateRequested,
  fundingAgreement,
  isChangeRequest,
  isFormEditMode,
  levelOfAmendment,
  map,
  onFormEdit,
  sow,
  title,
  wirelessSow,
}) => {
  const [showMore, setShowMore] = useState(false);

  const formattedDate =
    date && DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED);

  const formattedDateRequested =
    dateRequested &&
    DateTime.fromISO(dateRequested).toLocaleString(DateTime.DATE_MED);

  return (
    <div>
      <StyledGrid>
        <div>
          <StyledH3>
            {title}
            {!isFormEditMode && <IconButton onClick={onFormEdit} />}
          </StyledH3>
          {isChangeRequest && (
            <StyledArrowButton
              type="button"
              onClick={() => setShowMore(!showMore)}
              isShowMore={showMore}
            >
              View more <FontAwesomeIcon icon={faChevronRight} size="xs" />
            </StyledArrowButton>
          )}
        </div>
        <div />
        <StyledColumn>
          {fundingAgreement && (
            <DownloadLink
              uuid={fundingAgreement.uuid}
              fileName={fundingAgreement.name}
            >
              <FileHeader icon={faFileContract} title="Funding Agreement" />
            </DownloadLink>
          )}
          {sow && (
            <DownloadLink uuid={sow.uuid} fileName={sow.name}>
              <FileHeader icon={faFileExcel} title="SoW" />
            </DownloadLink>
          )}
        </StyledColumn>
        <StyledColumn>
          {map && (
            <DownloadLink uuid={map.uuid} fileName={map.name}>
              <FileHeader icon={faMap} title="Map" />
            </DownloadLink>
          )}
          {wirelessSow && (
            <DownloadLink uuid={wirelessSow.uuid} fileName={wirelessSow.name}>
              <FileHeader icon={faFileExcel} title="Wireless SoW" />
            </DownloadLink>
          )}
        </StyledColumn>
        <div>{formattedDate}</div>
        <StyledHideButton>
          {!isFormEditMode && <IconButton onClick={onFormEdit} />}
        </StyledHideButton>
      </StyledGrid>
      <StyledToggleSection isShowMore={showMore}>
        <div>
          <div>
            <h4>Requested/Initiated</h4>
            <StyledContent>{formattedDateRequested}</StyledContent>
          </div>
          <div>
            <h4>Level of amendment</h4>
            <StyledContent>{levelOfAmendment}</StyledContent>
          </div>
        </div>
        <div>
          <h4>Change request form</h4>
          {sow && <DownloadLink uuid={sow.uuid} fileName={sow.name} />}
        </div>
        <div>
          <h4>Additional Comments if necessary to justify amendment impact</h4>
          <span>{additionalComments}</span>
        </div>
      </StyledToggleSection>
    </div>
  );
};

export default ReadOnlyView;
