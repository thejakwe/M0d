exports.isMod = m => {
  return m.hasPermission("ADMINISTRATOR") || global.config.roles.mod.includes(m.id) || Array.from(m.roles.cache.keys()).some(r => global.config.roles.mod.includes(r));
}

exports.cleanJSON = json => { // convert all numbers to strings and delete any null values and empty objects
  // i will never get back the hour i spent writing these two functions
  function clean(set, key) {
    const type = typeof set[key];
    if (type == 'number') {
      set[key] = String(set[key]);
    } else if (set[key] == null) {
      delete set[key];
    } else if (Array.isArray(set[key])) {
      fix(set[key]);
    } else if (type == 'object') { // could be array or null but we catch those
      fix(set[key]);
      if (Object.entries(set[key]).length == 0) {
        delete set[key];
      }
    }
  }

  function fix(data) {
    if (Array.isArray(data)) {
      for (var i = 0; i < data.length; i++) {
        clean(data, i);
      }
    } else {
      for (const i of Object.entries(data)) {
        clean(data, i[0]);
      }
    }
  }

  fix(json);
}

exports.log = (loc, data) => {
  if (!global.config.logs) return; // no logging enabled | ??

  // get place to log to
  var dest;
  try {
    dest = eval(`global.config.logs.${loc}`); // probobly not the best option, but no user input is provided to this function so it should be fine
  } catch (err) {
    return;
  }
  if (!dest) return;

  // try channel id
  var chan = global.guild.channels.resolve(dest);
  if (chan) {
    chan.send(data).catch(err => {
      console.log(`Failed logging to config.logs.${loc} | couldn't send message to channel`);
    });
    return;
  }

  // try webhook url
  try {
    const parts = new URL(dest).pathname.substr(1).split('/'); // ['api', 'webhooks', <id>, <token>]
    if (parts.length == 4) {
      global.client.fetchWebhook(parts[2], parts[3]).then(wh => {
        wh.send(data).catch(err => {
          console.log(`Failed logging to config.logs.${loc} | couldn't send message to webhook`);
        });
      }).catch(err => {
        console.log(`Failed logging to config.logs.${loc} | couldn't fetch webhook`);
      });
    } else {
      console.log(`Failed logging to config.logs.${loc} | invalid url`);
    }
    return;
  } catch (err) {} // we can try and format it as a url but it might fail

  // last resort, try webhook id
  global.client.fetchWebhook(dest).then(wh => {
    wh.send(data).catch(err => {
      console.log(`Failed logging to config.logs.${loc} | couldn't send message to webhook`);
    });
  }).catch(err => {
    console.log(`Failed logging to config.logs.${loc} | couldn't resolve to channel or webhook id or token`);
  });
}

exports.getAuditLog = async (kind, callback) => {
  await new Promise(r => setTimeout(r, 500)); // delay 500ms to allow audit logs to collect
  global.guild.fetchAuditLogs({
    type: kind,
    limit: 1
  }).then(logs => {
    if (!logs) {
      callback(undefined);
      return;
    }
    const log = logs.entries.first();
    if (!log || Math.abs(global.moment().diff(global.moment(log.createdAt))) > 3000) { // if log if more than 3s before
      callback(undefined);
      return;
    }
    callback(log);
  }).catch(console.error);
}