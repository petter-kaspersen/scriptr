require('dotenv').config();

const next = require('next');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const routes = require('./src/routes');
const nextRouter = require('./src/routes/next.js');

const nextApp = next({
  dev: process.env.NODE_ENV !== 'production',
});

nextApp.prepare().then(() => {
  const app = new Koa();

  const PORT = process.env.PORT || 3000;

  app.use(bodyParser());

  app.use(routes.routes()).use(routes.allowedMethods());
  app.use(nextRouter(nextApp).routes());

  app.listen(PORT, (err) => {
    if (err) throw err;

    console.log(`Listening on http://localhost:${PORT}`);
  });
});
