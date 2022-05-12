import React, { SetStateAction, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { WidgetProps } from '@rjsf/core';
import { dateTimeFormat } from '../functions/formatDates';
import styled from 'styled-components';

const StyledDatePicker = styled(DatePicker)`
  margin: 12px 0;
  border: 2px solid #606060;
  border-radius: 0.25rem;
  padding: 0.5rem 0.6rem;
  width: 75%;
`;

function getDateString(date: SetStateAction<Date | undefined>) {
  if (date) {
    return dateTimeFormat(date, 'date_year_first');
  }
}

const DatePickerWidget: React.FunctionComponent<WidgetProps> = ({
  id,
  value,
  disabled,
  readonly,
  onBlur,
  onChange,
  onFocus,
}) => {
  const [day, setDay] = useState(value ? new Date(value) : undefined);

  const handleChange = (d: any) => {
    setDay(d);
    onChange(getDateString(d));
  };

  const handleBlur = () => {
    onBlur(id, getDateString(day));
  };

  const handleFocus = () => {
    onFocus(id, getDateString(day));
  };

  return (
    <div>
      <StyledDatePicker
        disabled={disabled}
        readOnly={readonly}
        className="form-control"
        selected={day}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        dateFormat="yyyy-MM-dd"
        placeholderText="YYYY-MM-DD"
        showMonthDropdown
        showYearDropdown
      />
    </div>
  );
};

export default DatePickerWidget;
