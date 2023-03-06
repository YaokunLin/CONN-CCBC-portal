import { screen } from '@testing-library/react';
import * as moduleApi from '@growthbook/growthbook-react';
import { FeatureResult, JSONValue } from '@growthbook/growthbook-react';
import History from 'pages/analyst/application/[applicationId]/history';
import PageTestingHelper from 'tests/utils/pageTestingHelper';
import compiledhistoryQuery, {
  historyQuery,
} from '__generated__/historyQuery.graphql';

const mockQueryPayload = {
  Query() {
    return {
      session: {
        sub: '4e0ac88c-bf05-49ac-948f-7fd53c7a9fd6',
      },
      applicationByRowId: {
        history: {
          nodes: [
            {
              applicationId: 6,
              createdAt: '2023-03-03T07:57:08.820373-08:00',
              familyName: '',
              item: 'application',
              givenName: '',
              op: 'INSERT',
              record: {
                id: 6,
                owner: '8aeecc40e7e74568bd8fa94e440f7e0b@bceidbasic',
                intake_id: null,
                created_at: '2023-03-03T07:57:08.820373-08:00',
                created_by: 3,
                updated_at: '2023-03-03T07:57:08.820373-08:00',
                updated_by: 3,
                archived_at: null,
                archived_by: null,
                ccbc_number: null,
              },
              recordId: '5074afcc-87be-5d86-b3da-f0df836635b2',
              sessionSub: '8aeecc40e7e74568bd8fa94e440f7e0b@bceidbasic',
              tableName: 'application',
            },
            {
              applicationId: 6,
              createdAt: '2023-03-03T07:57:08.820373-08:00',
              familyName: '',
              item: 'draft',
              givenName: '',
              op: 'INSERT',
              record: {
                id: 16,
                status: 'draft',
                created_at: '2023-03-03T07:57:08.820373-08:00',
                created_by: 3,
                change_reason: null,
                application_id: 6,
              },
              recordId: '14777180-f013-5613-b413-a11c4fa67cad',
              sessionSub: '8aeecc40e7e74568bd8fa94e440f7e0b@bceidbasic',
              tableName: 'application_status',
            },
            {
              applicationId: 6,
              createdAt: '2023-03-03T07:58:06.466171-08:00',
              familyName: '',
              item: 'submitted',
              givenName: '',
              op: 'INSERT',
              record: {
                id: 17,
                status: 'submitted',
                created_at: '2023-03-03T07:58:06.466171-08:00',
                created_by: 3,
                change_reason: null,
                application_id: 6,
              },
              recordId: '174e38d8-646d-5fef-acad-8d08f8cad09c',
              sessionSub: '8aeecc40e7e74568bd8fa94e440f7e0b@bceidbasic',
              tableName: 'application_status',
            },
            {
              applicationId: 6,
              createdAt: '2023-03-03T08:02:19.762303-08:00',
              familyName: 'bar',
              item: 'received',
              givenName: 'foo1',
              op: 'INSERT',
              record: {
                id: 19,
                status: 'received',
                created_at: '2023-03-03T08:02:19.762303-08:00',
                created_by: null,
                change_reason: null,
                application_id: 6,
              },
              recordId: 'd96f936e-a01a-5a9a-b3bf-77f902847857',
              sessionSub: 'mockUser@ccbc_auth_user',
              tableName: 'application_status',
            },
            {
              applicationId: 6,
              createdAt: '2023-03-03T08:02:55.547968-08:00',
              familyName: 'Bar',
              item: 'screening',
              givenName: 'Foo',
              op: 'INSERT',
              record: {
                id: 20,
                status: 'screening',
                created_at: '2023-03-03T08:02:55.547968-08:00',
                created_by: 2,
                change_reason: 'change reason screening',
                application_id: 6,
              },
              recordId: '7162d64b-6b89-505a-b9bc-29a047dcb26a',
              sessionSub: 'test-session-sub@idir',
              tableName: 'application_status',
            },
            {
              applicationId: 6,
              createdAt: '2023-03-03T08:22:39.146395-08:00',
              familyName: 'Bar',
              item: 'complete',
              givenName: 'Foo',
              op: 'INSERT',
              record: {
                id: 21,
                status: 'complete',
                created_at: '2023-03-03T08:22:39.146395-08:00',
                created_by: 2,
                change_reason: 'change reason complete',
                application_id: 6,
              },
              recordId: '667cf30e-51a5-5348-97ce-a78e8786edf0',
              sessionSub: 'test-session-sub@idir',
              tableName: 'application_status',
            },
            {
              applicationId: 6,
              createdAt: '2023-03-03T08:22:46.400664-08:00',
              familyName: 'Bar',
              item: 'assessment',
              givenName: 'Foo',
              op: 'INSERT',
              record: {
                id: 22,
                status: 'assessment',
                created_at: '2023-03-03T08:22:46.400664-08:00',
                created_by: 2,
                change_reason: 'change reason assessment',
                application_id: 6,
              },
              recordId: '00b9677c-0d5f-5fc1-8481-1b2203b6e6d3',
              sessionSub: 'test-session-sub@idir',
              tableName: 'application_status',
            },
            {
              applicationId: 6,
              createdAt: '2023-03-03T08:22:51.651375-08:00',
              familyName: 'Bar',
              item: 'on_hold',
              givenName: 'Foo',
              op: 'INSERT',
              record: {
                id: 23,
                status: 'on_hold',
                created_at: '2023-03-03T08:22:51.651375-08:00',
                created_by: 2,
                change_reason: 'change reason on hold',
                application_id: 6,
              },
              recordId: '3aed5763-8464-51ab-b686-28e0f32097f1',
              sessionSub: 'test-session-sub@idir',
              tableName: 'application_status',
            },
            {
              applicationId: 6,
              createdAt: '2023-03-03T08:51:23.818805-08:00',
              familyName: 'Bar',
              item: 'recommendation',
              givenName: 'Foo',
              op: 'INSERT',
              record: {
                id: 25,
                status: 'recommendation',
                created_at: '2023-03-03T08:51:23.818805-08:00',
                created_by: 2,
                change_reason: '',
                application_id: 6,
              },
              recordId: 'a3586616-c84c-5e36-b085-373d77817070',
              sessionSub: 'test-session-sub@idir',
              tableName: 'application_status',
            },
            {
              applicationId: 6,
              createdAt: '2023-03-03T08:51:41.058338-08:00',
              familyName: 'Bar',
              item: 'approved',
              givenName: 'Foo',
              op: 'INSERT',
              record: {
                id: 26,
                status: 'approved',
                created_at: '2023-03-03T08:51:41.058338-08:00',
                created_by: 2,
                change_reason: 'change reason approved',
                application_id: 6,
              },
              recordId: '38dbd2b8-7265-5a95-9d0a-ab654eac4492',
              sessionSub: 'test-session-sub@idir',
              tableName: 'application_status',
            },
            {
              applicationId: 6,
              createdAt: '2023-03-03T08:05:02.337632-08:00',
              familyName: '',
              item: 'file_10M.bin',
              givenName: '',
              op: 'INSERT',
              record: {
                id: 1,
                file: 'a7e1da27-ab21-4acc-9fe4-08a7c2de3839',
                file_name: 'file_10M.bin',
                file_size: '9.54 MB',
                file_type: 'application/macbinary',
                created_at: '2023-03-03T08:05:02.337632-08:00',
                created_by: 3,
                updated_at: '2023-03-03T08:05:02.337632-08:00',
                updated_by: 3,
                archived_at: null,
                archived_by: null,
                description: null,
                application_id: 6,
                application_status_id: null,
              },
              recordId: 'cfe82d9a-fdfc-5ac6-9433-36d0c912c35c',
              sessionSub: '8aeecc40e7e74568bd8fa94e440f7e0b@bceidbasic',
              tableName: 'attachment',
            },

            {
              applicationId: 6,
              createdAt: '2023-03-03T08:03:09.197851-08:00',
              familyName: 'Bar',
              item: 'screening',
              givenName: 'Foo',
              op: 'INSERT',
              record: {
                id: 7,
                json_data: {},
                created_at: '2023-03-03T08:03:09.197851-08:00',
                created_by: 2,
                updated_at: '2023-03-03T08:03:09.197851-08:00',
                updated_by: 2,
                archived_at: null,
                archived_by: null,
                application_id: 6,
                assessment_data_type: 'screening',
              },
              recordId: '5f47db93-e373-578e-97c7-e29b7c564c38',
              sessionSub: 'test-session-sub@idir',
              tableName: 'assessment_data',
            },
            {
              applicationId: 6,
              createdAt: '2023-03-03T08:03:14.904313-08:00',
              familyName: 'Bar',
              item: 'technical',
              givenName: 'Foo',
              op: 'INSERT',
              record: {
                id: 8,
                json_data: {},
                created_at: '2023-03-03T08:03:14.904313-08:00',
                created_by: 2,
                updated_at: '2023-03-03T08:03:14.904313-08:00',
                updated_by: 2,
                archived_at: null,
                archived_by: null,
                application_id: 6,
                assessment_data_type: 'technical',
              },
              recordId: 'ee151855-7281-53a5-a030-cd9a9e8c22b5',
              sessionSub: 'test-session-sub@idir',
              tableName: 'assessment_data',
            },
            {
              applicationId: 6,
              createdAt: '2023-03-03T08:03:21.365441-08:00',
              familyName: 'Bar',
              item: 'projectManagement',
              givenName: 'Foo',
              op: 'INSERT',
              record: {
                id: 9,
                json_data: {},
                created_at: '2023-03-03T08:03:21.365441-08:00',
                created_by: 2,
                updated_at: '2023-03-03T08:03:21.365441-08:00',
                updated_by: 2,
                archived_at: null,
                archived_by: null,
                application_id: 6,
                assessment_data_type: 'projectManagement',
              },
              recordId: 'b700cdce-1b3e-5a1b-a8f8-b2596395c84c',
              sessionSub: 'test-session-sub@idir',
              tableName: 'assessment_data',
            },
            {
              applicationId: 6,
              createdAt: '2023-03-03T08:12:35.285551-08:00',
              familyName: 'Bar',
              item: 'screening',
              givenName: 'Foo',
              op: 'INSERT',
              record: {
                id: 12,
                json_data: {},
                created_at: '2023-03-03T08:12:35.285551-08:00',
                created_by: 2,
                updated_at: '2023-03-03T08:12:35.285551-08:00',
                updated_by: 2,
                archived_at: null,
                archived_by: null,
                application_id: 6,
                assessment_data_type: 'screening',
              },
              recordId: 'f5926fb2-25e7-5c1c-b200-350af964cbbf',
              sessionSub: 'test-session-sub@idir',
              tableName: 'assessment_data',
            },
            {
              applicationId: 6,
              createdAt: '2023-03-03T08:06:24.621672-08:00',
              familyName: 'Bar',
              item: 'financialRisk',
              givenName: 'Foo',
              op: 'INSERT',
              record: {
                id: 10,
                json_data: {},
                created_at: '2023-03-03T08:06:24.621672-08:00',
                created_by: 2,
                updated_at: '2023-03-03T08:06:24.621672-08:00',
                updated_by: 2,
                archived_at: null,
                archived_by: null,
                application_id: 6,
                assessment_data_type: 'financialRisk',
              },
              recordId: '2d439cdb-ee31-5b91-b6db-cc8bc3fb0f63',
              sessionSub: 'test-session-sub@idir',
              tableName: 'assessment_data',
            },
            {
              applicationId: 6,
              createdAt: '2023-03-03T08:06:31.298479-08:00',
              familyName: 'Bar',
              item: 'permitting',
              givenName: 'Foo',
              op: 'INSERT',
              record: {
                id: 11,
                json_data: {},
                created_at: '2023-03-03T08:06:31.298479-08:00',
                created_by: 2,
                updated_at: '2023-03-03T08:06:31.298479-08:00',
                updated_by: 2,
                archived_at: null,
                archived_by: null,
                application_id: 6,
                assessment_data_type: 'permitting',
              },
              recordId: 'be57537b-1bcd-5620-b2ea-21f910cbb27e',
              sessionSub: 'test-session-sub@idir',
              tableName: 'assessment_data',
            },
            {
              applicationId: 6,
              createdAt: '2023-03-03T09:50:51.15027-08:00',
              familyName: 'Bar',
              item: 'screening',
              givenName: 'Foo',
              op: 'INSERT',
              record: {
                id: 13,
                json_data: {},
                created_at: '2023-03-03T09:50:51.15027-08:00',
                created_by: 2,
                updated_at: '2023-03-03T09:50:51.15027-08:00',
                updated_by: 2,
                archived_at: null,
                archived_by: null,
                application_id: 6,
                assessment_data_type: 'screening',
              },
              recordId: '25efae40-f000-591c-a43d-7ba95b807c06',
              sessionSub: 'test-session-sub@idir',
              tableName: 'assessment_data',
            },
            {
              applicationId: 6,
              createdAt: '2023-03-03T08:03:36.184206-08:00',
              familyName: 'Bar',
              item: '["Missing files or information"]',
              givenName: 'Foo',
              op: 'INSERT',
              record: {
                id: 2,
                json_data: {},
                created_at: '2023-03-03T08:03:36.184206-08:00',
                created_by: 2,
                rfi_number: 'CCBC-020001-1',
                updated_at: '2023-03-03T08:03:36.184206-08:00',
                updated_by: 2,
                archived_at: null,
                archived_by: null,
                rfi_data_status_type_id: 'draft',
              },
              recordId: '7fac1fe1-27e6-5e03-a79a-f48208afd8f4',
              sessionSub: 'test-session-sub@idir',
              tableName: 'rfi_data',
            },
            {
              applicationId: 6,
              createdAt: '2023-03-03T08:05:20.645457-08:00',
              familyName: '',
              item: '["Missing files or information"]',
              givenName: '',
              op: 'INSERT',
              record: {
                id: 3,
                json_data: {},
                created_at: '2023-03-03T08:05:20.645457-08:00',
                created_by: 3,
                rfi_number: 'CCBC-020001-1',
                updated_at: '2023-03-03T08:05:20.645457-08:00',
                updated_by: 3,
                archived_at: null,
                archived_by: null,
                rfi_data_status_type_id: 'draft',
              },
              recordId: '9a5795e4-ee20-591c-90b4-b795bb2b9cff',
              sessionSub: '8aeecc40e7e74568bd8fa94e440f7e0b@bceidbasic',
              tableName: 'rfi_data',
            },

            {
              applicationId: 6,
              createdAt: '2023-03-03T08:06:16.628756-08:00',
              familyName: 'Bar',
              item: '["Technical", "Missing files or information"]',
              givenName: 'Foo',
              op: 'INSERT',
              record: {
                id: 7,
                json_data: {},
                created_at: '2023-03-03T08:06:16.628756-08:00',
                created_by: 2,
                rfi_number: 'CCBC-020001-1',
                updated_at: '2023-03-03T08:06:16.628756-08:00',
                updated_by: 2,
                archived_at: null,
                archived_by: null,
                rfi_data_status_type_id: 'draft',
              },
              recordId: '668be64e-f279-5c85-baca-e3681f609912',
              sessionSub: 'test-session-sub@idir',
              tableName: 'rfi_data',
            },
            {
              applicationId: 6,
              createdAt: '2023-03-03T08:22:17.13179-08:00',
              familyName: 'Bar',
              item: '["Technical", "Missing files or information"]',
              givenName: 'Foo',
              op: 'INSERT',
              record: {
                id: 8,
                json_data: {},
                created_at: '2023-03-03T08:22:17.13179-08:00',
                created_by: 2,
                rfi_number: 'CCBC-020001-1',
                updated_at: '2023-03-03T08:22:17.13179-08:00',
                updated_by: 2,
                archived_at: null,
                archived_by: null,
                rfi_data_status_type_id: 'draft',
              },
              recordId: '1410a060-5616-50cc-8792-5aa220a3346f',
              sessionSub: 'test-session-sub@idir',
              tableName: 'rfi_data',
            },
            {
              applicationId: 6,
              createdAt: '2023-03-03T08:22:06.589845-08:00',
              familyName: 'Bar',
              item: null,
              givenName: 'Foo',
              op: 'INSERT',
              record: {
                id: 9,
                json_data: {},
                created_at: '2023-03-03T08:22:06.589845-08:00',
                created_by: 2,
                updated_at: '2023-03-03T08:22:06.589845-08:00',
                updated_by: 2,
                archived_at: null,
                archived_by: null,
                form_schema_id: 1,
                last_edited_page: null,
                reason_for_change: 'my change reason',
                form_data_status_type_id: 'pending',
              },
              recordId: 'a9702e4f-37b7-5915-998f-63449d26c500',
              sessionSub: 'test-session-sub@idir',
              tableName: 'form_data',
            },
            {
              applicationId: 6,
              createdAt: '2023-03-06T09:24:53.482996-08:00',
              familyName: 'Bar',
              item: '6',
              givenName: 'Foo',
              op: 'INSERT',
              record: {
                id: 6,
                package: 6,
                created_at: '2023-03-06T09:24:53.482996-08:00',
                created_by: 2,
                updated_at: '2023-03-06T09:24:53.482996-08:00',
                updated_by: 2,
                archived_at: null,
                archived_by: null,
                application_id: 6,
              },
              recordId: '47fa0d90-8d4e-554e-858d-5133495e2508',
              sessionSub: 'test-session-sub@idir',
              tableName: 'application_package',
            },
            {
              applicationId: 6,
              createdAt: '2023-03-06T09:24:44.034951-08:00',
              familyName: 'Bar',
              item: 'Foo Bar',
              givenName: 'Foo',
              op: 'INSERT',
              record: {
                id: 10,
                analyst_id: 1,
                created_at: '2023-03-06T09:24:44.034951-08:00',
                created_by: 2,
                updated_at: '2023-03-06T09:24:44.034951-08:00',
                updated_by: 2,
                archived_at: null,
                archived_by: null,
                application_id: 6,
              },
              recordId: 'a0075805-9cf3-5ae0-b047-8ba47ffbf40f',
              sessionSub: 'test-session-sub@idir',
              tableName: 'application_analyst_lead',
            },
          ],
        },
      },
    };
  },
};

const mockShowHistory: FeatureResult<JSONValue> = {
  value: true,
  source: 'defaultValue',
  on: null,
  off: null,
  ruleId: 'show_history',
};

const pageTestingHelper = new PageTestingHelper<historyQuery>({
  pageComponent: History,
  compiledQuery: compiledhistoryQuery,
  defaultQueryResolver: mockQueryPayload,
  defaultQueryVariables: {
    rowId: 1,
  },
});

describe('The index page', () => {
  beforeEach(() => {
    pageTestingHelper.reinit();
    pageTestingHelper.setMockRouterValues({
      query: { applicationId: '1' },
    });
    jest.spyOn(moduleApi, 'useFeature').mockReturnValue(mockShowHistory);
  });

  it('displays the title', async () => {
    pageTestingHelper.loadQuery();
    pageTestingHelper.renderPage();

    expect(screen.getByRole('heading', { name: 'History' })).toBeVisible();
  });

  it('displays application was created history', async () => {
    pageTestingHelper.loadQuery();
    pageTestingHelper.renderPage();

    expect(screen.getByTestId('history-content-application')).toHaveTextContent(
      'The applicant created the Application on Mar 3, 2023, 7:57 a.m.'
    );
  });

  it('shows the correct status history for Received status', async () => {
    pageTestingHelper.loadQuery();
    pageTestingHelper.renderPage();

    expect(
      screen.getAllByTestId('history-content-status')[0]
    ).toHaveTextContent(
      'The application was Received on Mar 3, 2023, 8:02 a.m.'
    );
  });

  it('shows the correct status history', async () => {
    pageTestingHelper.loadQuery();
    pageTestingHelper.renderPage();

    expect(
      screen.getAllByTestId('history-content-status')[1]
    ).toHaveTextContent(
      'Foo Bar changed the status to Screening on Mar 3, 2023, 8:02 a.m.'
    );
  });

  it('shows the correct assessment history', async () => {
    pageTestingHelper.loadQuery();
    pageTestingHelper.renderPage();

    expect(
      screen.getAllByTestId('history-content-assessment')[0]
    ).toHaveTextContent(
      'Foo Bar saved the screening Assessment on Mar 3, 2023, 8:03 a.m.'
    );

    expect(
      screen.getAllByTestId('history-content-assessment')[1]
    ).toHaveTextContent(
      'Foo Bar saved the technical Assessment on Mar 3, 2023, 8:03 a.m.'
    );

    expect(
      screen.getAllByTestId('history-content-assessment')[2]
    ).toHaveTextContent(
      'Foo Bar saved the Project Management Assessment on Mar 3, 2023, 8:03 a.m.'
    );
  });

  it('shows the correct rfi history', async () => {
    pageTestingHelper.loadQuery();
    pageTestingHelper.renderPage();

    expect(screen.getAllByTestId('history-content-rfi')[0]).toHaveTextContent(
      'Foo Bar saved RFI-CCBC-020001-1 on Mar 3, 2023, 8:03 a.m.'
    );
  });

  it('shows the correct applicant reply rfi history', async () => {
    pageTestingHelper.loadQuery();
    pageTestingHelper.renderPage();

    expect(
      screen.getAllByTestId('history-content-attachment')[0]
    ).toHaveTextContent(
      'The applicant uploaded a file on Mar 3, 2023, 8:05 a.m.'
    );

    expect(screen.getAllByTestId('history-content-rfi')[1]).toHaveTextContent(
      'The applicant saved RFI-CCBC-020001-1 on Mar 3, 2023, 8:05 a.m.'
    );
  });

  it('shows the correct history for editing an application', async () => {
    pageTestingHelper.loadQuery();
    pageTestingHelper.renderPage();

    expect(
      screen.getAllByTestId('history-content-form-data')[0]
    ).toHaveTextContent(
      'Foo Bar edited the Application on Mar 3, 2023, 8:22 a.m.'
    );
  });

  it('shows the correct history for assign package', async () => {
    pageTestingHelper.loadQuery();
    pageTestingHelper.renderPage();

    expect(
      screen.getAllByTestId('history-content-package')[0]
    ).toHaveTextContent(
      'Foo Bar added the application to a Package on Mar 6, 2023, 9:24 a.m.'
    );
  });

  it('shows the correct history for assign lead', async () => {
    pageTestingHelper.loadQuery();
    pageTestingHelper.renderPage();

    expect(
      screen.getAllByTestId('history-content-analyst-lead')[0]
    ).toHaveTextContent(
      'Foo Bar assigned Lead to Foo Bar on Mar 6, 2023, 9:24 a.m.'
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
