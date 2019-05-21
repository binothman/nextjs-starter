const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')
const portfinder = require('portfinder')
const opn = require('opn');

portfinder.getPortPromise({
  port: 3000,    // minimum port
  stopPort: 3333 // maximum port
})
.then(p => {
  const port = parseInt(process.env.PORT, 10) || p
  const dev = process.env.NODE_ENV !== 'production'
  const app = next({ dev })
  const handle = app.getRequestHandler()

  app.prepare().then(() => {
    const server = new Koa()
    const router = new Router()


    router.get('*', async ctx => {
      await handle(ctx.req, ctx.res)
      ctx.respond = false
    })

    server.use(async (ctx, next) => {
      ctx.res.statusCode = 200
      await next()
    })

    server.use(router.routes())
    server.listen(port, () => {
      if (process.env.NODE_ENV === 'development') {
        opn(`http://localhost:${port}`)
      }

      console.log(`> Ready on http://localhost:${port}`)
    })
  })
})
