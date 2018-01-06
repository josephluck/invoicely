export interface LineItem extends Record<string, any> {
  description: string
  quantity: number
  price: number
}

export type InvoiceStatus = 'draft' | 'sent' | 'paid'

export interface Invoice {
  id: string
  status: InvoiceStatus
  dateCreated: string
  number: string
  billingAddress: string
  companyAddress: string
  notes: string
  lineItems: LineItem[]
  includeTax: boolean
  taxRate: number
  includeDiscount: boolean
  discount: number
  includeLabels: boolean
  includeQuantity: boolean
  includeSubTotal: boolean
}
