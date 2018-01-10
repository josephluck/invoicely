import * as React from 'react'
import Navigation from '../components/main-nav'
import { GlobalState, GlobalActions } from '../models'

interface TitleProps {
  children: React.ReactNode
}

export function Title({ children }: TitleProps) {
  return <div className="fc-blue fw-bold fs-title">{children}</div>
}

interface LayoutProps {
  children: React.ReactNode
  title: React.ReactNode
  activeTab: 'invoices' | 'payments' | 'settings' | 'reports' | null
  className?: string
  state: GlobalState
  actions: GlobalActions
}

export default function Layout({
  children,
  className = '',
  activeTab,
  title,
  state,
  actions,
}: LayoutProps) {
  return (
    <div
      className={`pos-fixed w-100 h-100 of-auto bg-gray-100 d-flex flex-direction-column ${className}`}
    >
      <div className="flex-0 bg-white bb bc-gray-200 ph-5 pv-4 d-flex">
        <Navigation
          currentUrl={state.location.pathname}
          className="flex-1"
          activeTab={activeTab}
        />
        <i className="fc-gray-600 ion-search" />
      </div>
      <div className="d-flex flex-1 of-auto">{children}</div>
    </div>
  )
}
