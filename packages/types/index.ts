export interface LineItem extends Record<string, any> {
  description: string
  quantity: number
  price: number
}

export type EmailType = 'invoice' | 'receipt'

export interface Email {
  id: string
  to: string
  reply: string // cool@compa.ny
  body: string // Html body
  dateCreated: string
  dateOpened?: string
  type: EmailType
  typeId: string // Id of associated record
}

export type InvoiceStatus = 'draft' | 'sent' | 'paid'

export interface Invoice {
  id: string
  status: InvoiceStatus
  dateCreated: string
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
  paymentId?: string
  payment?: Payment
  emails: Email[]
}

export interface Payment {
  id: string
  dateCreated: string
  amount: number
  invoiceId: string
  invoice: Invoice
  emails: Email[]
}
