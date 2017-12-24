interface LineItem {
  description: string
  quantity: number
  amount: number
}

// interface Address {
//   line1: string
//   line2: string
//   line3: string
//   line4: string
//   postcode: string
//   country: string
// }

type InvoiceState = 'draft' | 'saved' | 'published' | 'paid'

interface Invoice {
  id: string
  number: string
  poNumber?: string
  dateCreated: string
  datePublished?: string
  dateDue?: string
  terms?: string
  lineItems: LineItem[]
  taxRate: number
  fromAddress: string
  toAddress: string
  state: InvoiceState
}
