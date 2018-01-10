import * as React from 'react'

interface Props {
  children: React.ReactNode
  id?: string
  className?: string
}

export function Label({ children, className = '', id = '' }: Props) {
  return (
    <label
      htmlFor={id}
      className={`
        fs-small fw-bold fc-gray-700 ${className}
      `}
    >
      {children}
    </label>
  )
}

export default Label
