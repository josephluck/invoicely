import * as React from 'react'

interface Props {
  children: React.ReactNode
  className?: string
}

export function Title({ children, className = '' }: Props) {
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

export default Title
