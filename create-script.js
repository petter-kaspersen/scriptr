require('dotenv').config();

const rimraf = require('rimraf');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);

if (args.length == 0) throw new Error('No arguments passed');

const name = args[0].trim();

const force = args.includes('--force');

const scriptTemplate = `module.exports = async function run() {
    console.log("Running function");
}`;

const scriptDirectory = path.join(
  __dirname,
  process.env.SCRIPT_DIRECTORY || 'scripts'
);

function createScript() {
  const scriptPath = path.join(scriptDirectory, name);
  console.log(`[INFO] - Creating script with name ${name}`);

  const filesInScriptDirectory = fs.readdirSync(scriptDirectory);

  if (filesInScriptDirectory.includes(name)) {
    if (force) {
      console.log(`[INFO] - Deleted existing script.`);
      rimraf.sync(scriptPath);
    } else {
      throw new Error(
        `Script already exists. If you want to overwrite, pass the --force flag to this command. `
      );
    }
  }

  fs.mkdirSync(scriptPath);

  fs.writeFileSync(path.join(scriptPath, 'index.js'), scriptTemplate);
  fs.writeFileSync(
    path.join(scriptPath, 'config.json'),
    JSON.stringify({
      name: name,
      description: '',
      hasParameters: false,
      lastStatus: null,
      lastRan: null,
      running: false,
    })
  );

  console.log(`[INFO] - Sucessfully created script with name ${name}`);
}

createScript();
