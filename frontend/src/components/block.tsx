import * as React from 'react'

interface Props {
  children: React.ReactNode
  className?: string
}

export default function block({ children, className = '' }: Props) {
  return (
    <div
      className={`lh-4 ${className}`}
      style={{ whiteSpace: 'pre-line' }}
    >
      {children}
    </div>
  )
}
