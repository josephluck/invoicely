import * as React from 'react'
import { Invoice } from 'types'
import Label from './label'
import { humanizeDate } from './utils/dates'
import { formatAsCurrency, calculateTotal } from './utils/invoice'

interface Props {
  className?: string
  invoice: Invoice
}

export function InvoiceDetails({ className = '', invoice }: Props) {
  return (
    <div className={`d-flex ${className}`}>
      <div className="flex-1 mr-3">
        <Label className="d-ib mb-1">Invoice Number</Label>
        <div className="mb-4 lh-4">#{invoice.id}</div>
        <Label className="d-ib mb-1">Date Raised</Label>
        <div
          className={`lh-4 ${
            invoice.paymentId && invoice.payment ? 'mb-4' : ''
          }`}
        >
          {humanizeDate(invoice.dateCreated)}
        </div>
        {invoice.paymentId && invoice.payment ? (
          <div>
            <Label className="d-ib mb-1">Payment Received</Label>
            <div className="lh-4">
              {humanizeDate(invoice.payment.dateCreated)}
            </div>
          </div>
        ) : null}
      </div>
      <div className="flex-1 ml-3">
        <Label className="d-ib mb-1">Total</Label>
        <div className="mb-4 lh-4">
          {formatAsCurrency(calculateTotal(invoice))}
        </div>
        <Label className="d-ib mb-1">To</Label>
        <div className="lh-4">{invoice.companyAddress}</div>
      </div>
    </div>
  )
}

export default InvoiceDetails
