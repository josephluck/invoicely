export interface LineItem extends Record<string, any> {
  description: string
  quantity: number
  price: number
}

// interface Address {
//   line1: string
//   line2: string
//   line3: string
//   line4: string
//   postcode: string
//   country: string
// }

export type InvoiceState = 'draft' | 'saved' | 'published' | 'paid'

export interface Invoice {
  id: string
  number: string
  dateCreated: string
  datePublished?: string
  dateDue?: string
  lineItems: LineItem[]
  taxRate: number
  discount: number
  billingAddress: string
  companyAddress: string
  state: InvoiceState
  notes: string
}
