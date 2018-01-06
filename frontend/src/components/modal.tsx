import * as React from 'react'

interface Props {
  children: React.ReactNode
  className?: string
  onClose: () => any
  showing: boolean
}

export default function Modal({
  children,
  showing,
  onClose,
  className = '',
}: Props) {
  return (
    <div
      style={{ pointerEvents: showing ? 'auto' : 'none' }}
      className="pos-fixed post-0 posl-0 w-100 h-100 d-flex align-items-center pa-5"
    >
      <div
        className={`transition pos-fixed h-100 w-100 post-0 posl-0 bg-black ${
          showing ? 'o-50' : 'o-0'
        }`}
        onClick={onClose}
      />
      <div
        className={`
          transition pos-relative flex-1 ml-auto mr-auto maxw-6 bg-white bra-3 box-card ${className}
          ${showing ? 'o-100 scale-in' : 'o-0 scale-out'}
        `}
      >
        {children}
      </div>
    </div>
  )
}
