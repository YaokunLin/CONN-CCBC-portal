-- Revert ccbc:tables/application_status_001_give_read_and_insert_to_ccbc_analyst from pg

begin;

drop policy ccbc_analyst_user_select_application_status on ccbc_public.application_status;

drop policy ccbc_analyst_user_insert_application_status on ccbc_public.application_status;

commit;
