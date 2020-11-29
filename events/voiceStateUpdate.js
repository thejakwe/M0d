module.exports = (o, n) => {
  if (!o.member || !n.member || o.member.id != n.member.id) return;
  if (o.guild.id != global.config.guild || n.guild.id != global.config.guild) return;
  if (o.channelID == n.channelID) return; // we're only logging changes to active channel
  const now = global.moment();
  const m = n.member;

  if (!o.channelID && n.channelID) { // join
    global.util.log('voice.join', new global.Discord.MessageEmbed()
      .setTitle("Member Joined")
      .setAuthor(m.user.tag, m.user.displayAvatarURL())
      .setTimestamp()
      .setColor("00FF00")
      .addField("Member", `<@!${m.user.id}>\n${m.user.id}`, true)
      .addField("Channel", `<#${n.channelID}>\n${n.channelID}`, true)
      .addField("Time", now.format())
    );
  } else if (o.channelID && !n.channelID) { // leave or disconnect
    global.util.getAuditLog("MEMBER_DISCONNECT", log => {
      if (log) { // disconnect
        // disconnect audit logs are stupid
        // they don't tell you who was disconnected, just that someone was
        // and disconnecting multiple users stacks the logs instead of making new ones
        // so this is super finicky
        // ISSUE disconnecting multiple users may cause them to log as leaves, not disconnects ^^
        // FIX could cache the logs and see if count changed but that's a pain
        global.util.log('voice.disconnect', new global.Discord.MessageEmbed()
          .setTitle("Member Disconnected")
          .setAuthor(m.user.tag, m.user.displayAvatarURL())
          .setFooter(log.executor.tag, log.executor.displayAvatarURL())
          .setTimestamp()
          .setColor("FF0000")
          .addField("Member", `<@!${m.user.id}>\n${m.user.id}`, true)
          .addField("Moderator", `<@!${log.executor.id}>\n${log.executor.id}`, true)
          .addField("Channel", `<#${o.channelID}>\n${o.channelID}`)
          .addField("Time", now.format())
        );
      } else { // leave
        global.util.log('voice.leave', new global.Discord.MessageEmbed()
          .setTitle("Member Left")
          .setAuthor(m.user.tag, m.user.displayAvatarURL())
          .setTimestamp()
          .setColor("FF0000")
          .addField("Member", `<@!${m.user.id}>\n${m.user.id}`, true)
          .addField("Channel", `<#${o.channelID}>\n${o.channelID}`, true)
          .addField("Time", now.format())
        );
      }
    });
  } else if (o.channelID && n.channelID) { // switch or move
    global.util.getAuditLog("MEMBER_MOVE", log => {
      if (log && log.extra.channel.id == n.channelID) { // move
        // these logs are stupid too
        // but this is a little better because we get a destination channel
        // but still not good and still can break
        // see above
        global.util.log('voice.move', new global.Discord.MessageEmbed()
          .setTitle("Member Moved")
          .setAuthor(m.user.tag, m.user.displayAvatarURL())
          .setFooter(log.executor.tag, log.executor.displayAvatarURL())
          .setTimestamp()
          .setColor("FF00FF")
          .addField("Member", `<@!${m.user.id}>\n${m.user.id}`, true)
          .addField('\u200B', '\u200B', true) // ZWSP cuz you can't have multiple 2 length inlines next to each other
          .addField("Moderator", `<@!${log.executor.id}>\n${log.executor.id}`, true)
          .addField("Original Channel", `<#${o.channelID}>\n${o.channelID}`, true)
          .addField('\u200B', '\u200B', true)
          .addField("New Channel", `<#${n.channelID}>\n${n.channelID}`, true)
          .addField("Time", now.format())
        );
      } else { // switch
        global.util.log('voice.switch', new global.Discord.MessageEmbed()
          .setTitle("Member Switched")
          .setAuthor(m.user.tag, m.user.displayAvatarURL())
          .setTimestamp()
          .setColor("FF00FF")
          .addField("Member", `<@!${m.user.id}>\n${m.user.id}`)
          .addField("Original Channel", `<#${o.channelID}>\n${o.channelID}`, true)
          .addField("New Channel", `<#${n.channelID}>\n${n.channelID}`, true)
          .addField("Time", now.format())
        );
      }
    });
  }
}