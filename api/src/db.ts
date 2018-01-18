import { createConnection } from 'typeorm'
import entities from './domains/entities'
import seed from './seed'

async function connect() {
  return createConnection({
    type: 'postgres',
    host: 'localhost', // TODO: environment variable
    port: 5432, // TODO: environment variable
    username: 'postgres', // TODO: environment variable
    password: 'CorrectHorseBatteryStaple', // TODO: environment variable
    database: 'invoicely', // TODO: environment variable
    entities: entities(),
    synchronize: true,
    logging: true,
  })
}

export default async function createDatabase() {
  const c = await connect()
  await c.dropDatabase()
  await c.close()
  const connection = await connect()
  await seed(connection)
  return connection
}
