import { Payment } from '../types'
import * as faker from 'faker'
import invoice from './invoice'
import email from './email'

export default function payment(): Payment {
  return {
    id: (1000 + faker.random.number(8999)).toString(),
    invoiceId: (1000 + faker.random.number(8999)).toString(),
    dateCreated: faker.date.past().toString(),
    amount: faker.random.number({ min: 100, max: 5000 }),
    invoice: invoice({ payment: undefined }, false),
    emails: Array.from({
      length: faker.random.number({ min: 2, max: 10 }),
    }).map(() => email()),
  }
}
