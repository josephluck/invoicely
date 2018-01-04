import { LineItem } from '../types'

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
