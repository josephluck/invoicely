import * as React from 'react'

interface Props {
  children: React.ReactNode
  className?: string
  color?: string
}

export default function Message({
  children,
  className = '',
  color = 'blue',
}: Props) {
  return (
    <div
      className={`
        bra-2 pa-5 ba fw-bold lh-4 fc-${color} bc-${color} bg-white ${className}
      `}
    >
      {children}
    </div>
  )
}
