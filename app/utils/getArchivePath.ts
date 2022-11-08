const COVERAGE = 'Step 1 - Eligibility Mapping & Statistics';
const TEMPLATE_UPLOADS = 'Step 2 - Templates';
const SUPPORTING_DOCUMENTS = 'Step 4 - Supporting Documents';

/*
Paths for the folder structure of our s3 zip archive

Supported variables which get replaced in the path are:
  $id: the CCBC id assigned to an application when it is submitted
  $fileName: the name of the file
*/

const archivePaths = {
  // Template Uploads
  eligibilityAndImpactsCalculator: {
    path: `/$id/${TEMPLATE_UPLOADS}/$id - Template 1`,
  },
  detailedBudget: {
    path: `/$id/${TEMPLATE_UPLOADS}/$id - Template 2`,
  },
  financialForecast: {
    path: `/$id/${TEMPLATE_UPLOADS}/$id - Template 3`,
  },
  lastMileIspOffering: {
    path: `/$id/${TEMPLATE_UPLOADS}/$id - Template 4`,
  },
  popWholesalePricing: {
    path: `/$id/${TEMPLATE_UPLOADS}/$id - Template 5`,
  },
  communityRuralDevelopmentBenefitsTemplate: {
    path: `/$id/${TEMPLATE_UPLOADS}/$id - Template 6`,
  },
  wirelessAddendum: {
    path: `/$id/${TEMPLATE_UPLOADS}/$id - Template 7`,
  },
  supportingConnectivityEvidence: {
    path: `/$id/${TEMPLATE_UPLOADS}/$id - Template 8`,
  },
  geographicNames: {
    path: `/$id/${TEMPLATE_UPLOADS}/$id - Template 9`,
  },
  equipmentDetails: {
    path: `/$id/${TEMPLATE_UPLOADS}/$id - Template 10`,
  },
  // Supporting Documents
  copiesOfRegistration: {
    path: `/$id/${SUPPORTING_DOCUMENTS}/Incorporation documents/$id - $fileName`,
  },
  preparedFinancialStatements: {
    path: `/$id/${SUPPORTING_DOCUMENTS}/Independently prepared financial statements/$id - $fileName`,
  },
  logicalNetworkDiagram: {
    path: `/$id/${SUPPORTING_DOCUMENTS}/Logical network diagram/$id - $fileName`,
  },
  projectSchedule: {
    path: `/$id/${SUPPORTING_DOCUMENTS}/Project schedule (Gantt chart)/$id - $fileName`,
  },
  communityRuralDevelopmentBenefits: {
    path: `/$id/${SUPPORTING_DOCUMENTS}/Supporting documents for benefits/$id - $fileName`,
  },
  otherSupportingMaterials: {
    path: `/$id/${SUPPORTING_DOCUMENTS}/Other supporting documents/$id - $fileName`,
  },
  // Coverage
  geographicCoverageMap: {
    path: `/$id/${COVERAGE}/Coverage map/$id - $fileName`,
  },
  coverageAssessmentStatistics: {
    path: `/$id/${COVERAGE}/Statistics email confirmation/$id - $fileName`,
  },
  currentNetworkInfastructure: {
    path: `/$id/${COVERAGE}/Current network infrastructure/$id - $fileName`,
  },
  upgradedNetworkInfrastructure: {
    path: `/$id/${COVERAGE}/Upgraded network infrastructure/$id - $fileName`,
  },
};

const getArchivePath = (
  fieldName: string,
  ccbcId: string,
  fileName: string
) => {
  const { path } = archivePaths[fieldName];

  return path.replaceAll('$id', ccbcId).replaceAll('$fileName', fileName);
};

export default getArchivePath;
