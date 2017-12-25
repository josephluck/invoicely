import * as React from 'react'

interface Props {
  children: React.ReactNode
  className?: string
}

export default function Title({ children, className = '' }: Props) {
  return (
    <div
      className={`
        fs-title fw-bold ${className}
      `}
    >
      {children}
    </div>
  )
}
