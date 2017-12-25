import * as React from 'react'

interface Props {
  children: React.ReactNode
  className?: string
}

export default function label({ children, className = '' }: Props) {
  return (
    <div
      className={`
        fs-small fc-gray-600 ${className}
      `}
    >
      {children}
    </div>
  )
}
