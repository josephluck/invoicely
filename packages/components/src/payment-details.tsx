import * as React from 'react'
import { Payment } from 'types'
import Label from './label'
import { humanizeDate } from './utils/dates'
import { formatAsCurrency } from './utils/invoice'

interface Props {
  className?: string
  payment: Payment
}

export function PaymentDetails({ payment, className = '' }: Props) {
  return (
    <div className={`d-flex ${className}`}>
      <div className="flex-1 mr-3">
        <Label className="d-ib mb-1">Payment Number</Label>
        <div className="mb-4 lh-4">#{payment.id}</div>
        <Label className="d-ib mb-1">Date Received</Label>
        <div className="mb-4 lh-4">
          {humanizeDate(payment.dateCreated)}
        </div>
        <Label className="d-ib mb-1">Amount Paid</Label>
        <div className="lh-4">{formatAsCurrency(payment.amount)}</div>
      </div>
      <div className="flex-1 ml-3">
        <Label className="d-ib mb-1">Invoice Number</Label>
        <div className="mb-4 lh-4">#{payment.invoiceId}</div>
        <Label className="d-ib mb-1">From</Label>
        <div className="lh-4">{payment.invoice.companyAddress}</div>
      </div>
    </div>
  )
}

export default PaymentDetails
