'use strict';
const path = require('path');
const fs = require('fs-extra');
const spawn = require('cross-spawn');
// const chalk = require('chalk');
module.exports = (appPath, appName, verbose, originalDirectory) => {
  console.log(`options ${appPath}`);

  const ownPackageName = require(path.join(__dirname, '..', 'package.json')).name;
  const ownPath = path.join(appPath, 'node_modules', ownPackageName);
  const appPackage = require(path.join(appPath, 'package.json'));

  // Copy over some of the devDependencies
  appPackage.dependencies = appPackage.dependencies || {};
  appPackage.devDependencies = appPackage.devDependencies || {};

  // Setup the script rules
  appPackage.scripts = {
    start: 'reboots start',
    build: 'reboots build',
    test: 'reboots test'
  };

  fs.writeFileSync(
    path.join(appPath, 'package.json'),
    JSON.stringify(appPackage, null, 2)
  );

  // Copy the files for the user
  const templatePath = path.join(ownPath, 'template');
  fs.copySync(templatePath, appPath);

  let args = ['add', 'react', 'react-dom'];


  console.log('Success! Created ' + appName + ' at ' + appPath);

};
