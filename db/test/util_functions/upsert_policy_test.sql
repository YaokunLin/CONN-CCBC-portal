begin;
select plan(13);

-- Test setup
create table ccbc_public.test_table
(
  id integer primary key generated always as identity
);

select has_function(
  'ccbc_private', 'upsert_policy',
  'Function upsert_policy should exist'
);

select throws_ok(
  $$
    select ccbc_private.upsert_policy('admin_select_all', 'test_table', 'badoperation', 'ccbc_auth_user', 'true');
  $$,
  'P0001',
  'Invalid operation variable. Must be one of [select, insert, update, delete]',
  'Function upsert_policy (5 variables) throws an exception if the operation variable is not in (select, insert, update, delete)'
);

select throws_ok(
  $$
    select ccbc_private.upsert_policy('admin_select_all', 'test_table', 'select', 'ccbc_auth_user', 'using(true)', 'with check(true)', 'ccbc_public');
  $$,
  'P0001',
  'invalid operation variable',
  'Function upsert_policy (7 variables) throws an exception if the operation variable is not update'
);

select lives_ok(
  $$
    select ccbc_private.upsert_policy('admin_select', 'test_table', 'select', 'ccbc_auth_user', 'true');
  $$,
  'Function upsert_policy creates a select policy with proper variables'
);

select lives_ok(
  $$
    select ccbc_private.upsert_policy('admin_delete', 'test_table', 'delete', 'ccbc_auth_user', 'true');
  $$,
  'Function upsert_policy creates a delete policy with proper variables'
);

select lives_ok(
  $$
    select ccbc_private.upsert_policy('admin_insert', 'test_table', 'insert', 'ccbc_auth_user', 'true');
  $$,
  'Function upsert_policy creates an insert policy with proper variables'
);

select lives_ok(
  $$
    select ccbc_private.upsert_policy('admin_update', 'test_table', 'update', 'ccbc_auth_user', 'true');
  $$,
  'Function upsert_policy creates an update policy with proper variables'
);

select policies_are(
    'ccbc_public',
    'test_table',
    ARRAY[ 'admin_select', 'admin_delete', 'admin_insert', 'admin_update'],
    'The correct policies ahve been created for ccbc_public.test_table'
);

select results_eq(
  $$
    select qual::boolean from pg_policies where policyname = 'admin_delete'
  $$,
  ARRAY[true],
  'policy admin_delete using qualifier is TRUE'
);

select lives_ok(
  $$
    select ccbc_private.upsert_policy('admin_delete', 'test_table', 'delete', 'ccbc_auth_user', 'false');
  $$,
  'Function upsert_policy alters a policy if exists with proper variables'
);

select results_eq(
  $$
    select qual::boolean from pg_policies where policyname = 'admin_delete'
  $$,
  ARRAY[false],
  'policy admin_delete using qualifier has been changed to FALSE'
);

select lives_ok(
  $$
    select ccbc_private.upsert_policy(
      'different_statement_update', 'test_table', 'update', 'ccbc_auth_user', 'using(true)', 'with check(false)', 'ccbc_public'
    );
  $$,
  'Function upsert_policy (7 params: different using/with check statments) creates a policy with proper variables'
);

select qual, with_check from pg_policies where policyname = 'different_statement_update';

select row_eq(
  $$
    select qual::boolean, with_check::boolean from pg_policies where policyname = 'different_statement_update'
  $$,
  ROW(true, false),
  'policy different_statement_update has different values for using qualifier and with_check'
);

select finish();
rollback;
