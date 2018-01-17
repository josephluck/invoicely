import 'reflect-metadata'
import * as Hapi from 'hapi'
import config from '../../config'
import authentication from './utils/authentication'
import routes from './routes'
import { Connection } from 'typeorm/connection/Connection'
import createDatabase from './connect-db'
import { User } from './entities/user'

async function insertDummyUser(connection: Connection) {
  let user = new User()
  user.name = 'Chloe Smith'
  user.email = 'chloe@smith.co'
  user.password = 'somepassword'

  const u = await connection.manager.save(user)
  console.log('User has been saved. User id is', u.id)
}

const startServer = async (db: Connection) => {
  const server = Hapi.server({ port: config.local.apiPort })

  await authentication(server, db)
  await insertDummyUser(db)
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
