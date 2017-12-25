import * as React from 'react'
import Circle from '../components/circle'

interface TitleProps {
  number?: string
  children: React.ReactNode
}

export function Title({ number, children }: TitleProps) {
  return (
    <div className="fc-blue fw-bold fs-title">
      {number ? <Circle className="mr-2">1</Circle> : null}
      {children}
    </div>
  )
}

interface LayoutProps {
  children: React.ReactNode
  title: React.ReactNode
  className?: string
}

export default function Layout({
  children,
  className = '',
  title,
}: LayoutProps) {
  return (
    <div
      className={`pos-fixed w-100 h-100 of-auto pa-5 bg-gray-100 ${className}`}
    >
      <div className="w-100 d-flex mb-5">
        <div className="d-flex align-items-center fs-large fc-blue">
          <i className="ion-navicon-round" />
        </div>
        <div className="flex-1 ta-c">{title}</div>
        <div className="d-flex align-items-center fs-large">
          {/* <i className="ion-person" /> */}
        </div>
      </div>
      {children}
    </div>
  )
}
