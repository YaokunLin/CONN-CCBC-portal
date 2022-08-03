import { useFeature } from '@growthbook/growthbook-react';
import {
  acknowledgements,
  alternateContact,
  authorizedContact,
  benefits,
  budgetDetails,
  contactInformation,
  estimatedProjectEmployment,
  existingNetworkCoverage,
  mapping,
  organizationLocation,
  organizationProfile,
  otherFundingSources,
  projectArea,
  projectInformation,
  projectFunding,
  projectPlan,
  submission,
  supportingDocuments,
  review,
  techSolution,
  templateUploads,
} from './pages';

const useSchema = () => {
  // Check if development form is enabled in growthbook and pass to schema
  const formAlternateContact = useFeature('form-alternate-contact').value;
  const formAuthorizedContact = useFeature('form-authorized-contact').value;
  const formBenefits = useFeature('form-benefits').value;
  const formBudgetDetails = useFeature('form-budget-details').value;
  const formContactInformation = useFeature('form-contact-information').value;
  const formEstimatedProjectEmployment = useFeature(
    'form-estimated-project-employment'
  ).value;
  const formExistingNetworkCoverage = useFeature(
    'form-existing-network-coverage'
  ).value;
  const formMapping = useFeature('form-mapping').value;
  const formOrganizationLocation = useFeature(
    'form-organization-location'
  ).value;
  const formOtherFundingSources = useFeature(
    'form-other-funding-sources'
  ).value;
  const formOrganizationProfile = useFeature('form-organization-profile').value;
  const formProjectArea = useFeature('form-project-area').value;
  const formProjectInformation = useFeature('form-project-information').value;
  const formProjectFunding = useFeature('form-project-funding').value;
  const formProjectPlan = useFeature('form-project-plan').value;
  const formSupportingDocuments = useFeature('form-supporting-documents').value;
  const formTechSolution = useFeature('form-tech-solution').value;
  const formTemplateUploads = useFeature('form-template-uploads').value;

  const schema = {
    type: 'object',
    properties: {
      ...(formProjectInformation && {
        ...projectInformation,
      }),
      ...(formProjectArea && {
        ...projectArea,
      }),
      ...(formExistingNetworkCoverage && {
        ...existingNetworkCoverage,
      }),
      ...(formBudgetDetails && {
        ...budgetDetails,
      }),
      ...(formProjectFunding && {
        ...projectFunding,
      }),
      ...(formOtherFundingSources && {
        ...otherFundingSources,
      }),
      ...(formTechSolution && {
        ...techSolution,
      }),
      ...(formBenefits && {
        ...benefits,
      }),
      ...(formProjectPlan && {
        ...projectPlan,
      }),
      ...(formEstimatedProjectEmployment && {
        ...estimatedProjectEmployment,
      }),
      ...(formTemplateUploads && {
        ...templateUploads,
      }),
      ...(formSupportingDocuments && {
        ...supportingDocuments,
      }),
      ...(formMapping && {
        ...mapping,
      }),
      ...(formOrganizationProfile && {
        ...organizationProfile,
      }),
      ...(formOrganizationLocation && {
        ...organizationLocation,
      }),
      ...(formContactInformation && {
        ...contactInformation,
      }),
      ...(formAuthorizedContact && {
        ...authorizedContact,
      }),
      ...(formAlternateContact && {
        ...alternateContact,
      }),
      ...review,
      ...acknowledgements,
      ...submission,
    },
  };

  return schema;
};
export default useSchema;
