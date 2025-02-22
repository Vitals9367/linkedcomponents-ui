import { FieldProps } from 'formik';
import { SingleSelectProps } from 'hds-react';
import React from 'react';

import { OptionType } from '../../../../types';
import SingleSelect from '../../singleSelect/SingleSelect';
import useSingleSelectFieldProps from '../hooks/useSingleSelectFieldProps';

type Props = SingleSelectProps<OptionType> & FieldProps;

const SingleSelectField: React.FC<Props> = ({
  field: { name, onBlur, onChange, value, ...field },
  form,
  helper,
  options,
  disabled,
  ...rest
}) => {
  const { errorText, handleBlur, handleChange } = useSingleSelectFieldProps({
    disabled,
    name,
    onBlur,
    onChange,
    value,
  });

  return (
    <SingleSelect
      {...rest}
      {...field}
      disabled={disabled}
      id={name}
      onBlur={handleBlur}
      onChange={handleChange}
      options={options}
      value={
        options.find((option) => option.value === value) ??
        (null as unknown as undefined)
      }
      helper={helper}
      error={errorText}
      invalid={!!errorText}
    />
  );
};

export default SingleSelectField;
