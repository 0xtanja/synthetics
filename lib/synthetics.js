#!/usr/bin/env node
require('dotenv').config()
const program = require('commander')
const pkg = require('./../package.json')

program
  .command('pull', 'Update local files from NewRelic').alias('fetch')
  .command('push', 'Update NewRelic with local files').alias('deploy')
  .command('run', 'Run a script locally')
  .version(pkg.version)
  .parse(process.argv)
