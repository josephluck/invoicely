import { LineItem } from '../types'
import * as faker from 'faker'

export default function lineItem(): LineItem {
  return {
    description: faker.lorem.sentence(),
    quantity: faker.random.number(5),
    price: faker.random.number({ min: 100, max: 900 }),
  }
}
