import * as React from 'react'
import { Invoice } from 'types'
import { humanizeDate, humanizeTime } from './utils/dates'
import {
  getInvoiceStatusColor,
  getLastSentDate,
} from './utils/invoice'
import Message from './message'

interface Props {
  className?: string
  invoice: Invoice
}

export function InvoiceStatusMessage({
  className = '',
  invoice,
}: Props) {
  const lastSent = getLastSentDate(invoice)
  if (invoice.status === 'draft') {
    return (
      <Message
        color={getInvoiceStatusColor(invoice.status)}
        className={`${className}`}
      >
        You haven't sent this invoice yet.
      </Message>
    )
  } else if (invoice.status === 'sent' && lastSent) {
    return (
      <Message
        color={getInvoiceStatusColor(invoice.status)}
        className={`${className}`}
      >
        This invoice hasn't been paid yet and was last sent on{' '}
        {humanizeDate(lastSent)} at {humanizeTime(lastSent)}.
      </Message>
    )
  } else if (invoice.status === 'paid' && invoice.payment) {
    return (
      <Message
        color={getInvoiceStatusColor(invoice.status)}
        className={`${className}`}
      >
        This invoice was paid on{' '}
        {humanizeDate(invoice.payment.dateCreated)} at{' '}
        {humanizeTime(invoice.payment.dateCreated)}.
      </Message>
    )
  } else {
    return null
  }
}

export default InvoiceStatusMessage
