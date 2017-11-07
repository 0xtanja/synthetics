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

module.exports = {
  isValid: isValid,
  hasScript: hasScript,
  isDisabled: isDisabled
}
