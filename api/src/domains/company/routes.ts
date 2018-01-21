import * as Router from 'koa-router'
import { Dependencies } from '../../'
import { CompanyEntity } from './entity'

export function routes(deps: Dependencies) {
  return function(router: Router) {
    const repo = deps.db.getRepository(CompanyEntity)

    router.get('/companies', deps.auth, async function(ctx, next) {
      ctx.body = await repo.find()
      return next()
    })

    router.get('/companies/:companyId', deps.auth, async function(
      ctx,
      next,
    ) {
      ctx.body = await repo.findOneById(ctx.params.companyId)
      return next()
    })

    router.post('/companies', deps.auth, async function(ctx, next) {
      let company = new CompanyEntity()
      company.address = ctx.request.body.address
      company.name = ctx.request.body.name
      company.logo = ctx.request.body.logo || ''
      ctx.body = await repo.save(company)
      return next()
    })

    router.delete('/companies/:companyId', deps.auth, async function(
      ctx,
      next,
    ) {
      await repo.deleteById(ctx.params.companyId)
      return next()
    })

    return router
  }
}

export default routes
