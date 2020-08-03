const Router = require('koa-router');

const getScripts = require('../util/get-scripts');
const getPackages = require('../util/get-packages');

const router = new Router();

const {exec} = require('child_process');

const fs = require('fs');
const path = require('path');
const getOrCreatePackageFile = require('../util/get-or-create-package-file');
const addUserPackage = require('../util/add-user-package');

const AdmZip = require('adm-zip');
const removeUserPackage = require('../util/remove-user-package');
const uninstallPackage = require('../util/uninstall-package');
const installPackage = require('../util/install-package');
const parseInstallMessage = require('../util/parse-install-message');

router.prefix('/api');

router.get('/scripts', (ctx, next) => {
  ctx.body = getScripts();
});

router.post('/scripts/upload', (ctx, next) => {
  try {
    const {name, dataUrl} = ctx.request.body;

    const buffer = Buffer.from(dataUrl.split(',')[1], 'base64');

    const tmpPath = path.join(__dirname, '..', '..', '.tmp');
    const scriptPath = path.join(__dirname, '..', '..', 'scripts');

    const randomName = Math.floor(Math.random() * 100000) + '.zip';

    fs.writeFileSync(path.join(tmpPath, randomName), buffer);

    const zip = new AdmZip(path.join(tmpPath, randomName));

    zip.extractAllTo(scriptPath);

    ctx.body = {
      success: true,
    };
  } catch (e) {
    ctx.body = {
      success: false,
    };
  }
});

router.get('/packages', (ctx, next) => {
  ctx.body = getPackages();
});

router.post('/packages/install', async (ctx, next) => {
  const {name, dev} = ctx.request.body;

  const existingPackages = getOrCreatePackageFile();

  if (existingPackages.some(pck => pck.name === name)) {
    // Already exists

    ctx.body = 'Already exists';
  } else {
    const installedPackage = await installPackage(name);
    const nameAndVersion = parseInstallMessage(installedPackage);

    addUserPackage(nameAndVersion);

    ctx.body = nameAndVersion;
  }
});

router.delete('/packages/:name', async (ctx, next) => {
  const {name} = ctx.params;

  const packages = getOrCreatePackageFile();

  const hasPackage = packages.find(x => x.name == name);

  if (hasPackage) {
    await uninstallPackage(name);
    removeUserPackage(name);
  }

  ctx.body = 'OK';
});

module.exports = router;
