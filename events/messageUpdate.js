module.exports = (o, n) => {
  if (o.author.bot || n.author.bot) return; // ignore bots
  if (o.type != 'DEFAULT' || n.type != 'DEFAULT') return; // ignore all non-standard messages
  if (!o.guild || !n.guild || o.guild.id != global.config.guild || n.guild.id != global.config.guild) return; // use only in server
  const now = global.moment();

  if (o.content != n.content)
    global.util.log('message.edit', new global.Discord.MessageEmbed()
      .setTitle("Message Edited")
      .setAuthor(n.author.tag, n.author.displayAvatarURL())
      .setTimestamp()
      .setColor("FFFF00")
      .addField("Old", `${o.content}\n\`\`\`${o.content}\`\`\``)
      .addField("New", `${n.content}\n\`\`\`${n.content}\`\`\``)
      .addField("Author", `<@${n.author.id}>\n${n.author.id}`, true)
      .addField("Channel", `<#${n.channel.id}>\n${n.channel.id}`, true)
      .addField("Message", `[Jump to message](${n.url})\n${n.id}`, true)
      .addField("Time", now.format())
    );

  // ISSUE need to get audit logs to see who it was pinned by
  if (o.pinned != undefined && n.pinned != undefined && o.pinned != n.pinned) { // booleans
    if (n.pinned)
      global.util.log('message.pin', new global.Discord.MessageEmbed()
        .setTitle("Message Pinned")
        .setAuthor(n.author.tag, n.author.displayAvatarURL())
        .setDescription(`${o.content}\n\`\`\`${o.content}\`\`\``)
        .setTimestamp()
        .setColor("00FF00")
        .addField("Author", `<@${n.author.id}>\n${n.author.id}`, true)
        .addField("Channel", `<#${n.channel.id}>\n${n.channel.id}`, true)
        .addField("Message", `[Jump to message](${n.url})\n${n.id}`, true)
        .addField("Time", now.format())
      );
    if (o.pinned)
      global.util.log('message.unpin', new global.Discord.MessageEmbed()
        .setTitle("Message Unpinned")
        .setAuthor(n.author.tag, n.author.displayAvatarURL())
        .setDescription(`${o.content}\n\`\`\`${o.content}\`\`\``)
        .setTimestamp()
        .setColor("FF0000")
        .addField("Author", `<@${n.author.id}>\n${n.author.id}`, true)
        .addField("Channel", `<#${n.channel.id}>\n${n.channel.id}`, true)
        .addField("Message", `[Jump to message](${n.url})\n${n.id}`, true)
        .addField("Time", now.format())
      );
  }
}