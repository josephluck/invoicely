import * as React from 'react'

interface Props {
  children: React.ReactNode
  title: React.ReactNode
  className?: string
}

export default function layout({ children, className = '', title }: Props) {
  return (
    <div className={`psf w100 h100 oa ${className}`}>
      <div className="w100 x">
        <div />
        <div className="xx">{title}</div>
        <div />
      </div>
      {children}
    </div>
  )
}
