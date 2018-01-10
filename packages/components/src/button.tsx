import * as React from 'react'

interface Props {
  children: React.ReactNode
  type?: 'primary' | 'secondary'
  size?: 'small' | 'medium'
  className?: string
  onClick?: () => any
  href?: string
}

export function Button({
  children,
  className = '',
  type = 'primary',
  size = 'medium',
  onClick = () => null,
  href,
}: Props) {
  const classes = `
    bra d-ib ta-c c-pointer bra-2
    ${size === 'small' ? 'fs-small pv-2 ph-4' : 'pv-3 ph-5'}
    ${
      type === 'secondary'
        ? 'ba bs-solid bw-bold bg-white bc-blue fc-blue'
        : ''
    }
    ${type === 'primary' ? 'bg-blue fc-white ba bc-transparent' : ''}
    ${className}
  `
  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  } else {
    return (
      <button onClick={onClick} className={classes}>
        {children}
      </button>
    )
  }
}

export default Button
