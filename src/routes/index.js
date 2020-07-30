const Router = require('koa-router');
const getScripts = require('../util/get-scripts');

const router = new Router();

router.get('/scripts', (ctx, next) => {
  ctx.body = getScripts();
});

module.exports = router;
