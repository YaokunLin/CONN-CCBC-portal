import { useState } from 'react';
import { useRouter } from 'next/router';
import Button from '@button-inc/bcgov-theme/Button';
import type { JSONSchema7 } from 'json-schema';

import { FormBase } from '.';
import uiSchema from '../../formSchema/uiSchema';
import schema from '../../formSchema/schema';
import { useUpdateApplicationMutation } from '../../schema/mutations/application/updateApplication';
import { schemaToSubschemasArray } from '../../utils/schemaUtils';
import { Review } from '../Review';

// https://github.com/rjsf-team/react-jsonschema-form/issues/2131
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import validateFormData from '@rjsf/core/dist/cjs/validate';

interface Props {
  formData: any;
  pageNumber: number;
  trimmedSub: any;
}

const ApplicationForm: React.FC<Props> = ({
  formData,
  pageNumber,
  trimmedSub,
}) => {
  const formErrorSchema = validateFormData(formData, schema())?.errorSchema;
  const noErrors = Object.keys(formErrorSchema).length === 0;

  const [reviewConfirm, setReviewConfirm] = useState(false);

  const router = useRouter();
  const [updateApplication] = useUpdateApplicationMutation();

  const subschemaArray = schemaToSubschemasArray(schema() as object);

  if (subschemaArray.length < pageNumber) {
    // Todo: proper 404
    return <h2>404 not found</h2>;
  }

  const [sectionName, sectionSchema] = subschemaArray[pageNumber - 1];

  const review = sectionName === 'review';

  const saveForm = async (incomingFormData: any, existingFormData: any) => {
    const pageNumber = parseInt(router.query.page as string);
    const sectionName = subschemaArray[pageNumber - 1][0];
    let newFormData: any = {};
    if (Object.keys(existingFormData).length === 0) {
      newFormData['contactInformation'] = incomingFormData.formData;
    } else if (existingFormData[sectionName]) {
      newFormData = { ...existingFormData };
      newFormData[sectionName] = {
        ...existingFormData[sectionName],
        ...incomingFormData.formData,
      };
    } else {
      newFormData = { ...existingFormData };
      newFormData[sectionName] = { ...incomingFormData.formData };
    }

    return await updateApplication({
      variables: {
        input: {
          applicationPatch: {
            formData: newFormData,
            status: 'draft',
          },
          owner: trimmedSub,
        },
      },
    });
  };

  const handleSubmit = async (incomingFormData: any, formData: any) => {
    saveForm(incomingFormData, formData).then(() => {
      //  TODO: update rerouting logic to handle when there are form errors etc.
      if (pageNumber < subschemaArray.length) {
        router.push(`/form/${pageNumber + 1}`);
      } else {
        router.push('/form/success');
      }
    });
  };

  const handleDisabled = (page: string, noErrors: boolean) => {
    let disabled = false;
    switch (true) {
      case page === 'review' && noErrors:
        disabled = false;
        break;
      case page === 'review':
        disabled = !reviewConfirm;
        break;
    }
    return disabled;
  };

  return (
    <FormBase
      onSubmit={(incomingFormData: any) => {
        handleSubmit(incomingFormData, formData);
      }}
      formData={formData[sectionName]}
      schema={sectionSchema as JSONSchema7}
      uiSchema={uiSchema}
      // Todo: validate entire form on completion
      noValidate={true}
    >
      {review && (
        <Review
          formData={formData}
          formSchema={schema()}
          reviewConfirm={reviewConfirm}
          onReviewConfirm={() => setReviewConfirm(!reviewConfirm)}
          formErrorSchema={formErrorSchema}
          noErrors={noErrors}
        />
      )}
      {pageNumber < subschemaArray.length ? (
        <Button
          variant="primary"
          disabled={handleDisabled(sectionName, noErrors)}
        >
          Continue
        </Button>
      ) : (
        <Button variant="primary">Ready for assessment</Button>
      )}
      {/* // Return to this save button later, will likely require a hacky solution to work
      // nice with RJSF
      <Button variant="secondary" style={{ marginLeft: '20px' }}>
        Save
      </Button> */}
    </FormBase>
  );
};
export default ApplicationForm;
