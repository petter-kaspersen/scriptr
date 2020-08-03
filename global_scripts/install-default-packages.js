const config = require('../scriptr.config');
const getOrCreatePackageFile = require('../src/util/get-or-create-package-file');
const installPackage = require('../src/util/install-package');
const parseInstallMessage = require('../src/util/parse-install-message');
const addUserPackage = require('../src/util/add-user-package');

(async () => {
  if (!config.initialPackages)
    return console.log(`[INFO] - No packages declared in sciptr config.`);

  const {initialPackages} = config;

  getOrCreatePackageFile();

  for (const [name, version] of Object.entries(initialPackages)) {
    console.log(`[INFO] - Installing ${name}@${version}`);

    try {
      const installedPackage = await installPackage(name, version);

      if (!installedPackage) {
        console.log(`[INFO] - Package was already installed.`);
        continue;
      }

      const nameAndVersion = parseInstallMessage(installedPackage);

      addUserPackage(nameAndVersion);

      console.log(
        `[INFO] - Installed: ${nameAndVersion.name}@${nameAndVersion.version}`
      );
    } catch (e) {
      console.warn(
        `[INFO] - Something went wrong installing ${name}@${version}`
      );
      console.warn(e);
    }
  }
})();
