import * as Router from 'koa-router'
import { Dependencies } from '../../'
import { CompanyEntity } from './entity'
import { route, Controller } from '../../router'

function makeController(deps: Dependencies): Controller {
  const repo = deps.db.getRepository(CompanyEntity)

  return {
    async getAll(ctx) {
      ctx.body = await repo.find()
    },
    async getById(ctx) {
      const company = await repo.findOneById(ctx.params.companyId)
      if (company) {
        ctx.body = company
      } else {
        deps.messages.throw(ctx, deps.messages.notFound('company'))
      }
    },
    async createNew(ctx) {
      let company = new CompanyEntity()
      company.address = ctx.request.body.address
      company.name = ctx.request.body.name
      company.logo = ctx.request.body.logo || ''
      ctx.body = await repo.save(company)
    },
    async destroy(ctx) {
      await repo.deleteById(ctx.params.companyId)
    },
  }
}

export function routes(deps: Dependencies) {
  return function(router: Router) {
    const controller = makeController(deps)

    router.get(
      '/companies',
      deps.auth,
      route(deps, controller.getAll),
    )

    router.get(
      '/companies/:companyId',
      deps.auth,
      route(deps, controller.getById),
    )

    router.post(
      '/companies',
      deps.auth,
      route(deps, controller.createNew),
    )

    router.delete(
      '/companies/:companyId',
      deps.auth,
      route(deps, controller.destroy),
    )

    return router
  }
}

export default routes
