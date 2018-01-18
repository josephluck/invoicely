import { Connection } from 'typeorm/connection/Connection'
import * as Entities from './domains/entities'
import * as faker from 'faker'
import * as crypt from 'bcrypt'

export default async function seed(connection: Connection) {
  const company = await connection.manager.save(makeCompany())
  const users = await connection.manager.save([
    await makeUser(company),
    await makeUser(company),
    await makeUser(company),
  ])
  console.log(
    'Done seeding. You can log in with the following credentials: ',
  )
  console.log('Username:', users[0].email, '  Password: 123')
}

async function makeUser(company: Entities.CompanyEntity) {
  const firstName = faker.name.firstName()
  const lastName = faker.name.lastName()
  let user = new Entities.UserEntity()
  user.name = `${firstName} ${lastName}`
  user.email = `${firstName.toLowerCase()}@${lastName.toLowerCase()}.co`
  user.password = await crypt.hash('123', 10)
  user.company = company
  return user
}

function makeCompany() {
  let company = new Entities.CompanyEntity()
  company.name = faker.company.companyName()
  company.logo = faker.image.animals(200, 100)
  company.address = faker.address.streetAddress(true)
  return company
}
