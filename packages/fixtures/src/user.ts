import { User } from 'types'
import * as faker from 'faker'

export default function user(): User {
  const firstName = faker.name.firstName()
  const lastName = faker.name.lastName()
  return {
    id: (1000 + faker.random.number(8999)).toString(),
    name: `${firstName} ${lastName}`,
    email: `${firstName}-${lastName}@${faker.company.companyName()}.co`,
    avatar: faker.image.avatar(),
  }
}
