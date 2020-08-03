const fs = require('fs');
const path = require('path');
const validateConfig = require('./validate-config');

module.exports = function getScripts() {
  const scriptDirectory = path.join(
    __dirname,
    '..',
    '..',
    process.env.SCRIPT_DIRECTORY || 'scripts'
  );

  const localScripts = [];

  const folders = fs
    .readdirSync(scriptDirectory)
    .filter(folder =>
      fs.lstatSync(path.join(scriptDirectory, folder)).isDirectory()
    );

  return folders.reduce((acc, folder) => {
    try {
      const currentScriptDirectory = path.join(scriptDirectory, folder);

      const directoryFiles = fs.readdirSync(currentScriptDirectory);

      if (!'config.json' in directoryFiles) return acc;

      const configFile = JSON.parse(
        fs.readFileSync(path.join(currentScriptDirectory, 'config.json'))
      );

      const {valid, message} = validateConfig(configFile);

      if (!valid) {
        console.warn(`Error validating config file for ${folder}`);
        console.warn(`Message: ${message}`);
        return acc;
      }

      return [
        ...acc,
        {
          config: configFile,
          script: require(path.join(currentScriptDirectory, 'index.js')),
          scriptPath: currentScriptDirectory,
        },
      ];
    } catch (e) {
      console.warn(`Encountered error while processing ${folder}. Error: ${e}`);
      return acc;
    }
  }, []);
};
