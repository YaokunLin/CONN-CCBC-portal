-- Deploy ccbc:computed_columns/application_form_data to pg

begin;

create or replace function ccbc_public.application_form_data(application ccbc_public.application) returns ccbc_public.form_data as
$$
  select row(fd.*)::ccbc_public.form_data from ccbc_public.form_data as fd, ccbc_public.form as f, ccbc_public.application_form_data as af
   where
   fd.form_schema_id = f.id and
   f.form_type = 'intake' and
   af.application_id = application.id and
   fd.id = af.form_data_id order by af.form_data_id desc limit 1;
$$ language sql stable;

grant execute on function ccbc_public.application_form_data to ccbc_auth_user;
grant execute on function ccbc_public.application_form_data to ccbc_analyst;
grant execute on function ccbc_public.application_form_data to ccbc_admin;

comment on function ccbc_public.application_form_data is 'Computed column to display form_data';

commit;
