const config = require('../scriptr.config');
const getOrCreatePackageFile = require('../src/util/get-or-create-package-file');
const uninstallPackage = require('../src/util/uninstall-package');
const removeUserPackage = require('../src/util/remove-user-package');

(async () => {
  const packages = getOrCreatePackageFile();

  if (packages.length == 0) {
    return console.warn(`[INFO] - No packages installed.`);
  }

  console.log(`[INFO] - Removing ${packages.length} packages.`);

  for (const {name} of packages) {
    try {
      await uninstallPackage(name);

      removeUserPackage(name);

      console.log(`[INFO] - Removed: ${name}`);
    } catch (e) {
      console.warn(`[INFO] - Something went wrong removing ${name}`);
      console.warn(e);
    }
  }
})();
