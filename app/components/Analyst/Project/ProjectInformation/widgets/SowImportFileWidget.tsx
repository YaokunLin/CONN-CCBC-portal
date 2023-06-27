import React, { useEffect, useState } from 'react';
import { WidgetProps } from '@rjsf/core';
import {
  handleDelete,
  validateFile,
  handleDownload,
} from 'lib/theme/functions/fileWidgetFunctions';
import { useCreateAttachment } from 'schema/mutations/attachment/createAttachment';
import { useDeleteAttachment } from 'schema/mutations/attachment/deleteAttachment';
import bytesToSize from 'utils/bytesToText';
import FileComponent from 'lib/theme/components/FileComponent';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Alert } from '@button-inc/bcgov-theme';

const StyledAlert = styled(Alert)`
  margin-bottom: 8px;
  margin-top: 8px;
`;

const ellipsisAnimation = keyframes`
  0% {
    width: 0;
    color: #D8292F;
  }
  50% {
    color: #FCBA19;
  }
  100% {
    width: 1.25em;
    color: #003366;
  }
`;

const Loading = styled.div`
  color: #1a5a96;

  &:after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    animation: ${ellipsisAnimation} steps(4, end) 900ms infinite;
    content: '\\2026'; /* ascii code for the ellipsis character */
    width: 0px;
  }
`;

const SuccessTextHeading = styled.div`
  color: #1a5a96;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
`;

const SuccessTextSubHeading = styled.div`
  color: #1a5a96;
  text-align: center;
`;

const SuccessTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: ${(props) => props.theme.spacing.small};
`;

const SuccessIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.color.success};
`;

const SuccessContainer = styled.div`
  display: flex;
`;

export const Success = () => (
  <SuccessContainer>
    <SuccessTextContainer>
      <SuccessTextHeading>
        Statement of Work Data table match database
      </SuccessTextHeading>
      <SuccessTextSubHeading>
        Remember to press Save & Import
      </SuccessTextSubHeading>
    </SuccessTextContainer>
    <SuccessIconContainer>
      <FontAwesomeIcon icon={faCircleCheck} />
    </SuccessIconContainer>
  </SuccessContainer>
);

export const displaySowUploadErrors = (err) => {
  const { level: errorType, error: errorMessage } = err;
  let title =
    'An unknown error has occured while validating the Statement of Work data';
  if (errorType?.includes('tab')) {
    title = `There was an error importing the Statement of Work data at ${errorType}`;
  }
  if (errorType === 'summary') {
    title =
      'There was an error importing the Statement of Work data at the Summary tab';
  }

  if (errorType === 'database') {
    title = 'An error occured when validating the Statement of Work data';
  }

  if (errorType === 'workbook') {
    title =
      'The Statement of Work sheet does not appear to contain the correct tabs.';
  }
  // for cell level errors
  if (typeof errorMessage !== 'string') {
    return errorMessage.map(({ error: message }) => {
      return (
        <StyledAlert
          key={message}
          variant="danger"
          closable={false}
          content={
            <>
              <div> {title}</div>
              <div>{message}</div>
            </>
          }
        />
      );
    });
  }
  return (
    <StyledAlert
      key={errorMessage}
      variant="danger"
      closable={false}
      content={
        <>
          <div> {title}</div>
          <div>{errorMessage}</div>
        </>
      }
    />
  );
};

export const renderStatusLabel = (
  loading: boolean,
  success: boolean
): React.ReactNode => {
  if (loading) {
    return <Loading>Checking the data</Loading>;
  }

  if (!loading && success) {
    return <Success />;
  }

  return false;
};

type FileProps = {
  id: string | number;
  uuid: string;
  name: string;
  size: number;
  type: string;
};

interface SowImportFileWidgetProps extends WidgetProps {
  value: Array<FileProps>;
}

const acceptedFileTypes = '.xls, .xlsx, .xlsm';

const SowImportFileWidget: React.FC<SowImportFileWidgetProps> = ({
  id,
  formContext,
  onChange,
  value,
  required,
  label,
  rawErrors,
}) => {
  const [error, setError] = useState('');
  const [createAttachment, isCreatingAttachment] = useCreateAttachment();
  const [deleteAttachment, isDeletingAttachment] = useDeleteAttachment();
  const [sowValidationErrors, setSowValidationErrors] = useState([]);
  const [isImporting, setIsImporting] = useState(false);
  const [isValidSow, setIsValidSow] = useState(false);
  const isFiles = value?.length > 0;
  const loading = isCreatingAttachment || isDeletingAttachment || isImporting;
  const maxFileSizeInBytes = 104857600;
  const fileId = isFiles && value[0].id;

  useEffect(() => {
    if (rawErrors?.length > 0) {
      setError('rjsf_validation');
    }
  }, [rawErrors, setError]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (loading) return;
    setError('');

    const { applicationId, rowId, ccbcNumber } = formContext;
    const file = e.target.files?.[0];

    const { isValid, error: newError } = validateFile(
      file,
      maxFileSizeInBytes,
      acceptedFileTypes
    );

    if (!isValid) {
      setError(newError);
      return;
    }
    setIsImporting(true);

    const { name, size, type } = file;

    if (isFiles) {
      handleDelete(fileId, deleteAttachment, setError, value, onChange);
    }

    const variables = {
      input: {
        attachment: {
          file,
          fileName: name,
          fileSize: bytesToSize(size),
          fileType: type,
          applicationId,
        },
      },
    };

    setSowValidationErrors([]);
    const sowFileFormData = new FormData();
    sowFileFormData.append('file', file);

    const response = await fetch(`/api/analyst/sow/${rowId}/${ccbcNumber}`, {
      method: 'POST',
      body: sowFileFormData,
    });

    const sowErrorList = await response.json();
    if (Array.isArray(sowErrorList) && sowErrorList.length > 0) {
      setSowValidationErrors(sowErrorList);
    } else {
      setSowValidationErrors([]);
    }

    const { status } = response;
    if (status === 200) {
      createAttachment({
        variables,
        onError: () => {
          setError('uploadFailed');
        },
        onCompleted: (res) => {
          const uuid = res?.createAttachment?.attachment?.file;
          const attachmentRowId = res?.createAttachment?.attachment?.rowId;

          const fileDetails = {
            id: attachmentRowId,
            uuid,
            name,
            size,
            type,
          };
          onChange([fileDetails]);
          setIsImporting(false);
          setIsValidSow(true);
        },
      });
    } else {
      setError('sowImportFailed');
      setIsImporting(false);
      setIsValidSow(false);
    }
  };

  return (
    <>
      <FileComponent
        loading={loading}
        error={error}
        handleDelete={() =>
          handleDelete(fileId, deleteAttachment, setError, value, onChange)
        }
        handleDownload={handleDownload}
        onChange={(e) => {
          // eslint-disable-next-line no-void
          void (() => handleChange(e))();
        }}
        fileTypes={acceptedFileTypes}
        id={id}
        label={label}
        statusLabel={renderStatusLabel(isImporting, isValidSow)}
        required={required}
        value={value}
      />
      {sowValidationErrors?.length > 0 &&
        sowValidationErrors.flatMap(displaySowUploadErrors)}
    </>
  );
};

export default SowImportFileWidget;
