import * as Router from 'koa-router'
import { Connection } from 'typeorm/connection/Connection'
import user from './domains/user/routes'

export type Next = () => Promise<any>

export default function routes(db: Connection) {
  const rts = new Router()
  return user(rts, db)
}
