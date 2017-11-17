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
 * Given a filename determine whether there is an existing associated
 * monitor in a Synthetics API response
 *
 * @param {Array} response
 * @param {String} filename
 */
const responseHasMonitor = (response, filename) => response.monitors.find((o, i) => o.id === filename.replace('.js', ''))

module.exports = {
  responseHasMonitor: responseHasMonitor,
  isValid: isValid,
  hasScript: hasScript,
  isDisabled: isDisabled
}
