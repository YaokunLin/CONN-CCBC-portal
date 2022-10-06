-- deploy ccbc:tables/form_data to pg

begin;

create table ccbc_public.form_data(
  id integer primary key generated always as identity,
  form_data jsonb not null default '{}'::jsonb,
  last_edited_page varchar(100)
);
select ccbc_private.upsert_timestamp_columns('ccbc_public', 'form_data');

alter table ccbc_public.form_data force row level security;
alter table ccbc_public.form_data enable row level security;

grant usage, select on sequence ccbc_public.form_data_id_seq to ccbc_auth_user;

do
$grant$
begin

perform ccbc_private.grant_permissions('select', 'form_data', 'ccbc_auth_user');
perform ccbc_private.grant_permissions('insert', 'form_data', 'ccbc_auth_user');
perform ccbc_private.grant_permissions('update', 'form_data', 'ccbc_auth_user');

-- RLS for select and update can be found in application_form_data table
perform ccbc_private.upsert_policy('ccbc_auth_user can always insert', 'form_data', 'insert', 'ccbc_auth_user',
'true');
end
$grant$;

comment on table ccbc_public.form_data is 'Table to hold applicant form data';

comment on column ccbc_public.form_data.id is 'The unique id of the form data';

comment on column ccbc_public.form_data.form_data is 'The data entered into the form by the respondent';

comment on column ccbc_public.form_data.last_edited_page is 'Column saving the key of the last edited form page';

commit;
