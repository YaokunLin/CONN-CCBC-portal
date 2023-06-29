-- Deploy ccbc:missing_metadata to pg

begin;

-- Table: ccbc_public.analyst
comment on column ccbc_public.analyst.active is 'Boolean column indicating whether the analyst is active or not.';

-- Table: ccbc_public.application_announcement
comment on column ccbc_public.application_announcement.history_operation is 'Column describing the operation (created, updated, deleted) for context on the history page';

-- Table: ccbc_public.application_gis_data
comment on table ccbc_public.application_gis_data is 'Table containing the GIS data for the application';
comment on column ccbc_public.application_gis_data.id is 'Primary key and unique identifier';
comment on column ccbc_public.application_gis_data.application_id is 'The application_id of the application this record is associated with';
comment on column ccbc_public.application_gis_data.batch_id is 'The batch_id is the unique identifier for the batch of gis data that was uploaded';
comment on column ccbc_public.application_gis_data.json_data is 'The GIS data for the application in JSON format';

-- Table: ccbc_public.application_package
comment on column ccbc_public.application_package.application_id is 'The application_id of the application this record is associated with';
comment on column ccbc_public.application_package.package is 'The package number the application is assigned to';

-- Table: ccbc_public.application_status
comment on column ccbc_public.application_status.status is 'The status of the application';

-- Table: ccbc_public.application_status_type
comment on column ccbc_public.application_status_type.visible_by_applicant is 'Boolean column used to differentiate internal/external status by indicating whether the status is visible to the applicant or not.';
comment on column ccbc_public.application_status_type.visible_by_analyst is 'Boolean column used to differentiate internal/external status by indicating whether the status is visible to the analyst or not.';
comment on column ccbc_public.application_status_type.status_order is 'The logical order in which the status should be displayed.';

-- Table: ccbc_public.assessment_data
comment on table ccbc_public.assessment_data is 'Table containing the assessment data for the application';
comment on column ccbc_public.assessment_data.id is 'Primary key and unique identifier';
comment on column ccbc_public.assessment_data.application_id is 'The application_id of the application this record is associated with';
comment on column ccbc_public.assessment_data.json_data is 'The assessment data in JSON format';
comment on column ccbc_public.assessment_data.assessment_data_type is 'The type of assessment (e.g. "assessment", "screening")';

-- Table: ccbc_public.form
comment on column ccbc_public.form.form_type is 'The type of form being stored';

-- Table: ccbc_public.gis_data
comment on table ccbc_public.gis_data is 'Table containing the uploaded GIS data in JSON format';
comment on column ccbc_public.gis_data.id is 'Primary key and unique identifier';

-- Table: ccbc_public.history_item
comment on table ccbc_public.history_item is 'This is a type used to return records of history data in the application_history computed column';

-- Table: ccbc_public.intake
comment on column ccbc_public.intake.counter_id is 'The counter_id used by the gapless_counter to generate a gapless intake id';

-- Table: record_version
comment on table ccbc_public.record_version is 'Table for tracking history records on tables that auditing is enabled on';
comment on column ccbc_public.record_version.id is 'Primary key and unique identifier';
comment on column ccbc_public.record_version.record_id is 'The id of the record the history record is associated with';
comment on column ccbc_public.record_version.old_record_id is 'The id of the previous version of the record the history record is associated with';
comment on column ccbc_public.record_version.ts is 'The timestamp of the history record';
comment on column ccbc_public.record_version.table_oid is 'The oid of the table the record is associated with';
comment on column ccbc_public.record_version.table_schema is 'The schema of the table the record is associated with';
comment on column ccbc_public.record_version.op is 'The operation performed on the record (created, updated, deleted)';
comment on column ccbc_public.record_version.table_name is 'The name of the table the record is associated with';
comment on column ccbc_public.record_version.created_by is 'The user that created the record';
comment on column ccbc_public.record_version.created_at is 'The timestamp of when the record was created';
comment on column ccbc_public.record_version.record is 'The record in JSON format';
comment on column ccbc_public.record_version.old_record is 'The previous version of the record in JSON format';

-- Table: ccbc_public.sow_tab_1
comment on table ccbc_public.sow_tab_1 is 'Table containing the SOW Tab 1 data for the application';
comment on column ccbc_public.sow_tab_1.id is 'Primary key and unique identifier';
comment on column ccbc_public.sow_tab_1.sow_id is 'The sow_id is the id of the application_sow_data record this is associated with';
comment on column ccbc_public.sow_tab_1.json_data is 'The tab 1 data in JSON format';

-- Table: ccbc_public.sow_tab_7
comment on table ccbc_public.sow_tab_7 is 'Table containing the SOW Tab 7 data for the application';
comment on column ccbc_public.sow_tab_7.id is 'Primary key and unique identifier';
comment on column ccbc_public.sow_tab_7.sow_id is 'The sow_id is the id of the application_sow_data record this is associated with';
comment on column ccbc_public.sow_tab_7.json_data is 'The tab 7 data in JSON format';

commit;
