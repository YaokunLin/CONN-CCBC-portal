begin;

delete from ccbc_public.application_form_data;
delete from ccbc_public.form_data;
delete from ccbc_public.attachment;
delete from ccbc_public.application_status;
delete from ccbc_public.application;
delete from ccbc_public.intake;
delete from ccbc_public.analyst;

commit;
