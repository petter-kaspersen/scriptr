module.exports = function parseInstallMessage(msg) {
  return msg
    .split('\n')
    .map((m) => {
      if (m.trim().startsWith('+')) {
        let rawPackage = m.trim().replace('+', '').trim();

        const [packageName, version] = rawPackage.split('@');

        return {
          name: packageName,
          version: version,
        };
      }
    })
    .filter((x) => x)[0];
};
