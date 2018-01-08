import { Email } from '../types'
import * as faker from 'faker'

export default function email(): Email {
  return {
    id: (1000 + faker.random.number(8999)).toString(),
    body: faker.lorem.paragraphs(),
    to: faker.internet.email(),
    reply: faker.internet.email(),
    dateCreated: faker.date.past().toString(),
    dateOpened: faker.random.boolean()
      ? faker.date.past().toString()
      : undefined,
    type: faker.random.arrayElement([
      'invoice',
      'receipt',
    ]) as Email['type'],
    typeId: (1000 + faker.random.number(8999)).toString(),
  }
}
