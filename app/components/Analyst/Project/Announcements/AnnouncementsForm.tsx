import { useState } from 'react';
import { graphql, useFragment } from 'react-relay';
import { ProjectForm } from 'components/Analyst/Project';
import ViewAnnouncements from 'components/Analyst/Project/Announcements/ViewAnnouncements';
import announcementsSchema from 'formSchema/analyst/announcements';
import announcementsUiSchema from 'formSchema/uiSchema/analyst/announcementsUiSchema';
import { useCreateAnnouncementMutation } from 'schema/mutations/project/createAnnouncement';
import ProjectTheme from '../ProjectTheme';

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

  const [newFormData, setNewFormData] = useState({} as any);
  const [oldFormData] = useState({});
  const [isFormEditMode, setIsFormEditMode] = useState(true);

  const [createAnnouncement] = useCreateAnnouncementMutation();

  const concatCCBCNumbers = (currentCcbcNumber, ccbcNumberList) => {
    if (!ccbcNumberList || ccbcNumberList?.length === 0)
      return currentCcbcNumber;
    let projectNumbers = '';
    ccbcNumberList.forEach((application) => {
      projectNumbers += `${application.ccbcNumber},`;
    });
    return `${currentCcbcNumber},${projectNumbers}`;
  };

  const handleSubmit = (e) => {
    const ccbcList = newFormData?.otherProjectsInAnnouncement;

    const projectNumbers = concatCCBCNumbers(ccbcNumber, ccbcList);
    // eslint-disable-next-line no-underscore-dangle
    const relayConnectionId = announcements.__id;

    e.preventDefault();
    createAnnouncement({
      variables: {
        connections: [relayConnectionId],
        input: {
          jsonData: newFormData,
          projectNumbers,
        },
      },
      onCompleted: () => {
        setIsFormEditMode(false);
      },
    });
  };

  const handleResetFormData = () => {
    setNewFormData(oldFormData);
  };

  // Filter out this application CCBC ID
  const ccbcIdList = queryFragment.allApplications.nodes.filter(
    (application) => {
      return application.ccbcNumber !== ccbcNumber;
    }
  );

  const announcementsList = announcements.edges.map((announcement) => {
    return announcement.node.jsonData;
  });

  return (
    <ProjectForm
      additionalContext={{ ccbcIdList }}
      formData={newFormData}
      handleChange={(e) => {
        setNewFormData({ ...e.formData });
      }}
      isFormEditMode={isFormEditMode}
      title="Announcements"
      schema={isFormEditMode ? announcementsSchema : {}}
      uiSchema={isFormEditMode ? announcementsUiSchema : {}}
      theme={ProjectTheme}
      resetFormData={handleResetFormData}
      onSubmit={handleSubmit}
      setIsFormEditMode={(boolean) => setIsFormEditMode(boolean)}
    >
      <ViewAnnouncements announcements={announcementsList} />
    </ProjectForm>
  );
};

export default AnnouncementsForm;
