import { Invoice } from '../types'
import lineItem from './line-item'

export default function invoice(): Invoice {
  return {
    id: '123',
    lineItems: [lineItem(), lineItem(), lineItem()],
    state: 'draft',
    notes:
      'Thank you for choosing Awake. Hopefully we can build you something beautiful again soon.',
    number: '1001',
    billingAddress: 'Techspace\n32 Leman Street\nLondon\nE2 3ND',
    companyAddress: 'Awake\nShoreditch\nLondon\nE1 2LB',
    dateCreated: '2017/11/05',
    taxRate: 20,
    discount: 100,
  }
}
