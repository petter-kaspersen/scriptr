const path = require('path');
const fs = require('fs');

module.exports = function addUserPackage(name) {
  const properPath = path.join(__dirname, '..', '..');
  const filePath = path.join(properPath, 'user_packages.json');

  const content = JSON.parse(fs.readFileSync(filePath));

  fs.writeFileSync(
    filePath,
    JSON.stringify({
      ...content,
      packages: [...content.packages, {name: name}],
    })
  );
};
