[![npm](https://img.shields.io/npm/v/synthetics.svg)](https://npm.im/synthetics)

# synthetics(1) -- NewRelic Synthetics in an automated pipeline

## SYNOPSYS

`synthetics fetch`

`synthetics deploy`

## INSTALL

`npm install -g synthetics`

## DESCRIPTION

Makes you able to track your New Relic Synthetics scripts as local files.

### Authentication

An [admin user API key](https://docs.newrelic.com/docs/apis/rest-api-v2/getting-started/api-keys#creating) is needed to perform operations against Synthetics Monitors; this program will look for it in the `NEWRELIC_ADMIN_USER_KEY` environmental variable.

## AUTHOR

Written by [Mario Álvarez](https://github.com/m4grio)
