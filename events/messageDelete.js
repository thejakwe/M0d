module.exports = msg => {
  if (msg.author.bot) return; // ignore bots
  if (msg.type != 'DEFAULT') return; // ignore all non-standard messages
  if (!msg.guild || msg.guild.id != global.config.guild) return; // use only in server
  const now = global.moment();
  global.util.getAuditLog("MESSAGE_DELETE", log => {
    var deleter;
    if (log && log.target.id == msg.author.id) {
      deleter = log.executor;
    } else {
      deleter = msg.author;
    }

    global.util.log('message.delete', new global.Discord.MessageEmbed()
      .setTitle("Message Deleted")
      .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
      .setFooter(deleter.tag, deleter.displayAvatarURL())
      .setDescription(`${msg.content}\n\`\`\`${msg.content}\`\`\``)
      .setTimestamp()
      .setColor("FF0000")
      .addField("Author", `<@${msg.author.id}>\n${msg.author.id}`, true)
      .addField("Deleted By", `<@${deleter.id}>\n${deleter.id}`, true)
      .addField("Channel", `<#${msg.channel.id}>\n${msg.channel.id}`, true)
      .addField("Message ID", msg.id)
      .addField("Time", now.format())
    );
  });
}