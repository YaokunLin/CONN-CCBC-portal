-- Revert ccbc:tables/application_status_004_archiver_role_permissions from pg

begin;

drop policy ccbc_archiver_update_application_status on application_status;

commit;
