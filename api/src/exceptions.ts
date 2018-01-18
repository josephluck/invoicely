import * as Koa from 'koa'

export default function() {
  return async function exceptions(
    ctx: Koa.Context,
    next: () => Promise<any>,
  ) {
    try {
      await next()
    } catch (err) {
      console.log(err)
      ctx.status = err.status || 500
      ctx.body = err.message
      ctx.app.emit('error', err, ctx)
    }
  }
}
