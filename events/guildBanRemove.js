module.exports = (g, u) => {
  if (g.id != global.config.guild) return;
  const now = global.moment();
  global.util.getAuditLog("MEMBER_BAN_REMOVE", log => {
    if (log && log.target.id == u.id) {
      global.util.log('member.unban', new global.Discord.MessageEmbed()
        .setTitle("Member Unbanned")
        .setAuthor(u.tag, u.displayAvatarURL())
        .setFooter(log.executor.tag, log.executor.displayAvatarURL())
        .setTimestamp()
        .setColor("00FF00")
        .addField("Moderator", `<@${log.executor.id}>\n${log.executor.id}`, true)
        .addField("Member", `<@${u.id}>\n${u.id}`, true)
        .addField("Reason", !log.reason ? "Not Provided" : log.reason)
        .addField("Time", now.format())
      );
    } else {
      console.log("Error while trying to log an unban");
    }
  });
}