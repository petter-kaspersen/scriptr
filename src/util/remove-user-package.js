const path = require('path');
const fs = require('fs');

module.exports = function removeUserPackage(name) {
  const properPath = path.join(__dirname, '..', '..');
  const filePath = path.join(properPath, 'user_packages.json');

  const content = JSON.parse(fs.readFileSync(filePath));

  const filteredPackages = content.packages.filter((x) => x.name !== name);

  fs.writeFileSync(
    filePath,
    JSON.stringify({
      ...content,
      packages: filteredPackages,
    })
  );
};
