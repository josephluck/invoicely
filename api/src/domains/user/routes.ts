import * as Router from 'koa-router'
import { Dependencies } from '../../'
import { UserEntity } from './entity'
import { CompanyEntity } from '../company/entity'

const relation = {
  relations: ['company'],
}

export function routes(deps: Dependencies) {
  const route = (
    ctrl: (
      ctx: Router.IRouterContext,
      stuff: { user?: UserEntity; company?: CompanyEntity },
    ) => Promise<any>,
  ) => async (
    ctx: Router.IRouterContext,
    next: () => Promise<any>,
  ) => {
    const user = ctx.state.user
      ? await deps.db.manager.findOneById(
          UserEntity,
          ctx.state.user,
          relation,
        )
      : undefined
    const company = user
      ? await deps.db.manager.findOneById(
          CompanyEntity,
          user.company.id,
        )
      : undefined
    await ctrl(ctx, {
      user,
      company,
    })
    next()
  }

  return function(router: Router) {
    const repo = deps.db.getRepository(UserEntity)

    router.get(
      '/users',
      deps.auth,
      route(async function(ctx, { user, company }) {
        console.log({ user, company })
        ctx.body = await repo.find(relation)
        return
      }),
    )

    router.get('/users/:userId', deps.auth, async function(
      ctx,
      next,
    ) {
      ctx.body = await repo.findOneById(ctx.params.userId, relation)
      return next()
    })

    return router
  }
}

export default routes
