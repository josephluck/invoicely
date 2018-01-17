import { createConnection } from 'typeorm'
import entities from './entities'

export default async function createDatabase() {
  return createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'CorrectHorseBatteryStaple',
    database: 'invoicely',
    entities: entities(),
    synchronize: true,
    logging: true,
  })
}
