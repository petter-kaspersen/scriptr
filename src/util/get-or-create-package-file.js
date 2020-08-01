const path = require('path');
const fs = require('fs');

module.exports = function getOrCreatePackageFile() {
  const properPath = path.join(__dirname, '..', '..');
  const filePath = path.join(properPath, 'user_packages.json');

  const isFile = fs.existsSync(filePath);

  if (isFile) {
    const {packages} = JSON.parse(fs.readFileSync(filePath));

    return packages;
  }

  fs.writeFileSync(
    filePath,
    JSON.stringify({
      packages: [],
    })
  );

  return [];
};
