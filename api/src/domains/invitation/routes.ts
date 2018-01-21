import * as Router from 'koa-router'
import { Dependencies } from '../../'
import { InvitationEntity } from './entity'
import { CompanyEntity } from '../company/entity'
import { Option } from 'space-lift'

const relation = {
  relations: ['company'],
}

export function routes(deps: Dependencies) {
  return function(router: Router) {
    const repo = deps.db.getRepository(InvitationEntity)

    router.get('/invitations', async function(ctx, next) {
      ctx.body = await repo.find(relation)
      return next()
    })

    router.get('/invitations/:invitationId', async function(
      ctx,
      next,
    ) {
      ctx.body = await repo.findOneById(
        ctx.params.invitationId,
        relation,
      )
      return next()
    })

    router.post('/invitations', async function(ctx, next) {
      let invite = new InvitationEntity()
      let companyId = '1234'
      return Option(
        await deps.db.manager.findOneById(CompanyEntity, companyId),
      ).fold(
        () => {
          ctx.throw(404, 'No company for that id')
          return next()
        },
        async company => {
          invite.company = company
          invite.email = ctx.request.body.email
          invite.name = ctx.request.body.name
          ctx.body = await repo.save(invite)
          return next()
        },
      )
    })

    router.delete('/invitations/:invitationId', async function(
      ctx,
      next,
    ) {
      await repo.deleteById(ctx.params.invitationId)
      return next()
    })

    return router
  }
}

export default routes
