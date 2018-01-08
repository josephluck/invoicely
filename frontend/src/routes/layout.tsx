import * as React from 'react'
import Sidebar from '../components/sidebar'
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
  className?: string
  state: GlobalState
  actions: GlobalActions
}

export default function Layout({
  children,
  className = '',
  title,
  state,
  actions,
}: LayoutProps) {
  return (
    <div
      className={`pos-fixed w-100 h-100 of-auto bg-gray-100 d-flex flex-direction-column ${className}`}
    >
      <div className="w-100 d-flex bg-white fs-large fc-blue pa-5 bb bc-gray-200 flex-0">
        <i
          className="ion-navicon-round"
          onClick={() => actions.app.setSidebarShowing(true)}
        />
        <div className="flex-1 ta-c">{title}</div>
        <i className="ion-ios-bell" />
      </div>
      <div className="d-flex flex-1 of-auto">{children}</div>
      <Sidebar
        showing={state.app.sidebarShowing}
        onClose={() => actions.app.setSidebarShowing(false)}
        className="fs-title"
      >
        <div className="fs-large pa-5 d-flex bb bc-gray-200 fc-blue">
          <div className="flex-1 fw-bold" />
          <i
            className="ion-close"
            onClick={() => actions.app.setSidebarShowing(false)}
          />
        </div>
        <a
          className="d-b pa-5 fw-bold bb bc-gray-200"
          href="/invoices"
          onClick={() => actions.app.setSidebarShowing(false)}
        >
          Invoices
        </a>
        <a
          className="d-b pa-5 fw-bold bb bc-gray-200"
          href="/payments"
          onClick={() => actions.app.setSidebarShowing(false)}
        >
          Payments
        </a>
        <a
          className="d-b pa-5 fw-bold bb bc-gray-200"
          href="/settings"
          onClick={() => actions.app.setSidebarShowing(false)}
        >
          Settings
        </a>
        <a className="d-b pa-5 fw-bold bb bc-gray-200">Logout</a>
      </Sidebar>
    </div>
  )
}
