const fs = require('fs');
const path = require('path');
const getOrCreatePackageFile = require('./get-or-create-package-file');

function getPackages() {
  const packages = getOrCreatePackageFile();

  return packages;
}

module.exports = getPackages;
