import * as React from 'react'

interface Props {
  children: React.ReactNode
  className?: string
  color?: string
}

export function Tag({
  children,
  className = '',
  color = 'blue',
}: Props) {
  return (
    <div
      className={`
        bra-2 fs-tiny fw-bold ph-2 pv-1 ba fc-${color} bc-${color} ${className}
      `}
    >
      {children}
    </div>
  )
}

export default Tag
