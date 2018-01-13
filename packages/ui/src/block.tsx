import * as React from 'react'

interface Props {
  children: React.ReactNode
  className?: string
}

export function Block({ children, className = '' }: Props) {
  return (
    <div
      className={`lh-4 ${className}`}
      style={{ whiteSpace: 'pre-line' }}
    >
      {children}
    </div>
  )
}

export default Block
