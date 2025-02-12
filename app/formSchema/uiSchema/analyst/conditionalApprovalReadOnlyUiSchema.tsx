import conditionalApprovalUiSchema from './conditionalApprovalUiSchema';

const conditionalApprovalReadOnlyUiSchema = {
  ...conditionalApprovalUiSchema,
  decision: {
    ...conditionalApprovalUiSchema.decision,
    ministerDecision: {
      'ui:widget': 'ReadOnlyDecisionWidget',
    },
  },
  isedDecisionObj: {
    ...conditionalApprovalUiSchema.isedDecisionObj,
    isedDecision: {
      'ui:widget': 'ReadOnlyDecisionWidget',
    },
  },
  letterOfApproval: {
    ...conditionalApprovalUiSchema.letterOfApproval,
    letterOfApprovalDateSent: {
      'ui:widget': 'HiddenWidget',
    },
  },
  response: {
    ...conditionalApprovalUiSchema.response,
    applicantResponse: {
      'ui:widget': 'ReadOnlyResponseWidget',
    },
    statusApplicantSees: {
      'ui:widget': 'HiddenWidget',
    },
  },
};

export default conditionalApprovalReadOnlyUiSchema;
