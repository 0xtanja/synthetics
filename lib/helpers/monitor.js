'use strict'

/**
 * @param {Object} monitor
 */
const isValid = monitor => hasScript(monitor) && !isDisabled(monitor)

/**
 * @param {Object} monitor
 */
const hasScript = monitor => monitor.type.indexOf('SCRIPT') !== -1

/**
 * @param {Object} monitor
 */
const isDisabled = monitor => monitor.status === 'DISABLED'

/**
 * @param {Array} response
 * @param {String} filename
 */
const responseHasMonitorId = (response, filename) => responseLookup(response, filename, 'id')

/**
 * @param {Array} response
 * @param {String} filename
 */
const responseHasMonitorName = (response, filename) => responseLookup(response, filename, 'name')

/**
 * Given a filename determine whether there is an existing associated
 * monitor in a Synthetics API response, using a specific property to
 * lookup in
 *
 * @param {Array} response
 * @param {String} filename
 * @param {String} property
 */
const responseLookup = (response, filename, property) => response.monitors.find((o, i) => o[property] === filename.replace('.js', ''))

module.exports = {
  responseHasMonitorId: responseHasMonitorId,
  responseHasMonitorName: responseHasMonitorName,
  isValid: isValid,
  hasScript: hasScript,
  isDisabled: isDisabled
}
