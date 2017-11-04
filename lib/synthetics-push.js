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
    console.error('New Relic API retunrned an error: ', b.message)
    process.exit(1)
  }

  if (b.monitors.length === 0) {
    console.log('No monitors were found')
    process.exit(1)
  }

  for (var idx in b.monitors) {
    let m, filename
    m = b.monitors[idx]

    if (m.type.indexOf('SCRIPT') === -1 || m.status === 'DISABLED') {
      continue
    }

    filename = m.id + '.js'

    if (!fs.existsSync(filename)) {
      console.error(filename, ' does not exist')
      console.error("Try to run `synthetics fetch' first")
      continue
    }

    console.info('Pushing ', m.id)
    fs.readFile(filename, function (e, b) {
      let scriptText
      scriptText = b.toString('base64')
      api.updateMonitorScript(m.id, scriptText, function (e, r, b) {
        if (r.statusCode !== 204) {
          console.error('New Relic API returned an error: ', b.message)
          process.exit(1)
        }
        console.info('Pushed script', m.id, 'successfully')
      })
    })
  }
})
