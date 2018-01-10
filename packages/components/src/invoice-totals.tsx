import * as React from 'react'
import {
  calculateInvoiceSubtotal,
  calculateVat,
  formatAsCurrency,
} from './utils/invoice'
import { LineItem } from 'types'

interface Props {
  includeDiscount: boolean
  discount: number
  includeTax: boolean
  taxRate: number
  lineItems: LineItem[]
  className?: string
}

export function InvoiceTotals({
  includeDiscount,
  discount,
  includeTax,
  taxRate,
  lineItems,
  className = '',
}: Props) {
  const actualDiscount = includeDiscount ? discount || 0 : 0
  const subTotal =
    calculateInvoiceSubtotal(lineItems) - actualDiscount
  const tax = calculateVat(subTotal, includeTax ? taxRate : 0)
  const total = subTotal + tax
  return (
    <div className="bts-solid bw-small bc-gray-200 mt-1">
      {includeDiscount ? (
        <div className="d-flex bbs-dashed bw-small bc-gray-200 pv-4">
          <div className="flex-1">Discount</div>
          <div className="ta-r">- {formatAsCurrency(discount)}</div>
        </div>
      ) : null}
      {includeTax ? (
        <div className="d-flex bbs-dashed bw-small bc-gray-200 pv-4">
          <div className="flex-1">VAT</div>
          <div className="ta-r">{formatAsCurrency(tax)}</div>
        </div>
      ) : null}
      <div className="d-flex bbs-solid bw-small bc-gray-200 pv-4">
        <div className="fw-bold flex-1">Total</div>
        <div className="fw-bold ta-r">{formatAsCurrency(total)}</div>
      </div>
    </div>
  )
}

export default InvoiceTotals
