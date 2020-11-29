module.exports = () => {
  global.client.guilds.fetch(global.config.guild, true, true).then(g => {
    global.guild = g;
    global.config.guild = g.id;
    global.invites = {};

    // cache invites
    g.fetchInvites().then(invites => {
      Array.from(invites.values()).forEach(inv => {
        global.invites[inv.code] = {
          uses: inv.uses,
          max: inv.maxUses
        };
      });
    }).catch(console.error);

  }).catch(err => {
    console.log("Error Fetching Guild");
    console.error(err);
  });

  console.log("Bot Ready!");
}