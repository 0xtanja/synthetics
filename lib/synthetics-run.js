'use strict'

/* global $driver */

const program = require('commander')
const chrome = require('chromedriver')
// const chromePath = chrome.path // eslint-disable-line

program
  .arguments('run <script>')
  .parse(process.argv)

chrome.start()
global.$driver = require('selenium-webdriver')

let terminator = +Object.keys(program.rawArgs).find(key => program.rawArgs[key] === program.args[0])
let chromeOptions = program.rawArgs.slice(++terminator)

let capabilities = $driver.Capabilities.chrome()
capabilities.set('chromeOptions', {
  args: chromeOptions
})

global.$browser = new $driver.Builder()
  .withCapabilities(capabilities)
  .build()

require(process.cwd() + '/' + program.args[0])
