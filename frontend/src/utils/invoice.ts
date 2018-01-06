import { LineItem, Invoice } from '../types'

export function formatAsCurrency(
  value: any = '',
  icon: string = '£',
): string {
  const num = parseFloat(value.toString().replace(/[^\d.-]/g, ''))
  const currency = num
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  return `${icon}${currency}`
}

export function calculateInvoiceSubtotal(rows: LineItem[]): number {
  return rows.reduce((prev, curr) => {
    return prev + curr.quantity * curr.price
  }, 0)
}

export function calculateVat(
  total: number,
  rate: number = 0,
): number {
  return total / 100 * rate
}

export function calculateTotal(invoice: Invoice): number {
  const actualDiscount = invoice.includeDiscount
    ? invoice.discount || 0
    : 0
  const subTotal =
    calculateInvoiceSubtotal(invoice.lineItems) - actualDiscount
  const tax = calculateVat(
    subTotal,
    invoice.includeTax ? invoice.taxRate : 0,
  )
  return subTotal + tax
}

export function humanizeInvoiceStatus(
  status: Invoice['status'],
): string {
  if (status === 'draft') {
    return 'Not Sent'
  } else if (status === 'sent') {
    return 'Sent'
  } else if (status === 'paid') {
    return 'Paid'
  } else {
    return ''
  }
}

export function getInvoiceStatusColor(
  status: Invoice['status'],
): string {
  if (status === 'draft') {
    return 'red'
  } else if (status === 'sent') {
    return 'orange'
  } else if (status === 'paid') {
    return 'green'
  } else {
    return ''
  }
}
