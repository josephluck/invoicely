import { Invoice, InvoiceStatus } from '../types'
import lineItem from './line-item'
import * as faker from 'faker'

export function taxRate(): number {
  return faker.random.arrayElement([5, 15, 20])
}

export function invoiceStatus(): InvoiceStatus {
  return faker.random.arrayElement([
    'draft',
    'sent',
    'paid',
  ]) as InvoiceStatus
}

export default function invoice(): Invoice {
  return {
    status: 'draft',
    id: faker.random.number().toString(),
    lineItems: [lineItem(), lineItem(), lineItem()],
    notes: faker.lorem.paragraphs(2),
    number: faker.random.number().toString(),
    billingAddress: `${faker.address.streetName()}\n${
      faker.address.city
    }\n${faker.address.county()}\n${faker.address.zipCode}`,
    companyAddress: `${faker.address.streetName()}\n${
      faker.address.city
    }\n${faker.address.county()}\n${faker.address.zipCode}`,
    dateCreated: faker.date.past().toString(),
    taxRate: taxRate(),
    discount: faker.random.number(),
    includeTax: true,
    includeDiscount: true,
    includeLabels: true,
    includeQuantity: true,
    includeSubTotal: true,
  }
}
