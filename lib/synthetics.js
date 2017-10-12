#!/usr/bin/env node
require('dotenv').config()
const program = require('commander')
  , request = require('request')
  ;

program
  .command('fetch', 'Update local files from NewRelic').alias('f')
  .command('deploy', 'Update NewRelic with local files').alias('d')
  .parse(process.argv)
