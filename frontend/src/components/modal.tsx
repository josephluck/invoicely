import * as React from 'react'

interface Props {
  children: React.ReactNode
  className?: string
  onClose: () => any
  showing: boolean
  header?: React.ReactNode
  footer?: React.ReactNode
}

export default function Modal({
  children,
  showing,
  onClose,
  className = '',
  header,
  footer,
}: Props) {
  return (
    <div
      style={{ pointerEvents: showing ? 'auto' : 'none' }}
      className="pos-fixed post-0 posl-0 w-100 h-100 d-flex align-items-center pa-5"
    >
      <div
        className={`transition pos-fixed h-100 w-100 post-0 posl-0 bg-black ${
          showing ? 'o-50 c-pointer' : 'o-0'
        }`}
        onClick={onClose}
      />
      <div
        className={`
          transition pos-relative d-flex flex-direction-column flex-1 ml-auto mr-auto maxw-6 bg-white bra-3 box-card ${className}
          ${showing ? 'o-100 scale-in' : 'o-0 scale-out'}
        `}
      >
        {header ? (
          <div className="pa-5 bb bc-gray-200 d-flex align-items-center">
            <div className="flex-1">{header}</div>
            <a
              className="ion-close fc-blue c-pointer"
              onClick={onClose}
            />
          </div>
        ) : null}
        <div className="flex-1 of-auto maxh-5">{children}</div>
        {footer ? (
          <div className="d-flex ph-5 pv-4 bt bc-gray-200">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  )
}
