import * as Router from 'koa-router'
import { Dependencies } from '../../.'
import { UserEntity } from '../user/entity'
import { Option } from 'space-lift'
import * as crypt from 'bcrypt'
import { route, Controller } from '../../router'

function makeController(deps: Dependencies): Controller {
  const repo = deps.db.getRepository(UserEntity)

  return {
    async login(ctx) {
      return Option(
        await repo.findOne({
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
              token: deps.jwt.sign(user.id.toString(), 'shh'), // TODO: env variable
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
