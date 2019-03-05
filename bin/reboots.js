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
  case 'start':
    { 
      require('../src/start');
      break;
    }
  case 'build':
    { 
      require('../src/build');
      break;
    }
  default:
    console.log(`Unknown script "${script}".`);
    break;
}
