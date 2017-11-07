#!/usr/bin/env node
'use strict'

/* global $driver */

const program = require('commander')
const chrome = require('chromedriver')
// const chromePath = chrome.path // eslint-disable-line

program
  .arguments('run <scripts...>')
  .parse(process.argv)

const extractChromeOptions = program => program.rawArgs
  .filter(n => program.args.indexOf(n) < 0)
  .splice(2)

global.$driver   = require('selenium-webdriver')
let capabilities = global.$driver.Capabilities.chrome()
capabilities.set('chromeOptions', {args: extractChromeOptions(program)})
global.$browser = new $driver.Builder()
  .withCapabilities(capabilities)
  .build()

chrome.start()
program.args
  .map(script => require(`${process.cwd()}/${script}`))
