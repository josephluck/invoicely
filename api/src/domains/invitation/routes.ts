import * as Router from 'koa-router'
import { Dependencies } from '../../'
import { InvitationEntity, createInvite } from './entity'
import { route } from '../../router'
import { Option } from 'space-lift'
import { UserEntity } from '../user/entity'

function makeController(deps: Dependencies) {
  const repo = deps.db.getRepository(InvitationEntity)

  return {
    async getAll(
      ctx: Router.IRouterContext,
      user: Option<UserEntity>,
    ) {
      return user.fold(
        () => {
          return deps.messages.throw(
            ctx,
            deps.messages.notFound('user'),
          )
        },
        async usr => {
          ctx.body = await repo.find({
            where: { company: usr.company.id },
          })
          return ctx.body
        },
      )
    },
    async getById(ctx: Router.IRouterContext) {
      ctx.body = await repo.findOneById(ctx.params.invitationId)
      return ctx.body
    },
    async create(
      ctx: Router.IRouterContext,
      user: Option<UserEntity>,
    ) {
      return user.fold(
        () => {
          return deps.messages.throw(
            ctx,
            deps.messages.notFound('user'),
          )
        },
        async u => {
          return createInvite(ctx.request.body, u.company).fold(
            err => {
              return (ctx.body = deps.messages.throw(
                ctx,
                deps.messages.badRequest('Bad request'),
              ))
            },
            async invite => {
              return (ctx.body = await repo.save(invite))
            },
          )
        },
      )
    },
    async updateById(ctx: Router.IRouterContext) {
      const invite = await repo.findOneById(ctx.params.invitationId)
      if (invite) {
        invite.email = ctx.request.body.email
        invite.name = ctx.request.body.name
        ctx.body = await repo.save(invite)
      } else {
        ctx.body = deps.messages.throw(
          ctx,
          deps.messages.notFound('invite'),
        )
      }
      return ctx.body
    },
    async destroy(ctx: Router.IRouterContext) {
      await repo.deleteById(ctx.params.invitationId)
      ctx.body = deps.messages.successfullyDeleted('invite')
      return ctx.body
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

    router.post(
      '/invitations',
      deps.auth,
      route(deps, controller.create),
    )

    router.get(
      '/invitations/:invitationId',
      deps.auth,
      route(deps, controller.getById),
    )

    router.put(
      '/invitations/:invitationId',
      deps.auth,
      route(deps, controller.updateById),
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
