import * as React from 'react'

interface Props {
  children: React.ReactNode
  style?: 'primary' | 'secondary'
  type?: 'button' | 'submit' | 'reset'
  size?: 'small' | 'medium'
  className?: string
  onClick?: () => any
  href?: string
}

export function Button({
  children,
  className = '',
  style = 'primary',
  size = 'medium',
  type = 'button',
  onClick = () => null,
  href,
}: Props) {
  const classes = `
    bra d-ib ta-c c-pointer bra-2
    ${size === 'small' ? 'fs-small pv-2 ph-4' : 'pv-3 ph-5'}
    ${
      style === 'secondary'
        ? 'ba bs-solid bw-bold bg-white bc-blue fc-blue'
        : ''
    }
    ${style === 'primary' ? 'bg-blue fc-white ba bc-transparent' : ''}
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
      <button onClick={onClick} className={classes} type={type}>
        {children}
      </button>
    )
  }
}

export default Button
