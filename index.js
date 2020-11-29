// load dependencies and libraries
const Discord = require('discord.js');
const fs = require('fs');
const moment = require('moment'); // for time processing | https://momentjs.com

// load config
const configYAML = fs.readFileSync('./config.yaml', 'utf-8');
const configJSON = require('yaml').parse(configYAML);
require('./util').cleanJSON(configJSON); // make numbers strings and delete nulls and empty objects
configJSON.prefix = configJSON.prefix.trim();

// configure moment's format for logging times. you can change this to what ever you want
// read more here: https://momentjs.com/docs/#/displaying/format/
moment.defaultFormat = "ddd, MMM DD, YYYY HH:mm:ss Z"; // Fri, Mar 13, 2019 16:20:49 -05:00 | -05:00 is the UTC offset, in this case EST

// initalize discord stuff
const client = new Discord.Client({
  http: {
    version: 6 // use v6 then switch to v8 when v6 gets discontinued | will have to make some changes like message types etc
  }
});
client.login(configJSON.token);

// load important stuff into global for easy access across project files
global.config = configJSON;
global.client = client;
global.util = require('./util');
// global.db = require('some sort of json editing package').create("db.json"); // TODO

// packages
global.moment = moment;
global.Discord = Discord;

// initalize events
fs.readdir('./events', (err, files) => { // load files from the events folder
  if (err) {
    console.error(err);
    return;
  }
  files.forEach(file => {
    if (file.endsWith('.js')) {
      var name = file.slice(0, -3); // get all but the .js at the end
      client.on(name, require(`./events/${name}`)); // load the event code into the EventEmmiter
    }
  });
});

client.on('warn', console.warn);
client.on('error', console.error);