import 'reflect-metadata'
import { createConnection } from 'typeorm'
import * as Hapi from 'hapi'
import config from '../../config'
import authentication from './utils/authentication'
import routes from './routes'
import entities from './entities'

async function createDatabase() {
  return createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'admin',
    database: 'test',
    entities: entities(),
    synchronize: true,
    logging: true,
  })
}

const startServer = async (db: any) => {
  console.log(db)
  const server = Hapi.server({ port: config.local.apiPort })

  await authentication(server, db)
  routes(server, db)

  await server.start()
  return server
}

createDatabase()
  .then(startServer)
  .then(server =>
    console.log(`Server listening on ${server.info.uri}`),
  )
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
