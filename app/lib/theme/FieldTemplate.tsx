import { FieldTemplateProps } from '@rjsf/core';
import FieldLabel from './components/FieldLabel';

const FieldTemplate: React.FC<FieldTemplateProps> = ({
  children,
  errors,
  help,
  rawErrors,
  label,
  displayLabel,
  required,
  uiSchema,
  id,
}) => {
  const hideOptional = uiSchema['ui:options']?.hideOptional;
  const altOptionalText = uiSchema['ui:options']?.altOptionalText;
  const customTitle = uiSchema['ui:options']?.customTitle as JSX.Element;
  const showLabel = displayLabel && !customTitle;

  return (
    <div>
      {showLabel && (
        <FieldLabel
          label={label}
          altOptionalText={altOptionalText && String(altOptionalText)}
          hideOptional={hideOptional && true}
          required={required}
          htmlFor={id}
        />
      )}
      {customTitle}
      {help}
      {children}
      {rawErrors && rawErrors.length > 0 ? (
        <div className="error-div">
          <>{errors}</>
        </div>
      ) : null}
    </div>
  );
};

export default FieldTemplate;
