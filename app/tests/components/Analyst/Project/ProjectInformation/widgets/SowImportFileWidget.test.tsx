import ProjectInformationForm from 'components/Analyst/Project/ProjectInformation/ProjectInformationForm';
import { graphql } from 'react-relay';
import compiledQuery, {
  SowImportFileWidgetTestQuery,
} from '__generated__/SowImportFileWidgetTestQuery.graphql';
import { act, fireEvent, screen } from '@testing-library/react';
import { schema } from 'formSchema';
import ComponentTestingHelper from 'tests/utils/componentTestingHelper';

const testQuery = graphql`
  query SowImportFileWidgetTestQuery {
    # Spread the fragment you want to test here
    application(id: "TestApplicationID") {
      ...ProjectInformationForm_application
    }
  }
`;

const mockQueryPayload = {
  Application() {
    return {
      id: 'testId',
      rowId: 1,
      projectInformation: {
        id: 'testId',
        jsonData: null,
      },
    };
  },
};

const mockFormDataPayload = {
  Application() {
    return {
      id: 'TestApplicationID',
      projectInformation: {
        formByFormSchemaId: {
          jsonSchema: schema,
        },
        jsonData: {
          hasFundingAgreementBeenSigned: true,
          main: {
            upload: {
              statementOfWorkUpload: [
                {
                  id: 3,
                  uuid: 'a365945b-5631-4e52-af9f-515e6fdcf614',
                  name: 'file-2.kmz',
                  size: 0,
                  type: 'application/vnd.google-earth.kmz',
                },
              ],
            },
          },
        },
      },
    };
  },
};

global.fetch = jest.fn(() => Promise.resolve({ status: 200 }));

const componentTestingHelper =
  new ComponentTestingHelper<SowImportFileWidgetTestQuery>({
    component: ProjectInformationForm,
    testQuery,
    compiledQuery,
    defaultQueryResolver: mockQueryPayload,
    getPropsFromTestQuery: (data) => ({
      application: data.application,
    }),
  });

describe('The SowImportFileWidget', () => {
  beforeEach(() => {
    componentTestingHelper.reinit();
    componentTestingHelper.setMockRouterValues({
      query: { id: '1' },
    });
  });

  it('should render the file widget description', async () => {
    componentTestingHelper.loadQuery();
    componentTestingHelper.renderComponent();

    const hasFundingAggreementBeenSigned = screen.getByLabelText('Yes');

    expect(hasFundingAggreementBeenSigned).not.toBeChecked();

    await act(async () => {
      fireEvent.click(hasFundingAggreementBeenSigned);
    });

    expect(
      screen.getByText('Upload the completed statement of work Excel file')
    ).toBeInTheDocument();
  });

  it('calls createAttachmentMutation and renders the filename and correct button label', async () => {
    componentTestingHelper.loadQuery();
    componentTestingHelper.renderComponent();

    const hasFundingAggreementBeenSigned = screen.getByLabelText('Yes');

    expect(hasFundingAggreementBeenSigned).not.toBeChecked();

    await act(async () => {
      fireEvent.click(hasFundingAggreementBeenSigned);
    });

    const file = new File([new ArrayBuffer(1)], 'file.xlsx', {
      type: 'application/excel',
    });

    const inputFile = screen.getAllByTestId('file-test')[1];

    await act(async () => {
      fireEvent.change(inputFile, { target: { files: [file] } });
    });

    componentTestingHelper.expectMutationToBeCalled(
      'createAttachmentMutation',
      {
        input: {
          attachment: {
            file,
            fileName: 'file.xlsx',
            fileSize: '1 Bytes',
            fileType: 'application/excel',
            applicationId: 1,
          },
        },
      }
    );

    act(() => {
      componentTestingHelper.environment.mock.resolveMostRecentOperation({
        data: {
          createAttachment: {
            attachment: {
              rowId: 1,
              file: 'string',
            },
          },
        },
      });
    });

    expect(screen.getByText('Replace')).toBeInTheDocument();
    expect(screen.getByText('file.xlsx')).toBeInTheDocument();
  });

  it('calls deleteAttachmentMutation and renders the correct filename and button label', async () => {
    componentTestingHelper.loadQuery(mockFormDataPayload);
    componentTestingHelper.renderComponent();

    const editButton = screen.getByTestId('project-form-edit-button');

    await act(async () => {
      fireEvent.click(editButton);
    });

    expect(screen.getByText('file-2.kmz')).toBeInTheDocument();
    expect(screen.getByText('Replace')).toBeInTheDocument();

    const deleteButton = screen.getByTestId('file-delete-btn');

    deleteButton.click();

    componentTestingHelper.expectMutationToBeCalled(
      'deleteAttachmentMutation',
      {
        input: {
          attachmentPatch: {
            archivedAt: expect.any(String),
          },
          rowId: 3,
        },
      }
    );

    act(() => {
      componentTestingHelper.environment.mock.resolveMostRecentOperation({
        data: {
          deleteAttachment: {
            attachment: {
              rowId: 3,
            },
          },
        },
      });
    });

    expect(screen.queryByText('file-2.kmz')).toBeNull();
    expect(screen.queryByText('Replace')).toBeNull();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
