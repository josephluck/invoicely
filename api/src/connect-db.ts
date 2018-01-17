import { createConnection } from 'typeorm'
import entities from './entities'

export default async function createDatabase() {
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
