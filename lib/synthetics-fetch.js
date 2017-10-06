#!/usr/bin/env node
'use strict'
const program = require('commander')
  , fs = require('fs')
  , api = require('./api/api')
  ;

api.getMonitors(function(e, r, b) {
  if (r.statusCode != 200) {
    console.error('New Relic API returned an error: ', b.message);
    process.exit(1);
  }

  if (b.monitors.length == 0) {
    console.info('No monitors were found')
    process.exit();
  }

  for (var idx in b.monitors) {
    let m;
    m = b.monitors[idx];
    
    if (m.type.indexOf('SCRIPT') === -1 || 'DISABLED' === m.status) {
      continue;
    }
    
    api.getMonitorScript(m.id, function(e, r, b) {
      if (r.statusCode != 200) {
        console.error('New Relic API returned an error: ', b.message);
        process.exit(1);
      }

      console.info('Fetching', m.id);
      fs.writeFileSync(m.id + '.js', new Buffer(b.scriptText, 'base64'));
    });
  }
});
