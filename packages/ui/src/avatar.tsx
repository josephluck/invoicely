import * as React from 'react'

interface Props {
  className?: string
  image?: string
}

export function Avatar({ className = '', image = '' }: Props) {
  return image ? (
    <img
      src={image}
      className={`w-2 h-2 bra-circle of-hidden ${className}`}
    />
  ) : (
    <div className={`w-2 h-2 bra-circle of-hidden ${className}`} />
  )
}

export default Avatar
