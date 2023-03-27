import { JSONSchema7 } from 'json-schema';

const gis: JSONSchema7 = {
  title: ' ',
  description: '',
  type: 'object',
  required: [
    'assignedTo',
    'targetDate',
    'nextStep',
    'commentsOnCoverageData',
    'commentsOnHouseholdCounts',
    'commentsOnOverbuild',
    'commentsOnOverlap',
  ],
  properties: {
    assignedTo: {
      title: 'Assigned to',
      type: 'string',
    },
    targetDate: {
      title: 'Target date',
      type: 'string',
    },
    nextStep: {
      title: 'Progress',
      type: 'string',
      enum: [
        'Not started',
        'Needs RFI',
        'Needs 2nd review',
        'No obvious flags identified at this stage',
      ],
      default: 'Not started',
    },
    commentsOnCoverageData: {
      title: 'Comments on coverage data',
      type: 'string',
    },
    commentsOnHouseholdCounts: {
      title: 'Comments on household counts',
      type: 'string',
    },
    commentsOnOverbuild: {
      title: 'Comments on overbuild',
      type: 'string',
    },
    commentsOnOverlap: {
      title: 'Comments on overlap',
      type: 'string',
    },
  },
};

export default gis;
