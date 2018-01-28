import * as React from 'react'

interface Props {
  currentUrl: string
  activeTab: 'invoices' | 'payments' | 'settings' | 'reports' | null
  className?: string
}

function tabClassName(active: boolean = false): string {
  return `transition mr-4 fs-small tt-uppercase fw-bold ${
    active ? 'fc-blue' : 'fc-gray-700'
  }`
}

export function MainNav({
  currentUrl,
  activeTab,
  className = '',
}: Props) {
  return (
    <div className={className}>
      <a
        className={tabClassName(activeTab === 'invoices')}
        href="/invoices"
      >
        Invoices
      </a>
      <a
        className={tabClassName(activeTab === 'payments')}
        href="/payments"
      >
        Payments
      </a>
      <a
        className={tabClassName(activeTab === 'reports')}
        href="/reports"
      >
        Reports
      </a>
      <a
        className={tabClassName(activeTab == 'settings')}
        href="/users"
      >
        Settings
      </a>
    </div>
  )
}

export default MainNav
