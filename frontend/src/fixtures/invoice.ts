import { Invoice, InvoiceStatus } from 'types'
import lineItem from './line-item'
import * as faker from 'faker'
import payment from './payment'
import email from './email'

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

export default function invoice(
  override: Partial<Invoice> = {},
  includePayment: boolean = true,
): Invoice {
  const status = invoiceStatus()
  const shouldIncludePayment = includePayment && status === 'paid'
  return {
    status,
    id: (1000 + faker.random.number(8999)).toString(),
    lineItems: Array.from({
      length: faker.random.number({ min: 2, max: 10 }),
    }).map(() => lineItem()),
    notes: faker.lorem.paragraphs(2),
    billingAddress: `${faker.address.streetName()}\n${faker.address.city()}\n${faker.address.county()}\n${faker.address.zipCode()}`,
    companyAddress: `${faker.address.streetName()}\n${faker.address.city()}\n${faker.address.county()}\n${faker.address.zipCode()}`,
    dateCreated: faker.date.past().toString(),
    taxRate: taxRate(),
    discount: faker.random.number({ min: 0, max: 50 }),
    includeTax: true,
    includeDiscount: true,
    includeLabels: true,
    includeQuantity: true,
    includeSubTotal: true,
    paymentId: shouldIncludePayment
      ? (1000 + faker.random.number(8999)).toString()
      : undefined,
    payment: shouldIncludePayment ? payment() : undefined,
    emails:
      status !== 'draft'
        ? Array.from({
            length: faker.random.number({ min: 1, max: 3 }),
          }).map(() => email())
        : [],
    ...override,
  }
}
