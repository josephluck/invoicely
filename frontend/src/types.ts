export interface LineItem extends Record<string, any> {
  description: string
  quantity: number
  price: number
}

export interface Invoice {
  id: string
  number: string
  dateCreated: string
  billingAddress: string
  companyAddress: string
  notes: string
  includeTax: boolean
  taxRate: number
  includeDiscount: boolean
  discount: number
  includeLabels: boolean
  includeQuantity: boolean
  includeSubTotal: boolean
  lineItems: LineItem[]
}
