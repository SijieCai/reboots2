#!/usr/bin/env node

"use strict";

const path = require('path');
const spawn = require('cross-spawn');
const appRoot = require('app-root-dir').get();
const script = process.argv[2];
const args = process.argv.slice(3);
const init = require('../scripts/init');
switch (script) {
  case 'init': {
    init(appRoot);
    break;
  }
  case 'build':
  case 'start':
  case 'upload':
  case 'upload-queries':
  case 'test': {
    const ars = [require.resolve(path.join('../scripts', script))].concat(args);
    const result = spawn.sync(
      'node',
      ars,
      { stdio: 'inherit' }
    );
    process.exit(result.status);
    break;
  }
  default:
    console.log(`Unknown script "${script}".`);
    break;
} 
