#!/usr/bin/env node

const args = require('args')
const chalk = require('chalk')
const cp = require('child_process')
const _string = require('lodash/string')

const parsePSOutput = require('../lib/parse-ps-output')
const handleMatchedProcesses = require('../lib/handle-processes')

args
  .option('no-confirm', 'Kill matched processes without confirmation', false)
  .command('echo', 'Echo back some content', ['e'])

const flags = args.parse(process.argv, { value: '<search values>' })
const value = args.sub[0]

if (value === "" || value === undefined) {
  args.showHelp()
  return
}

cp.exec(`ps | grep ${value}`, (err, stdout, stderr) => {
  if (err) {
    console.log(chalk.red(err))
  } else {
    handleMatchedProcesses(parsePSOutput(stdout), flags)
  }
});
