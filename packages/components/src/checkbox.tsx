import * as React from 'react'
import Label from './label'

interface Props {
  className?: string
  label: string
  id: string
  checked?: boolean
  onChange?: (checked: boolean) => any
}

export function Checkbox({
  className = '',
  label,
  id,
  checked = false,
  onChange = () => null,
}: Props) {
  return (
    <Label
      className={`d-flex align-items-center ${className}`}
      id={id}
    >
      <input
        type="checkbox"
        name={id}
        id={id}
        checked={checked}
        onChange={() => onChange(!checked)}
      />
      <span className="flex-1 ml-2">{label}</span>
    </Label>
  )
}

export default Checkbox
