#!/usr/bin/env node
'use strict'

const fs = require('fs')
const api = require('./api/api')
const monitorHelper = require('./helpers/monitor')
const program = require('commander')

if (!process.env.NEWRELIC_ADMIN_USER_KEY) {
  console.error('NEWRELIC_ADMIN_USER_KEY has not been found in the environment')
  process.exit(1)
}

program
  .arguments('push <scripts...>')
  .parse(process.argv)

api.getMonitors(function (e, r, b) {
  if (r.statusCode !== 200) {
    console.error('New Relic API retunrned an error: ', b.message)
    process.exit(1)
  }

  if (b.monitors.length === 0) {
    console.log('No monitors were found')
    process.exit(1)
  }

  if (program.args.length) {
    const filteredMonitors = []
    for (const file of program.args) {
      const found = monitorHelper.responseHasMonitorName(b, file)
      if (!found) {
        console.error(`There is no monitor associated to file ${file}`)
        continue
      }
      filteredMonitors.push(found)
    }
    b.monitors = filteredMonitors
  }

  b.monitors
    .filter(monitorHelper.isValid)
    .map(monitor => {
      const filename = `${monitor.name}.js`

      if (!fs.existsSync(filename)) {
        console.error("Can't push", filename, '- file does not exist')
        console.error("Run `synthetics fetch' first")
        return
      }

      console.info('Pushing', monitor.id)
      fs.readFile(filename, function (e, b) {
        let scriptText
        scriptText = b.toString('base64')
        api.updateMonitorScript(monitor.id, scriptText, function (e, r, b) {
          if (r.statusCode !== 204) {
            console.error('New Relic API returned an error: ', b.message)
            process.exit(1)
          }
          console.info(`Pushed monitor ID: ${monitor.id}: ${monitor.name}.js`)
        })
      })
    })
})
