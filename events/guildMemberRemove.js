module.exports = m => {
  if (m.guild.id != global.config.guild) return;
  const now = global.moment();

  var roles = "None";
  Array.from(m.roles.cache.values()).forEach(r => {
    if (r.id != global.config.guild) // ignore @everyone role
      roles = `${roles == "None" ? "" : `${roles} `}<@&${r.id}>`;
  });

  global.util.log('member.leave', new global.Discord.MessageEmbed()
    .setTitle("Member Left")
    .setAuthor(m.user.tag, m.user.displayAvatarURL())
    .setTimestamp()
    .setColor("FF0000")
    .addField("Member", `<@${m.user.id}>\n${m.user.id}`, true)
    .addField("Member Count", `${global.guild.memberCount} members`, true)
    .addField("Roles", roles)
    .addField("Joined", !m.joinedAt ? "Unknown" : `${global.moment(m.joinedAt).format()}\n${now.to(m.joinedAt)}`, true)
    .addField("Created", `${global.moment(m.user.createdAt).format()}\n${now.to(m.user.createdAt)}`, true)
    .addField("Time", now.format())
  );

  // leaving could also be because of a kick
  global.util.getAuditLog("MEMBER_KICK", log => {
    if (log && log.target.id == m.user.id) {
      global.util.log('member.kick', new global.Discord.MessageEmbed()
        .setTitle("Member Kicked")
        .setAuthor(m.user.tag, m.user.displayAvatarURL())
        .setFooter(log.executor.tag, log.executor.displayAvatarURL())
        .setTimestamp()
        .setColor("FF0000")
        .addField("Member", `<@${m.user.id}>\n${m.user.id}`, true)
        .addField("Moderator", `<@!${log.executor.id}>\n${log.executor.id}`, true)
        .addField("Reason", !log.reason ? "Not Provided" : log.reason)
        .addField("Time", now.format())
      );
    }
  });
}