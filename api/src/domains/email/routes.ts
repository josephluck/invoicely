import * as Router from 'koa-router'
import { Dependencies } from '../../'
import { EmailEntity, createEmail } from './entity'
import { Option } from 'space-lift'
import { UserEntity } from '../user/entity'
import { InvitationEntity } from '../invitation/entity'

export function makeController(deps: Dependencies) {
  const repo = deps.db.getRepository(EmailEntity)

  function assertUser(
    ctx: Router.IRouterContext,
    user: Option<UserEntity>,
    cb: (user: UserEntity) => any,
  ) {
    return user.fold(() => {
      return deps.messages.throw(ctx, deps.messages.notFound('user'))
    }, cb)
  }

  return {
    async sendInvitation(
      ctx: Router.IRouterContext,
      user: Option<UserEntity>,
      invitation: InvitationEntity,
    ) {
      return assertUser(ctx, user, async u => {
        const email = {
          to: invitation.email,
          subject: 'You have been invited',
          html: `
            <div>You've been invited ${invitation.id}</div>
          `,
        }
        await deps.email(email)
        return createEmail(
          email,
          u.company,
          'invitation',
          invitation,
        ).fold(
          err => {
            return (ctx.body = deps.messages.throw(
              ctx,
              deps.messages.badRequest('Bad request'),
            ))
          },
          async email => {
            ctx.body = await repo.save(email)
            return ctx.body
          },
        )
      })
    },
  }
}
