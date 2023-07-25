import communityProgressReport from 'formSchema/analyst/communityProgressReport';
import communityProgressReportUiSchema from 'formSchema/uiSchema/analyst/communityProgressReportUiSchema';
import { useState } from 'react';
import ProjectTheme from '../ProjectTheme';
import ProjectForm from '../ProjectForm';
import AddButton from '../AddButton';

const handleSubmit = (e) => {
  e.preventDefault();
  // TODO
};

const CommunityProgressReportForm = () => {
  const [formData, setFormData] = useState({});
  const [isFormEditMode, setIsFormEditMode] = useState(false);

  const handleResetFormData = () => {
    setIsFormEditMode(false);
    setFormData({});
  };

  return (
    <ProjectForm
      schema={communityProgressReport}
      uiSchema={communityProgressReportUiSchema}
      formData={formData}
      theme={ProjectTheme}
      onSubmit={handleSubmit}
      formAnimationHeight={400}
      isFormAnimated
      isFormEditMode={isFormEditMode}
      setIsFormEditMode={(boolean) => setIsFormEditMode(boolean)}
      saveBtnText="Save"
      title="Community progress report"
      handleChange={(e) => {
        setFormData({ ...e.formData });
      }}
      resetFormData={handleResetFormData}
      showEditBtn={false}
      before={
        <AddButton
          isFormEditMode={isFormEditMode}
          onClick={() => setIsFormEditMode(true)}
          title="Add community progress report"
        />
      }
    />
  );
};

export default CommunityProgressReportForm;
