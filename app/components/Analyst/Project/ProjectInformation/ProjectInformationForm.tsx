import { useState } from 'react';
import { graphql, useFragment } from 'react-relay';
import ProjectForm from 'components/Analyst/Project/ProjectForm';
import projectInformationSchema from 'formSchema/analyst/projectInformation';
import projectInformationReadOnlySchema from 'formSchema/analyst/projectInformationReadOnly';
import projectInformationUiSchema from 'formSchema/uiSchema/analyst/projectInformationUiSchema';
import projectInformationReadOnlyUiSchema from 'formSchema/uiSchema/analyst/projectInformationReadOnlyUiSchema';
import { useCreateProjectInformationMutation } from 'schema/mutations/project/createProjectInformation';
import ProjectTheme from 'components/Analyst/Project/ProjectTheme';
import MetabaseLink from 'components/Analyst/Project/ProjectInformation/MetabaseLink';
import Toast from 'components/Toast';

const ProjectInformationForm = ({ application }) => {
  const queryFragment = useFragment(
    graphql`
      fragment ProjectInformationForm_application on Application {
        id
        rowId
        projectInformation {
          id
          jsonData
        }
      }
    `,
    application
  );

  const { rowId, projectInformation } = queryFragment;

  const [createProjectInformation] = useCreateProjectInformationMutation();
  const [formData, setFormData] = useState(projectInformation?.jsonData);
  const [showToast, setShowToast] = useState(false);
  const [isFormEditMode, setIsFormEditMode] = useState(
    !projectInformation?.jsonData
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    createProjectInformation({
      variables: {
        input: { _applicationId: rowId, _jsonData: formData },
      },
      onCompleted: () => {
        setIsFormEditMode(false);

        // May need to change when the toast is shown when we add validation
        setShowToast(true);
      },
    });
  };

  const handleResetFormData = () => {
    setFormData({});
    setShowToast(false);
  };

  return (
    <ProjectForm
      formData={formData}
      handleChange={(e) => {
        setFormData({ ...e.formData });
      }}
      isFormEditMode={isFormEditMode}
      title="Project information"
      schema={
        isFormEditMode
          ? projectInformationSchema
          : projectInformationReadOnlySchema
      }
      theme={ProjectTheme}
      uiSchema={
        isFormEditMode
          ? projectInformationUiSchema
          : projectInformationReadOnlyUiSchema
      }
      resetFormData={handleResetFormData}
      onSubmit={handleSubmit}
      saveBtnText="Save & Import Data"
      setIsFormEditMode={(boolean) => setIsFormEditMode(boolean)}
    >
      {!isFormEditMode && <MetabaseLink />}
      {showToast && (
        <Toast timeout={100000000}>
          Statement of Work successfully imported
        </Toast>
      )}
    </ProjectForm>
  );
};

export default ProjectInformationForm;
