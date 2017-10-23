#!/usr/bin/env node
require('dotenv').config()
const program = require('commander')
  , request = require('request')
  ;

program
  .command('pull', 'Update local files from NewRelic').alias('fetch')
  .command('push', 'Update NewRelic with local files').alias('deploy')
  .parse(process.argv)
