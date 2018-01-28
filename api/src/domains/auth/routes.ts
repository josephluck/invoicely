import * as Router from 'koa-router'
import { Dependencies } from '../../.'
import { UserEntity, createUser } from '../user/entity'
import { InvitationEntity } from '../invitation/entity'
import { EmailEntity } from '../email/entity'
import { Option } from 'space-lift'
import * as crypt from 'bcrypt'
import { route } from '../../router'

function makeController(deps: Dependencies) {
  const userRepo = deps.db.getRepository(UserEntity)
  const invitationRepo = deps.db.getRepository(InvitationEntity)

  return {
    async login(ctx: Router.IRouterContext) {
      return Option(
        await userRepo.findOne({
          email: ctx.request.body.email,
        }),
      ).fold(
        () => {
          deps.messages.throw(
            ctx,
            deps.messages.badRequest(
              'Incorrect username or password',
            ),
          )
        },
        async user => {
          const passwordOkay = await crypt.compare(
            ctx.request.body.password,
            user.password,
          )
          if (passwordOkay) {
            ctx.body = {
              user,
              token: deps.jwt.sign(
                user.id.toString(),
                process.env.JWT_SECRET!,
              ),
            }
          } else {
            deps.messages.throw(
              ctx,
              deps.messages.badRequest(
                'Incorrect username or password',
              ),
            )
          }
        },
      )
    },
    async register(ctx: Router.IRouterContext) {
      return Option(
        await invitationRepo.findOne({
          id: ctx.request.body.invitationId,
        }),
      ).fold(
        () => {
          return deps.messages.throw(
            ctx,
            deps.messages.notFound('invite'),
          )
        },
        async invite => {
          const opt = await createUser(
            ctx.request.body,
            invite.company,
          )
          return opt.fold(
            () => {
              return deps.messages.throw(
                ctx,
                deps.messages.badRequest('Bad request'),
              )
            },
            async u => {
              const user = await u
              await deps.db.manager.delete(EmailEntity, {
                invitation: invite.id as any,
              })
              await invitationRepo.deleteById(invite.id)
              await userRepo.save(user)
              ctx.body = {
                user,
                token: deps.jwt.sign(
                  user.id.toString(),
                  process.env.JWT_SECRET!,
                ),
              }
              return ctx.body
            },
          )
        },
      )
    },
    async getSession(
      ctx: Router.IRouterContext,
      user: Option<UserEntity>,
    ) {
      return user.fold(
        () => {
          deps.messages.throw(ctx, deps.messages.notFound('user'))
        },
        u => {
          ctx.body = u
          return u
        },
      )
    },
  }
}

export function routes(deps: Dependencies) {
  return function(router: Router) {
    const controller = makeController(deps)

    router.post('/login', route(deps, controller.login))
    router.get(
      '/session',
      deps.auth,
      route(deps, controller.getSession),
    )
    router.post(
      '/register',
      deps.auth,
      route(deps, controller.register),
    )

    return router
  }
}

export default routes
