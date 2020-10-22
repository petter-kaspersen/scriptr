const Router = require('koa-router');

function routerNext(app) {
  const handle = app.getRequestHandler();
  const router = new Router();

  router.use(async (ctx, next) => {
    ctx.res.statusCode = 200;

    await next();
  });

  router.get('/admin/scripts/:name', async (ctx, next) => {
    const {name} = ctx.params;

    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  router.get('(.*)', async (ctx, next) => {
    if (ctx.request.path.indexOf('/api') === 0) {
      await next();
    } else {
      await handle(ctx.req, ctx.res);
      ctx.respond = false;
    }
  });

  return router;
}

module.exports = routerNext;
