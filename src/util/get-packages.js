const fs = require('fs');
const path = require('path');

function getPackages() {
  const packageJson = path.join(__dirname, '..', '..', 'package.json');

  const content = JSON.parse(fs.readFileSync(packageJson));

  const {dependencies, devDependencies} = content;

  return {
    dependencies: dependencies,
    devDependencies: devDependencies,
  };
}

module.exports = getPackages;
