#!/usr/bin/env node

const script = process.argv[2];
switch (script) {
  case 'init': {
    require('../lib/init');
    break;
  }
  case 'start': {
    require('../lib/start');
    break;
  }
  case 'build': {
    require('../lib/build');
    break;
  }
  case 'analyze': {
    require('../lib/analyze');
    break;
  }
  default:
    console.log(`Unknown script "${script}".`);
    break;
}
