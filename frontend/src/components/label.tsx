import * as React from 'react'

interface Props {
  children: React.ReactNode
  id?: string
  className?: string
}

export default function label({
  children,
  className = '',
  id = '',
}: Props) {
  return (
    <label
      htmlFor={id}
      className={`
        fs-small fc-gray-600 ${className}
      `}
    >
      {children}
    </label>
  )
}
