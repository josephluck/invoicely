import * as React from 'react'

interface TitleProps {
  children: React.ReactNode
}

export function Title({ children }: TitleProps) {
  return <div className="fc-blue fw-bold fs-title">{children}</div>
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
      className={`pos-fixed w-100 h-100 of-auto bg-gray-100 d-flex flex-direction-column ${className}`}
    >
      <div className="w-100 d-flex bg-white pa-5 bb bbs-solid bc-gray-200 flex-0">
        <div className="d-flex align-items-center fs-large fc-blue">
          <i className="ion-navicon-round" />
        </div>
        <div className="flex-1 ta-c">{title}</div>
        <div className="d-flex align-items-center fs-large fc-blue">
          <i className="ion-ios-bell" />
        </div>
      </div>
      <div className="d-flex flex-1 of-auto">{children}</div>
    </div>
  )
}
