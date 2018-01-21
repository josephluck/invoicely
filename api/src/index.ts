import 'reflect-metadata'
import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as cors from 'koa2-cors'
import * as auth from 'koa-jwt'
import * as jwt from 'jsonwebtoken'
import { Connection } from 'typeorm/connection/Connection'
import config from '../../config'
import makeRouter from './router'
import makeDatabase from './db'
import exceptions from './exceptions'

export interface Dependencies {
  db: Connection
  auth: auth
  jwt: typeof jwt
}

const startServer = async (db: Connection) => {
  const server = new Koa()

  const dependencies: Dependencies = {
    db,
    auth: (auth as any)({
      secret: 'shh', // TODO: env variable
      isRevoked() {
        return Promise.resolve(false)
      },
    }),
    jwt: jwt,
  }

  const router = makeRouter(dependencies)
  server.use(bodyParser())
  server.use(router.routes())
  server.use(router.allowedMethods())
  server.use(exceptions())
  server.use(
    cors({
      origin: '*',
    }),
  )

  await server.listen(config.local.apiPort)
  return server
}

makeDatabase()
  .then(startServer)
  .then(server => console.log(`Api started`))
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
