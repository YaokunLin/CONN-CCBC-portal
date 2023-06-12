import React, { useState } from 'react';
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
  font-size: 30px;
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
}) => {
  const [error, setError] = useState('');
  const [createAttachment, isCreatingAttachment] = useCreateAttachment();
  const [deleteAttachment, isDeletingAttachment] = useDeleteAttachment();
  const [isImporting, setIsImporting] = useState(false);
  const isFiles = value?.length > 0;
  const loading = isCreatingAttachment || isDeletingAttachment || isImporting;
  const maxFileSizeInBytes = 104857600;
  const fileId = isFiles && value[0].id;

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsImporting(true);
    if (loading) return;
    setError('');

    const { applicationId, validateSow } = formContext;
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

    await validateSow(file).then((response) => {
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
          },
        });
      } else {
        setError('sowImportFailed');
        setIsImporting(false);
      }
    });
  };

  return (
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
      label={loading ? <Loading>Checking the data</Loading> : label}
      required={required}
      value={value}
    />
  );
};

export default SowImportFileWidget;
