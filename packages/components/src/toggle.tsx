import * as React from 'react'

interface Props {
  children: React.ReactNode
  className?: string
  color?: string
  checked: boolean
  onChange: (checked: boolean) => any
}

export function Toggle({
  children,
  className = '',
  color = 'blue',
  onChange,
  checked,
}: Props) {
  return (
    <button
      className={`
        bra-2 fs-small ph-3 pv-2 ba transition c-pointer
        ${
          checked
            ? `fc-white bg-${color} bc-transparent`
            : `fc-${color} bg-transparent bc-${color}`
        }
        ${className}
      `}
      onClick={() => onChange(!checked)}
    >
      {children}
    </button>
  )
}

export default Toggle
