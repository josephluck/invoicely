import * as React from 'react'
import Collapser from './collapser'

interface CardProps {
  children: React.ReactNode
  className?: string
  title?: string
  defaultOpen?: boolean
}

export default function Card({
  children,
  className = '',
  title,
  defaultOpen = false,
}: CardProps) {
  return (
    <div
      className={`
        bra-3 bg-white ${title ? '' : 'pa-4'} box-card ${className}
      `}
    >
      {title ? (
        <Collapser
          defaultOpen={defaultOpen}
          header={open => (
            <div className="d-flex align-items-center pa-4">
              <div className="flex-1 mr-2 fw-bold">{title}</div>
              <i
                className={`fc-gray-600 ion-chevron-down transition ${
                  open ? 'rotate-0' : 'rotate-180'
                }`}
              />
            </div>
          )}
        >
          <div className="ph-4 pb-4 pt-3">{children}</div>
        </Collapser>
      ) : (
        children
      )}
    </div>
  )
}
