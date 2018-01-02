import * as React from 'react'

interface Props {
  children: React.ReactNode
  type?: 'primary' | 'secondary'
  className?: string
  onClick?: () => any
}

export default function Button({
  children,
  className = '',
  type = 'primary',
  onClick = () => null,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`
        bra d-ib bra-2 pv-3 ph-4 ta-c c-pointer
        ${
          type === 'primary'
            ? 'bg-blue fc-white ba bc-transparent'
            : 'ba bs-solid bw-bold bg-white bc-blue fc-blue'
        }
        ${className}
      `}
    >
      {children}
    </button>
  )
}
