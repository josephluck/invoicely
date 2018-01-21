import * as Router from 'koa-router'
import { Dependencies } from '../../.'
import { UserEntity } from '../user/entity'
import { Option } from 'space-lift'
import * as crypt from 'bcrypt'

export function routes(deps: Dependencies) {
  return function(router: Router) {
    const repo = deps.db.getRepository(UserEntity)

    router.post('/login', async function(ctx, next) {
      return Option(
        await repo.findOne({
          email: ctx.request.body.email,
        }),
      ).fold(
        () => {
          ctx.throw(404, 'No user found')
          return next()
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
            return next()
          } else {
            ctx.throw(400, 'Incorrect password')
          }
        },
      )
    })

    return router
  }
}

export default routes