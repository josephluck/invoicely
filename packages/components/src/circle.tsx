import * as React from 'react'

interface Props {
  children: React.ReactNode
  className?: string
}

export function Circle({ children, className = '' }: Props) {
  return (
    <div
      className={`
        bra d-ib bw-large bra-circle fs-medium pa-1 bs-solid d-inline-flex bc-blue w-2 h-2 ta-c fw-bold ${className}
      `}
    >
      {children}
    </div>
  )
}

export default Circle
