#!/usr/bin/env node
'use strict'

const fs = require('fs')
const api = require('./api/api')
const monitor = require('./helpers/monitor')

if (!process.env.NEWRELIC_ADMIN_USER_KEY) {
  console.error('NEWRELIC_ADMIN_USER_KEY has not been found in the environment')
  process.exit(1)
}

api.getMonitors(function (e, r, b) {
  if (r.statusCode !== 200) {
    console.error('New Relic API returned an error: ', b.message)
    process.exit(1)
  }

  if (b.monitors.length === 0) {
    console.info('No monitors were found')
    process.exit()
  }

  b.monitors
    .filter(monitor.isValid)
    .map(monitor => {
      api.getMonitorScript(monitor.id, function (e, r, b) {
        if (r.statusCode !== 200) {
          console.error('New Relic API returned an error: ', b.message)
          process.exit(1)
        }

        console.info(`Pulling monitor ID: ${monitor.id}: ${monitor.name}.js`)
        fs.writeFileSync(`${monitor.name}.js`, Buffer.from(b.scriptText, 'base64'))
      })
    })
})
