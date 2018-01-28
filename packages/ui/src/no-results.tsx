import * as React from 'react'
import Card from './card'

interface Props {
  children: React.ReactNode
  className?: string
}

export function NoResults({ children, className = '' }: Props) {
  return (
    <Card
      className={`
        pa-5 ${className}
      `}
    >
      {children}
    </Card>
  )
}

export default NoResults
