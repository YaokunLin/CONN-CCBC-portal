import { FieldProps } from '@rjsf/core';
import { Accordion, StyledTable } from 'components/Review';
import { useMemo } from 'react';

const ReviewSectionField: React.FC<FieldProps> = (props) => {
  const { idSchema, uiSchema, registry, schema, errorSchema } = props;
  const uiOptions = uiSchema['ui:options'] || {};
  const hasErrors = useMemo(
    () => Object.keys(errorSchema || {}).length > 0,
    [errorSchema]
  );
  return (
    <Accordion
      id={idSchema.$id}
      defaultToggled={uiOptions.defaultExpanded || hasErrors}
      error={hasErrors}
      title={schema.title}
    >
      <StyledTable>
        <tbody>{<registry.fields.ObjectField {...props} />}</tbody>
      </StyledTable>
    </Accordion>
  );
};

export default ReviewSectionField;
