'use strict'

const r = require('request')

const ENDPOINT = 'https://synthetics.newrelic.com/synthetics/api/v3/monitors'

module.exports.getMonitors = function (cb) {
  r({
    'uri': ENDPOINT,
    'headers': {
      'X-Api-Key': process.env.NEWRELIC_ADMIN_USER_KEY
    },
    'json': true
  }, cb)
}

module.exports.getMonitor = function (monitorId, cb) {
  r({
    'uri': ENDPOINT + '/' + monitorId,
    'headers': {
      'X-Api-Key': process.env.NEWRELIC_ADMIN_USER_KEY
    },
    'json': true
  }, cb)
}

module.exports.getMonitorScript = function (monitorId, cb) {
  r({
    'uri': ENDPOINT + '/' + monitorId + '/script',
    'headers': {
      'X-Api-Key': process.env.NEWRELIC_ADMIN_USER_KEY
    },
    'json': true
  }, cb)
}

module.exports.updateMonitorScript = function (monitorId, scriptText, cb) {
  r({
    'method': 'PUT',
    'uri': ENDPOINT + '/' + monitorId + '/script',
    'headers': {
      'X-Api-Key': process.env.NEWRELIC_ADMIN_USER_KEY
    },
    'json': true,
    'body': {
      'scriptText': scriptText
    }
  }, cb)
}
