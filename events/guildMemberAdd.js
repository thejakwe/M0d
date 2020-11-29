module.exports = m => {
  if (m.guild.id != global.config.guild) return;
  const now = global.moment();

  global.guild.fetchInvites().then(invites => { // ISSUE no idea if this works with vanitys
    var invite = "error";
    var inviteUses = 0;
    var maxUses;

    for (const code in global.invites) {
      const inv = invites.find(inv => inv.code == code);
      if ((inv && global.invites[code].uses != inv.uses) || (!inv && global.invites[code].uses + 1 == global.invites[code].max)) {
        invite = code;
        inviteUses = global.invites[code].uses = inv ? inv.uses : global.invites[code].uses + 1;
        maxUses = inv ? inv.maxUses : global.invites[code].max;
      }
    }

    // ISSUE this probably will break with lurkers
    global.util.log('member.join', new global.Discord.MessageEmbed()
      .setTitle("Member Joined")
      .setAuthor(m.user.tag, m.user.displayAvatarURL())
      .setTimestamp()
      .setColor("00FF00")
      .addField("Member", `<@${m.user.id}>\n${m.user.id}`, true)
      .addField("Invite Used", `${invite}\n${inviteUses}${maxUses ? `/${maxUses}` : ""} use${inviteUses == 1 && !maxUses ? "" : 's'}`, true)
      .addField("Member Count", `${global.guild.memberCount} members`, true)
      .addField("Created", `${global.moment(m.user.createdAt).format()}\n${now.to(m.user.createdAt)}`)
      .addField("Time", now.format())
    );
  }).catch(err => {
    console.log("Error fetching invites from guild to check which one a new member used");
    console.error(err);
  });
}