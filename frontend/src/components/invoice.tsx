import * as React from 'react'
import { Invoice } from '../types'
import Label from './label'
import LineItems from './line-items'
import InvoiceTotals from './invoice-totals'

interface Props {
  invoice: Invoice
  className?: string
}

interface BlockProps {
  children: React.ReactNode
  className?: string
}

function Block({ children, className = '' }: BlockProps) {
  return (
    <div
      className={`lh-4 ${className}`}
      style={{ whiteSpace: 'pre-line' }}
    >
      {children}
    </div>
  )
}

export default function Invoice({ invoice, className = '' }: Props) {
  return (
    <div className={`bg-white pa-5 ${className}`}>
      <div className="d-flex align-items-center bb bbs-solid bc-gray-200 pb-6 mb-6">
        <div className="flex-1">
          <img
            src="https://static1.squarespace.com/static/ta/56c62d0df699bb9171a122bc/147/assets/logo-black.png"
            style={{ width: 'auto', height: '30mm' }}
          />
        </div>
        <Block className="flex-1 ta-r ba bs-solid bc-transparent">
          {invoice.companyAddress}
        </Block>
      </div>
      <div className="d-flex mb-8 pb-6">
        <div className="flex-1">
          <Label>Invoice</Label>
          <Block className="ba bs-solid bc-transparent mb-2">
            {invoice.number}
          </Block>
          <Label>Raised</Label>
          <Block className="ba bs-solid bc-transparent">
            {invoice.dateCreated}
          </Block>
        </div>
        <div className="flex-1 ml-2">
          <Label>To</Label>
          <Block className="ba bs-solid bc-transparent">
            {invoice.billingAddress}
          </Block>
        </div>
        <div className="flex-2 ml-2">
          <Label>Notes</Label>
          <Block className="ba bs-solid bc-transparent">
            {invoice.notes}
          </Block>
        </div>
      </div>
      <div>
        <LineItems
          lineItems={invoice.lineItems}
          includeLabels={invoice.includeLabels}
          includeQuantity={invoice.includeQuantity}
          includeSubTotal={invoice.includeSubTotal}
        />
        <InvoiceTotals
          includeDiscount={invoice.includeDiscount}
          includeTax={invoice.includeTax}
          discount={invoice.discount}
          lineItems={invoice.lineItems}
          taxRate={invoice.taxRate}
        />
      </div>
    </div>
  )
}
