const Router = require('koa-router');

function routerNext(app) {
  const handle = app.getRequestHandler();
  const router = new Router();

  router.use(async (ctx, next) => {
    ctx.res.statusCode = 200;

    await next();
  });

  router.get('(.*)', async ctx => {
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
