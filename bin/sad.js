#!/usr/bin/env node

const args = require('args');
const cp = require('child_process');
const _string = require('lodash/string');
const parsePSOutput = require('../lib/parse-ps-output');

args
  .option('no-confirm', 'Kill matched processes without confirmation', false)
  .option('no-fun', 'Strictly have no fun', false)
  .command('echo', 'Echo back some content', ['e']);

const flags = args.parse(process.argv, { value: '<search values>' });
const value = args.sub[0];

if (value === "" || value === undefined) {
  args.showHelp();
  return;
}

cp.exec(`ps aux | grep ${value}`, function(err, stdout, stderr) {
  console.log('ERR:', err);
  console.log('STDOUT:', stdout);
  console.log('STDERR:', stderr);

  console.log(parsePSOutput(stdout));
});
