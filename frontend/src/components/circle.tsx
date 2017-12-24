import * as React from 'react'

interface Props {
  children: React.ReactNode
  className?: string
}

export default function Circle({ children, className = '' }: Props) {
  return (
    <div className={`bra d-ib f-mono bw-small bra-circle bc-primary pa-1 bs-solid ${className}`}>
      {children}
    </div>
  )
}
