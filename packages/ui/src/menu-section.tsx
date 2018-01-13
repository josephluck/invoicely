import * as React from 'react'
import Collapser from './collapser'

interface CardProps {
  children: React.ReactNode
  className?: string
  title: string
}

export function MenuSection({
  children,
  className = '',
  title,
}: CardProps) {
  return (
    <div
      className={`
        bb bbs-solid bc-gray-200 ${className}
      `}
    >
      <Collapser
        defaultOpen
        header={open => (
          <div className="d-flex align-items-center pa-5">
            <div className="flex-1 mr-2 fw-bold">{title}</div>
            <i
              className={`fc-gray-600 ion-chevron-down transition ${
                open ? 'rotate-0' : 'rotate-180'
              }`}
            />
          </div>
        )}
      >
        <div className="ph-5 pb-5">{children}</div>
      </Collapser>
    </div>
  )
}

export default MenuSection
