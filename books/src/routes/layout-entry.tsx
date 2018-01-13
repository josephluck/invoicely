import * as React from 'react'

interface LayoutProps {
  children: React.ReactNode
  className?: string
}

export default function Layout({
  children,
  className = '',
}: LayoutProps) {
  return (
    <div
      className={`pos-fixed w-100 h-100 of-auto bg-gray-100 d-flex flex-direction-column ${className}`}
    >
      <div className="d-flex flex-1 of-auto">{children}</div>
    </div>
  )
}
