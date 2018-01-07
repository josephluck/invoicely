import * as React from 'react'

interface Props {
  children: React.ReactNode
  className?: string
  showing: boolean
  onClose: () => any
}

export default function Sidebar({
  children,
  className = '',
  showing,
  onClose,
}: Props) {
  return (
    <div
      style={{ pointerEvents: showing ? 'auto' : 'none' }}
      className="pos-fixed post-0 posl-0 w-100 h-100"
    >
      <div
        className={`transition pos-fixed h-100 w-100 post-0 posl-0 bg-black ${
          showing ? 'o-50 c-pointer' : 'o-0'
        }`}
        onClick={onClose}
      />
      <div
        className={`
          transition pos-fixed posl-0 post-0 h-100 bg-white w-5 box-card
          ${showing ? 'slide-left-in' : 'slide-left-out'}
          ${className}
        `}
      >
        {children}
      </div>
    </div>
  )
}
