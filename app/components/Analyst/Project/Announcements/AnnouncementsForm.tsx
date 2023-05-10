import { useEffect, useMemo, useRef, useState } from 'react';
import { ConnectionHandler, graphql, useFragment } from 'react-relay';
import styled from 'styled-components';
import { ProjectForm } from 'components/Analyst/Project';
import validateFormData from '@rjsf/core/dist/cjs/validate';
import validator from 'validator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ViewAnnouncements from 'components/Analyst/Project/Announcements/ViewAnnouncements';
import announcementsSchema from 'formSchema/analyst/announcements';
import announcementsUiSchema from 'formSchema/uiSchema/analyst/announcementsUiSchema';
import { useCreateAnnouncementMutation } from 'schema/mutations/project/createAnnouncement';
import { useUpdateAnnouncementMutation } from 'schema/mutations/project/updateAnnouncement';
import ProjectTheme from '../ProjectTheme';

const StyledAddButton = styled.button<EditProps>`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.color.links};
  margin-bottom: ${(props) => (props.isFormEditMode ? '0px' : '16px')};
  overflow: hidden;
  max-height: ${(props) => (props.isFormEditMode ? '0px' : '30px')};
  transition: max-height 0.5s;

  & svg {
    margin-left: 16px;
  }

  &:hover {
    opacity: 0.7;
  }
`;

interface EditProps {
  isFormEditMode: boolean;
  overflow?: string;
  onClick?: () => void;
}

const StyledProjectForm = styled(ProjectForm)<EditProps>`
  .pg-card-content {
    min-height: 0;
  }

  .project-form {
    position: relative;
    z-index: ${(props) => (props.isFormEditMode ? 100 : 1)};
    overflow: ${(props) => props.overflow};
    max-height: ${(props) => (props.isFormEditMode ? '400px' : '30px')};
    transition: max-height 0.7s;
  }
`;

export const concatCCBCNumbers = (currentCcbcNumber, ccbcNumberList) => {
  if (!ccbcNumberList || ccbcNumberList?.length === 0) return currentCcbcNumber;
  let projectNumbers = '';
  ccbcNumberList.forEach((application) => {
    projectNumbers += `${application.ccbcNumber},`;
  });
  return `${currentCcbcNumber},${projectNumbers}`;
};

export const updateStoreAfterMutation = (
  store,
  relayConnectionId,
  announcementData
) => {
  const newAnnouncement = store
    .getRootField('updateAnnouncement')
    .getLinkedRecord('announcement');

  // Get the connection from the store
  const connection = store.get(relayConnectionId);

  // Remove the old announcement from the connection
  ConnectionHandler.deleteNode(connection, announcementData.id);

  // Insert the new announcement at the beginning of the connection
  const edge = ConnectionHandler.createEdge(
    store,
    connection,
    newAnnouncement,
    'AnnouncementEdge'
  );
  ConnectionHandler.insertEdgeBefore(connection, edge);
};

const AnnouncementsForm = ({ query }) => {
  const queryFragment = useFragment(
    graphql`
      fragment AnnouncementsForm_query on Query {
        applicationByRowId(rowId: $rowId) {
          ccbcNumber
          announcements(first: 1000)
            @connection(key: "AnnouncementsForm_announcements") {
            __id
            edges {
              node {
                id
                rowId
                jsonData
              }
            }
          }
        }
        allApplications {
          nodes {
            ccbcNumber
            rowId
          }
        }
      }
    `,
    query
  );

  const {
    applicationByRowId: { announcements, ccbcNumber },
  } = queryFragment;

  const announcementsList = announcements.edges.map((announcement) => {
    return announcement.node;
  });

  const [formData, setFormData] = useState({} as any);
  const [isFormEditMode, setIsFormEditMode] = useState(false);
  const [announcementData, setAnnouncementData] = useState({} as any);

  const [createAnnouncement] = useCreateAnnouncementMutation();
  const [updateAnnouncement] = useUpdateAnnouncementMutation();
  const hiddenSubmitRef = useRef<HTMLButtonElement>(null);

  const isErrors = useMemo(() => {
    const formErrors = validateFormData(formData, announcementsSchema)?.errors;
    const filteredErrors = formErrors?.filter((error) => {
      return error.message !== 'should be string';
    });
    const isFormValid = filteredErrors.length <= 0;
    const url = formData?.announcementUrl;
    const isUrlValid = url && validator.isURL(url);
    return !isUrlValid || !isFormValid;
  }, [formData]);

  const handleResetFormData = () => {
    setIsFormEditMode(false);
    setFormData({});
    setAnnouncementData(null);
  };

  const handleSubmit = () => {
    hiddenSubmitRef.current.click();
    const ccbcList = formData?.otherProjectsInAnnouncement;

    const projectNumbers = concatCCBCNumbers(ccbcNumber, ccbcList);
    // eslint-disable-next-line no-underscore-dangle
    const relayConnectionId = announcements.__id;
    if (isErrors) return;
    if (!announcementData?.rowId) {
      createAnnouncement({
        variables: {
          connections: [relayConnectionId],
          input: {
            jsonData: formData,
            projectNumbers,
          },
        },
        onCompleted: () => handleResetFormData(),
      });
    } else {
      updateAnnouncement({
        variables: {
          input: {
            jsonData: formData,
            projectNumbers,
            oldRowId: announcementData.rowId,
          },
        },
        onCompleted: () => handleResetFormData(),
        updater: (store) => {
          updateStoreAfterMutation(store, relayConnectionId, announcementData);
        },
      });
    }
  };

  // Filter out this application CCBC ID
  const ccbcIdList = queryFragment.allApplications.nodes.filter(
    (application) => {
      return application.ccbcNumber !== ccbcNumber;
    }
  );

  // Overflow hidden is needed for animated edit transition though
  // visible is needed for the datepicker so we needed to set it on a
  // timeout to prevent buggy visual transition
  const [overflow, setOverflow] = useState(
    isFormEditMode ? 'visible' : 'hidden'
  );
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isFormEditMode && !isFirstRender) {
        setOverflow('visible');
      } else {
        setOverflow('hidden');
      }
      setIsFirstRender(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [isFormEditMode]);

  return (
    <StyledProjectForm
      before={
        <StyledAddButton
          isFormEditMode={isFormEditMode}
          onClick={() => setIsFormEditMode(true)}
        >
          <span>Add announcement</span>
          <FontAwesomeIcon icon={faPlus} />
        </StyledAddButton>
      }
      overflow={overflow}
      additionalContext={{ ccbcIdList }}
      formData={formData}
      handleChange={(e) => {
        setFormData({ ...e.formData });
      }}
      hiddenSubmitRef={hiddenSubmitRef}
      isFormEditMode={isFormEditMode}
      showEditBtn={false}
      title="Announcements"
      schema={announcementsSchema}
      uiSchema={announcementsUiSchema}
      theme={ProjectTheme}
      resetFormData={handleResetFormData}
      onSubmit={handleSubmit}
      setIsFormEditMode={(boolean) => setIsFormEditMode(boolean)}
      saveDataTestId="save-announcement"
    >
      <ViewAnnouncements
        announcements={announcementsList}
        isFormEditMode={isFormEditMode}
        setAnnouncementData={setAnnouncementData}
        setFormData={setFormData}
        setIsFormEditMode={setIsFormEditMode}
        style={{
          zIndex: isFormEditMode ? -1 : 1,
        }}
      />
    </StyledProjectForm>
  );
};

export default AnnouncementsForm;
