import * as moment from 'moment'
import * as React from 'react'
import ErrorsComponent from '../errors'
import HintText from '../label'
import Label from '../label'
import ReactDatePicker from 'react-datepicker'
import TextField, { Props as TextFieldProps } from './textfield'

export function DatePickerNative(props: TextFieldProps) {
  return <TextField {...props} type="date" />
}

function DatePickerCustom({
  id,
  onChange = () => null,
  value,
  className = '',
  errors = [],
  label,
  disabled,
  help,
  min,
  max,
  inputClassName = '',
}: TextFieldProps) {
  const parsedValue = moment(value)

  function handleChange(
    value: moment.Moment | null,
    e: React.SyntheticEvent<any> | undefined,
  ) {
    if (e) {
      e.stopPropagation()
    }
    onChange(
      value && value.isValid() ? value.format('YYYY-MM-DD') : '',
    )
  }

  return (
    <div className={className}>
      {label ? <Label>{label}</Label> : null}
      <div className="pos-relative">
        <ReactDatePicker
          onChange={handleChange}
          selected={parsedValue.isValid() ? parsedValue : null}
          showMonthDropdown
          showYearDropdown
          minDate={min ? moment(min) : undefined}
          maxDate={max ? moment(max) : undefined}
          className={`
            lh-4 w-100 ba input-reset transition
            ${disabled ? 'fc-gray-600' : 'bg-white bc-blue-f'}
            ${errors.length ? 'bc-red' : 'bc-transparent'}
            ${inputClassName}
          `}
        />
      </div>
      {help && !errors.length ? <HintText>{help}</HintText> : null}
      <ErrorsComponent errors={errors} />
    </div>
  )
}

export function DatePicker(props: TextFieldProps) {
  const hasErrors = props.errors && props.errors.length

  return (
    <div
      className={`${props.className}${
        hasErrors ? ' has-errors' : ''
      }`}
    >
      <DatePickerCustom {...props} className="d-n d-b-ns" />
      <DatePickerNative {...props} className="d-b d-n-ns" />
    </div>
  )
}

export default DatePicker
