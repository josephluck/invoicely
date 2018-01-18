import 'reflect-metadata'
import * as Koa from 'koa'
import { Connection } from 'typeorm/connection/Connection'
import config from '../../config'
import makeRouter from './router'
import makeDatabase from './db'
import exceptions from './exceptions'

const startServer = async (db: Connection) => {
  const server = new Koa()
  const router = makeRouter(db)

  server.use(router.routes())
  server.use(router.allowedMethods())
  server.use(exceptions())

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
