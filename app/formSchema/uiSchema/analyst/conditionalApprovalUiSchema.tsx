import {
  BCHeader,
  ISEDHeader,
} from 'components/Analyst/Project/ConditionalApproval';

const conditionalApprovalUiSchema = {
  'ui:order': [
    'decision',
    'ministerDecision',
    'ministerDate',
    'ministerAnnouncement',
    'isedDecisionObj',
    'isedDecision',
    'isedDate',
    'isedAnnouncement',
    'letterOfApproval',
    'response',
  ],
  'ui:field': 'SectionField',
  'ui:options': {
    dividers: true,
  },
  decision: {
    'ui:title': `Minister's decision`,
    'ui:options': {
      flexDirection: 'column',
    },
    'ui:before': <BCHeader />,
    ministerDecision: {
      'ui:widget': 'SelectWidget',
      'ui:placeholder': 'No decision',
    },
    ministerDate: {
      'ui:widget': 'DatePickerWidget',
      'ui:options': {
        isClearable: true,
      },
    },
    ministerAnnouncement: {
      'ui:widget': 'SelectWidget',
      'ui:placeholder': 'No recommendation',
    },
  },
  isedDecisionObj: {
    'ui:title': '‎',
    'ui:options': {
      flexDirection: 'column',
    },
    'ui:before': <ISEDHeader />,
    isedDecision: {
      'ui:widget': 'SelectWidget',
      'ui:placeholder': 'No decision',
    },
    isedDate: {
      'ui:widget': 'DatePickerWidget',
      'ui:options': {
        isClearable: true,
      },
    },
    isedAnnouncement: {
      'ui:widget': 'SelectWidget',
      'ui:placeholder': 'No recommendation',
    },
  },

  letterOfApproval: {
    'ui:title': "Minister's decision, letter, and response",
    'ui:options': {
      buttonVariant: 'secondary',
      flexDirection: 'column',
    },
    letterOfApprovalUpload: {
      'ui:widget': 'FileWidget',
      'ui:options': {
        buttonVariant: 'secondary',
        allowMultipleFiles: true,
      },
    },
    letterOfApprovalDateSent: {
      'ui:title': 'Date letter sent to applicant',
      'ui:widget': 'DatePickerWidget',
      'ui:options': {
        isClearable: true,
      },
    },
  },
  response: {
    'ui:title': `Applicant's response`,
    'ui:options': {
      flexDirection: 'column',
    },
    applicantResponse: {
      'ui:widget': 'SelectWidget',
      'ui:placeholder': 'Not Received',
    },
    statusApplicantSees: {
      'ui:title': 'Status that applicant sees',
      'ui:widget': 'StatusSelectWidget',
      'ui:placeholder': 'Received',
    },
  },
};

export default conditionalApprovalUiSchema;
