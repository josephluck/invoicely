import * as Router from 'koa-router'
import { Connection } from 'typeorm/connection/Connection'
import { User } from './entity'

type Next = () => Promise<any>

const relation = {
  relations: ['company'],
}

export function routes(router: Router, db: Connection) {
  const repo = db.getRepository(User)

  router.get('/users', async function(
    ctx: Router.IRouterContext,
    next: Next,
  ) {
    ctx.body = await repo.find(relation)
    next()
  })

  router.get('/users/:userId', async function(
    ctx: Router.IRouterContext,
    next: Next,
  ) {
    ctx.body = await repo.findOneById(ctx.params.userId, relation)
    next()
  })

  return router
}

export default routes
