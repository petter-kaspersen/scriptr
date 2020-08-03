const {exec} = require('child_process');

module.exports = async function uninstallPackage(name) {
  return await new Promise((resolve, reject) => {
    exec(`npm uninstall ${name} --save`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }

      resolve(stdout);
    });
  });
};
