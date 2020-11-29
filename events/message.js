module.exports = msg => {
  if (msg.author.bot) return; // dont process bot messages no matter what | this also allows it to ignore itself
  if (msg.type != 'DEFAULT') return; // ignore all non-standard messages
  if (!msg.guild || msg.guild.id != global.config.guild) return; // use only in server
  if (!msg.content.startsWith(global.config.prefix)) return; // must start with prefix
  if (!global.util.isMod(msg.member)) return; // all commands are mod only

  const now = global.moment();
  const args = msg.content.substring(global.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  global.util.log('commands', new global.Discord.MessageEmbed() // log command usage
    .setTitle(`Used \`${command}\` command`)
    .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
    .setDescription(`\n${msg.content}\n\`\`\`${msg.content}\`\`\``)
    .setTimestamp()
    .setColor('0000FF')
    .addField("User", `<@!${msg.author.id}>\n${msg.author.id}`, true)
    .addField("Channel", `<#${msg.channel.id}>\n${msg.channel.id}`, true)
    .addField("Message", `[Jump to message](${msg.url})\n${msg.id}`, true)
    .addField("Time", now.format())
  );

  try {
    call = require(`../commands/${command}.js`);
    if (call) call(msg, args);
  } catch (e) {}
}