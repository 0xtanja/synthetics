#!/usr/bin/env node
const program = require('commander')
  , request = require('request')
  ;

if (!process.env.NEWRELIC_ADMIN_USER_KEY) {
  console.error('NEWRELIC_ADMIN_USER_KEY has not been found in the environment');
  process.exit(1);
}

program
  .command('fetch', 'Update local files from NewRelic').alias('f')
  .command('deploy', 'Update NewRelic with local files').alias('d')
  .parse(process.argv)
