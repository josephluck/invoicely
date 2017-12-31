import * as React from 'react'
import ErrorsComponent from './errors'
import Label from './label'

export type SelectableOption = string | number | boolean

export interface SelectOption<T extends SelectableOption> {
  value: T
  label: string
  disabled?: boolean
}

export interface Props {
  label?: string
  options: SelectOption<string | number>[]
  id: string
  value: string | number
  errors?: string[]
  onChange?: (value: number | string) => any
  className?: string
  disabled?: boolean
  inputClassName?: string
}

export function emptyOption(): SelectOption<''> {
  return {
    label: '(Please Select)',
    value: '',
    disabled: true,
  }
}

export function Select({
  label,
  options,
  id = '',
  value,
  errors = [],
  onChange = value => value,
  className = '',
  disabled = false,
  inputClassName = '',
}: Props) {
  function sanitizeValue(v: string): number | string {
    return typeof value === 'number' ? parseFloat(v as string) : v
  }

  return (
    <div className={`${className}`}>
      {label ? <Label className="d-ib mb-1">{label}</Label> : ''}
      <div className="w-100">
        <select
          value={value}
          className={`
            fs-medium ba bra-2 w-100 pa-2 input-reset oc-accent transition
            ${inputClassName}
            ${
              disabled
                ? 'fc-gray-600 bg-white'
                : 'bg-gray-100 bg-white-h bg-white-f bc-blue-f'
            }
            ${errors.length ? 'bc-red' : 'bc-gray-200'}
          `}
          onChange={e =>
            onChange(
              sanitizeValue((e.target as HTMLSelectElement).value),
            )
          }
          id={id}
        >
          {options.map(Option)}
        </select>
      </div>
      {typeof errors !== 'boolean' ? (
        <ErrorsComponent errors={errors} />
      ) : null}
    </div>
  )
}

function Option(
  { value, label, disabled }: SelectOption<string | number>,
  index: number,
) {
  return (
    <option
      key={index}
      value={value}
      disabled={disabled ? true : false}
    >
      {label}
    </option>
  )
}

export default Select
