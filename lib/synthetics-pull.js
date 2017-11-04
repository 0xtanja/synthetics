#!/usr/bin/env node
'use strict'

const fs = require('fs')
const api = require('./api/api')

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

  for (var idx in b.monitors) {
    let m
    m = b.monitors[idx]

    if (m.type.indexOf('SCRIPT') === -1 || m.status === 'DISABLED') {
      continue
    }

    api.getMonitorScript(m.id, function (e, r, b) {
      if (r.statusCode !== 200) {
        console.error('New Relic API returned an error: ', b.message)
        process.exit(1)
      }

      console.info('Pulling', m.id)
      fs.writeFileSync(m.id + '.js', Buffer.from(b.scriptText, 'base64'))
    })
  }
})
