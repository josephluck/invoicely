import * as Router from 'koa-router'
import { Dependencies } from '../../'
import { UserEntity } from './entity'
import { route, Controller } from '../../router'

const relation = {
  relations: ['company'],
}

function makeController(deps: Dependencies): Controller {
  const repo = deps.db.getRepository(UserEntity)

  return {
    async getAll(ctx: Router.IRouterContext) {
      ctx.body = await repo.find(relation)
    },
    async getById(ctx: Router.IRouterContext) {
      ctx.body = await repo.findOneById(ctx.params.userId, relation)
    },
  }
}

export function routes(deps: Dependencies) {
  return function(router: Router) {
    const controller = makeController(deps)

    router.get('/users', deps.auth, route(deps, controller.getAll))
    router.get(
      '/users/:userId',
      deps.auth,
      route(deps, controller.getById),
    )

    return router
  }
}

export default routes
