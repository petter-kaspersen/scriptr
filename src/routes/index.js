const Router = require('koa-router');

const getScripts = require('../util/get-scripts');
const getPackages = require('../util/get-packages');

const router = new Router();

const {exec} = require('child_process');

const fs = require('fs');
const path = require('path');
const getOrCreatePackageFile = require('../util/get-or-create-package-file');
const addUserPackage = require('../util/add-user-package');

router.prefix('/api');

router.get('/scripts', (ctx, next) => {
  ctx.body = getScripts();
});

router.get('/packages', (ctx, next) => {
  ctx.body = getPackages();
});

router.post('/packages/install', async (ctx, next) => {
  const {name, dev} = ctx.request.body;

  const existingPackages = getOrCreatePackageFile();

  if (existingPackages.some((pck) => pck.name === name)) {
    // Already exists

    ctx.body = 'Already exists';
  } else {
    const installPackage = await new Promise((resolve, reject) => {
      exec(
        `npm install ${name} ${dev ? '--save-dev' : '--save'}`,
        (error, stdout, stderr) => {
          if (error) {
            reject('Oh no ', error);
          }

          resolve(stdout);
        }
      );
    });

    addUserPackage(name);

    ctx.body = installPackage;
  }
});

module.exports = router;
