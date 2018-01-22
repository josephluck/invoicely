import * as Router from 'koa-router'
import { Dependencies } from '../../.'
import { UserEntity } from '../user/entity'
import { InvitationEntity } from '../invitation/entity'
import { Option } from 'space-lift'
import * as crypt from 'bcrypt'
import { route, Controller } from '../../router'

function makeController(deps: Dependencies): Controller {
  const userRepo = deps.db.getRepository(UserEntity)
  const invitationRepo = deps.db.getRepository(InvitationEntity)

  return {
    async login(ctx) {
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
    async signUp(ctx) {
      return Option(
        await invitationRepo.findOne({
          id: ctx.request.body.invite,
        }),
      ).fold(
        () => {
          deps.messages.throw(ctx, deps.messages.notFound('invite'))
        },
        async invite => {
          let user = new UserEntity()
          user.name = ctx.request.body.name
          user.email = ctx.request.body.email
          user.avatar = ctx.request.body.avatar || ''
          user.password = await crypt.hash(
            ctx.request.body.password,
            10,
          )
          await invitationRepo.deleteById(invite.id)
          await userRepo.save(user)
          ctx.body = {
            user,
            token: deps.jwt.sign(
              user.id.toString(),
              process.env.JWT_SECRET!,
            ),
          }
        },
      )
    },
    async getSession(ctx, user) {
      if (user) {
        ctx.body = user
      } else {
        deps.messages.throw(ctx, deps.messages.notFound('user'))
      }
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

    return router
  }
}

export default routes
