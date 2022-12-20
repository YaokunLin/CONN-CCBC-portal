import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { usePreloadedQuery } from 'react-relay/hooks';
import { withRelay, RelayProps } from 'relay-nextjs';
import { graphql } from 'react-relay';
import type { JSONSchema7 } from 'json-schema';
import { IChangeEvent } from '@rjsf/core';
import defaultRelayOptions from 'lib/relay/withRelayOptions';
import Button from '@button-inc/bcgov-theme/Button';
import FormBase from 'components/Form/FormBase';
import { calculate } from 'components/Form/ApplicationForm';
import Layout from 'components/Layout';
import { schema, uiSchema } from 'formSchema';
import { AnalystLayout, ChangeModal } from 'components/Analyst';
import { SectionQuery } from '__generated__/SectionQuery.graphql';
import { useCreateNewFormDataMutation } from 'schema/mutations/application/createNewFormData';

const getSectionQuery = graphql`
  query SectionQuery($rowId: Int!) {
    applicationByRowId(rowId: $rowId) {
      applicationFormDataByApplicationId(last: 1) {
        nodes {
          formDataByFormDataId {
            formSchemaId
          }
        }
      }
      formData {
        jsonData
      }
    }
    session {
      sub
    }
    ...AnalystLayout_query
  }
`;

const EditApplication = ({
  preloadedQuery,
}: RelayProps<Record<string, unknown>, SectionQuery>) => {
  const query = usePreloadedQuery(getSectionQuery, preloadedQuery);
  const {
    session,
    applicationByRowId: {
      formData: {
        jsonData,
        // formByFormSchemaId: { jsonSchema },
      },
      applicationFormDataByApplicationId: {
        nodes: [
          {
            formDataByFormDataId: { formSchemaId },
          },
        ],
      },
    },
  } = query;

  // Use a hidden ref for submit button instead of passing to modal so we have the most up to date form data
  const hiddenSubmitRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const sectionName = router.query.section as string;
  const applicationId = router.query.applicationId as string;
  const sectionSchema = schema.properties[sectionName] as JSONSchema7;

  // https://github.com/rjsf-team/react-jsonschema-form/issues/1023
  // Save and update form data in state due to RJSF setState bug
  const [sectionFormData, setSectionFormData] = useState(jsonData[sectionName]);
  const [changeReason, setChangeReason] = useState('');

  const handleChange = (e: IChangeEvent) => {
    const newFormSectionData = e.formData;
    const calculatedSectionData = calculate(newFormSectionData, sectionName);

    setSectionFormData(calculatedSectionData);
  };

  const [createNewFormData] = useCreateNewFormDataMutation();

  const handleSubmit = () => {
    const calculatedSectionData = calculate(sectionFormData, sectionName);

    let newFormData: Record<string, any> = {};
    if (Object.keys(jsonData).length === 0) {
      newFormData[sectionName] = calculatedSectionData;
    } else if (jsonData[sectionName]) {
      newFormData = { ...jsonData };
      newFormData[sectionName] = {
        ...jsonData[sectionName],
        ...calculatedSectionData,
      };
    } else {
      newFormData = { ...jsonData };
      newFormData[sectionName] = { ...calculatedSectionData };
    }

    createNewFormData({
      variables: {
        input: {
          applicationRowId: Number(applicationId),
          jsonData: newFormData,
          reasonForChange: changeReason,
          formSchemaId,
        },
      },
      onCompleted: () => {},
    });
  };
  return (
    <Layout session={session} title="Connecting Communities BC">
      <AnalystLayout query={query}>
        <h2>Application</h2>
        <hr />
        <h3>{sectionSchema.title}</h3>
        <FormBase
          formData={sectionFormData}
          onChange={handleChange}
          schema={sectionSchema}
          uiSchema={uiSchema[sectionName]}
          onSubmit={handleSubmit}
          noValidate
        >
          <button
            ref={hiddenSubmitRef}
            type="submit"
            style={{ display: 'none' }}
            aria-label="hidden-submit"
          />
          <Button
            onClick={(e: React.MouseEvent<HTMLInputElement>) => {
              e.preventDefault();
              window.location.hash = '#change-modal-id';
            }}
          >
            Save
          </Button>
          <Button
            variant="secondary"
            style={{ marginLeft: '24px' }}
            onClick={(e: React.MouseEvent<HTMLInputElement>) => {
              e.preventDefault();
              router.push(`/analyst/application/${applicationId}`);
            }}
          >
            Cancel
          </Button>
        </FormBase>

        <ChangeModal
          onSave={() => hiddenSubmitRef.current.click()}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setChangeReason(e.target.value)
          }
        />
      </AnalystLayout>
    </Layout>
  );
};

export const withRelayOptions = {
  ...defaultRelayOptions,

  variablesFromContext: (ctx) => {
    return {
      rowId: parseInt(ctx.query.applicationId.toString(), 10),
    };
  },
};

export default withRelay(EditApplication, getSectionQuery, withRelayOptions);
