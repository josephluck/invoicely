import * as React from 'react'
import Collapser from './collapser'

interface CardProps {
  children: React.ReactNode
  className?: string
  header?: React.ReactNode
  defaultOpen?: boolean
}

export default function Card({
  children,
  className = '',
  header,
  defaultOpen = false,
}: CardProps) {
  return (
    <div
      className={`
        bra-3 bg-white ${header ? '' : 'pa-4'} box-card ${className}
      `}
    >
      {header ? (
        <Collapser
          defaultOpen={defaultOpen}
          header={open => (
            <div
              className={`d-flex align-items-center pr-5 ${
                open ? 'bb bc-gray-200' : ''
              }`}
            >
              <div className="flex-1 mr-3 of-hidden">{header}</div>
              <i
                className={`fc-gray-600 ion-chevron-down c-pointer transition ${
                  open ? 'rotate-0' : 'rotate-180'
                }`}
              />
            </div>
          )}
        >
          <div>{children}</div>
        </Collapser>
      ) : (
        children
      )}
    </div>
  )
}
