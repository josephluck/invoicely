import * as Router from 'koa-router'
import { Dependencies } from '../../'
import { InvitationEntity } from './entity'
import { route, Controller } from '../../router'

const relation = {
  relations: ['company'],
}

function makeController(deps: Dependencies): Controller {
  const repo = deps.db.getRepository(InvitationEntity)

  return {
    async getAll(ctx) {
      ctx.body = await repo.find(relation)
    },
    async getById(ctx) {
      ctx.body = await repo.findOneById(
        ctx.params.invitationId,
        relation,
      )
    },
    async saveNew(ctx, user) {
      let invite = new InvitationEntity()
      user.fold(
        () => {
          deps.messages.throw(ctx, deps.messages.notFound('user'))
        },
        async u => {
          invite.company = u.company
          invite.email = ctx.request.body.email
          invite.name = ctx.request.body.name
          ctx.body = await repo.save(invite)
        },
      )
    },
    async destroy(ctx) {
      await repo.deleteById(ctx.params.invitationId)
      ctx.body = deps.messages.successfullyDeleted('invite')
    },
  }
}

export function routes(deps: Dependencies) {
  return function(router: Router) {
    const controller = makeController(deps)

    router.get(
      '/invitations',
      deps.auth,
      route(deps, controller.getAll),
    )

    router.get(
      '/invitations/:invitationId',
      deps.auth,
      route(deps, controller.getById),
    )

    router.post(
      '/invitations',
      deps.auth,
      route(deps, controller.saveNew),
    )

    router.delete(
      '/invitations/:invitationId',
      deps.auth,
      route(deps, controller.destroy),
    )

    return router
  }
}

export default routes
