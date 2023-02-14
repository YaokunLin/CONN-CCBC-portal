begin;

select plan(5);

truncate table
  ccbc_public.application,
  ccbc_public.application_status,
  ccbc_public.attachment,
  ccbc_public.form_data,
  ccbc_public.application_form_data,
  ccbc_public.intake,
  ccbc_public.application_analyst_lead
restart identity cascade;

select function_privs_are(
  'ccbc_public', 'application_status_sort_filter', ARRAY['ccbc_public.application'], 'ccbc_admin', ARRAY['EXECUTE'],
  'ccbc_admin can execute ccbc_public.application_status_sort_filter(ccbc_public.application)'
);

select function_privs_are(
  'ccbc_public', 'application_status_sort_filter', ARRAY['ccbc_public.application'], 'ccbc_analyst', ARRAY['EXECUTE'],
  'ccbc_analyst can execute ccbc_public.application_status_sort_filter(ccbc_public.application)'
);

select function_privs_are(
  'ccbc_public', 'application_status_sort_filter', ARRAY['ccbc_public.application'], 'ccbc_auth_user', ARRAY[]::text[],
  'ccbc_auth_user cannot execute ccbc_public.application_status_sort_filter(ccbc_public.application)'
);

select function_privs_are(
  'ccbc_public', 'application_status_sort_filter', ARRAY['ccbc_public.application'], 'ccbc_guest', ARRAY[]::text[],
  'ccbc_guest cannot execute ccbc_public.application_status_sort_filter(ccbc_public.application)'
);


insert into ccbc_public.intake(open_timestamp, close_timestamp, ccbc_intake_number)
values('2022-03-01 09:00:00-07', '2022-05-01 09:00:00-07', 1);

select mocks.set_mocked_time_in_transaction('2022-04-01 09:00:00-07'::timestamptz);
set jwt.claims.sub to 'testCcbcAuthUser';
set role ccbc_auth_user;

select ccbc_public.create_application();

insert into ccbc_public.application_status
 (application_id, status) values (1,'received');

set jwt.claims.sub to 'testCcbcAnalyst';
set role ccbc_analyst;

insert into ccbc_public.application_status
 (application_id, status) values (1,'assessment');

select is (
  (
    select ccbc_public.application_status_sort_filter(
      (select row(application.*)::ccbc_public.application from ccbc_public.application where id = 1)
    )
  ),
  '7 assessment',
  'ccbc_public.application_status_sort_filter retrieves the string with status order and name'
);

select finish();

rollback;
