import * as React from 'react'
import { Invoice } from '../types'
import {
  calculateInvoiceTotal,
  calculateVat,
  formatAsCurrency,
} from '../models/new-invoice'

interface Props {
  invoice: Invoice
}

export default function Invoice({ invoice }: Props) {
  const discount = invoice.discount
  const subTotal = calculateInvoiceTotal(invoice.lineItems) - discount
  const vat = calculateVat(subTotal, invoice.taxRate)
  const total = subTotal + vat
  return (
    <div>
      {formatAsCurrency(total)}
      {discount}
    </div>
  )
}
