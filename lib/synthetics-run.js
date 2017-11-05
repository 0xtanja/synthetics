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

let chromeOptions = program.rawArgs.filter(n => program.args.indexOf(n) < 0).splice(2)

let capabilities = $driver.Capabilities.chrome()
capabilities.set('chromeOptions', {
  args: chromeOptions
})

global.$browser = new $driver.Builder()
  .withCapabilities(capabilities)
  .build()

require(process.cwd() + '/' + program.args[0])
