const getOrCreatePackageFile = require('./get-or-create-package-file');

const {exec} = require('child_process');

module.exports = async function installPackage(name, version) {
  const existingPackages = getOrCreatePackageFile();

  if (existingPackages.some((pck) => pck.name === name)) {
    // Already exists

    return;
  }

  return await new Promise((resolve, reject) => {
    exec(
      `npm install ${name}${version ? `@${version}` : ''} --save`,
      (error, stdout, stderr) => {
        if (error) {
          reject(error);
        }

        resolve(stdout);
      }
    );
  });
};
